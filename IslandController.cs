using System.IO;
using System.Text.Json;
using System.Windows;
using System.Windows.Interop;
using System.Windows.Threading;
using Wpf.Ui.Controls;
using Workbench.Models;
using Workbench.ViewModels;
using Workbench.Views;
using WinForms = System.Windows.Forms;

namespace Workbench;

public enum IslandEdge { Left, Right, Bottom, Top } // 顶边也贴岛;拖顶的系统最大化已在主窗口摘 WS_MAXIMIZEBOX 禁掉

// 灵动岛总控:主窗口拖到屏幕边缘(左/右/上/下)或托盘菜单 → 化岛(便签/任务记录/待办三个快速记录入口);
// 点岛上的入口直接弹快速记录窗(便签=置顶小窗/任务=编辑窗新建/待办=快速待办窗);
// 岛支持贴边(左/右/上/下)与完全自由悬浮两种姿态,位置/大小/姿态持久化到 Data\island.json
public class IslandController
{
    // DIP:窗口边缘距工作区边缘小于该值算"贴边";按住不动这么久才真正化岛,防误触
    private const double SnapThreshold = 12;
    private static readonly TimeSpan SnapDelay = TimeSpan.FromMilliseconds(550);

    private readonly MainWindow _main;
    private readonly DispatcherTimer _snapTimer;
    private IslandEdge? _pendingEdge;
    private IslandWindow? _island;
    private IslandEdge? _currentEdge;
    private bool _currentVertical;
    private MiniPresenceWindow? _miniPresence;
    private Rect _boundsBeforeIsland;

    // 退出灵动岛还原主窗位置的移动是程序化的,须屏蔽贴边检测:
    // 化岛前的位置本来就贴边(用户正是拖到边缘才化的岛),还原即命中 ≤12DIP 贴边判定,
    // 550ms 防抖一到就又自动化岛——表现为"双击退出后没过一秒岛又回来了"
    private bool _suppressSnap;

    public IslandController(MainWindow main)
    {
        _main = main;
        _snapTimer = new DispatcherTimer { Interval = SnapDelay };
        _snapTimer.Tick += (_, _) =>
        {
            _snapTimer.Stop();
            if (_pendingEdge is { } edge && _main.WindowState == WindowState.Normal)
                EnterIslandMode(edge);
            _pendingEdge = null;
        };
    }

    // 主窗口 LocationChanged → 贴边检测(防抖:静止 550ms 才化岛,拖动路过不触发)
    public void OnMainLocationChanged()
    {
        if (_suppressSnap || _island is not null || _main.WindowState != WindowState.Normal) return;
        var wa = WorkAreaOf(_main, out _);
        if (wa.IsEmpty) return;

        var rect = new Rect(_main.Left, _main.Top, _main.ActualWidth, _main.ActualHeight);
        // 各边判定语义统一为"窗口该边缘距工作区该边缘的距离 ≤ 阈值":
        // Left=rect.Left-wa.Left / Right=wa.Right-rect.Right / Bottom=wa.Bottom-rect.Bottom,
        // Top 同理是 rect.Top-wa.Top。v0.0.4 曾误写成 wa.Top-rect.Top(方向反了):
        // 屏幕内窗口该值恒为负 → 恒 ≤ 阈值 → 任何一次 LocationChanged(启动 Show/托盘还原/轻拖)
        // 都在 550ms 后化岛到顶部——表现为"灵动岛永远自己回到最上面"
        IslandEdge? edge =
            rect.Left - wa.Left <= SnapThreshold ? IslandEdge.Left :
            wa.Right - rect.Right <= SnapThreshold ? IslandEdge.Right :
            rect.Top - wa.Top <= SnapThreshold ? IslandEdge.Top :
            wa.Bottom - rect.Bottom <= SnapThreshold ? IslandEdge.Bottom : null;

        if (edge is null) { _snapTimer.Stop(); _pendingEdge = null; return; }
        if (_pendingEdge != edge)
        {
            _pendingEdge = edge; _snapTimer.Stop();
            App.Trace($"snap pending: edge={edge} win=({_main.Left:F0},{_main.Top:F0}) state={_main.WindowState} island={_island is not null}");
        }
        _snapTimer.Start();
    }

    // offset:沿边偏移(DIP,null=沿边居中);scale:缩放(null=1);edge=null + freeX/freeY = 自由悬浮。
    // 化岛即持久化,重启后按原姿态恢复
    public void EnterIslandMode(IslandEdge? edge, double? offset = null, double? scale = null,
                                bool? vertical = null, double? freeX = null, double? freeY = null)
    {
        if (_island is not null) return;
        _snapTimer.Stop();
        var wa = WorkAreaOf(_main, out var dpi);
        if (wa.IsEmpty) return;
        App.Trace($"enter island: edge={edge?.ToString() ?? "free"} offset={offset?.ToString() ?? "null"} scale={scale?.ToString() ?? "null"}");

        _currentEdge = edge;
        _currentVertical = vertical ?? edge is IslandEdge.Left or IslandEdge.Right;
        SaveIslandState(edge?.ToString(), offset, scale, _currentVertical, freeX, freeY);
        _boundsBeforeIsland = new Rect(_main.Left, _main.Top, _main.Width, _main.Height);
        HideMiniPresence();
        _main.Hide();

        _island = new IslandWindow(Entries(), _currentVertical, OpenQuickCapture, ExitIslandMode, OnIslandPersist);
        _island.SetAnchor(edge, wa, dpi, offset, scale, freeX, freeY);
        _island.Show();
    }

    public void ExitIslandMode()
    {
        if (_island is null) return;
        _island.Close();
        _island = null;
        SaveIslandState(null, null, null, _currentVertical, null, null); // 清除化岛持久化

        // 屏蔽还原这段程序化移动的贴边检测;同时清掉可能残留的待化岛状态
        _snapTimer.Stop();
        _pendingEdge = null;
        _suppressSnap = true;

        // 主窗口回到化岛前的位置,夹回当前工作区防止在屏幕外
        var wa = _miniPresence?.Anchor ?? WorkAreaOf(_main, out _);
        var r = _boundsBeforeIsland;
        if (!wa.IsEmpty)
        {
            r.Width = Math.Min(Math.Max(r.Width, 300), wa.Width);
            r.Height = Math.Min(Math.Max(r.Height, 300), wa.Height);
            r.X = Math.Clamp(r.X, wa.Left, Math.Max(wa.Left, wa.Right - r.Width));
            r.Y = Math.Clamp(r.Y, wa.Top, Math.Max(wa.Top, wa.Bottom - r.Height));
            // 化岛前的位置就是用户贴边拖进来的位置(如顶部 y≈0),原样还原仍落在贴边阈值内,
            // 用户随后一碰窗口就再次化岛——表现为"退出灵动岛后又自动变回灵动岛"。
            // 因此把还原点夹进"安全内部带"(距四边均 ≥ 阈值+12),脱离贴边区;
            // 用户之后主动拖到边缘仍会照常化岛。屏幕太小放不下安全带时跳过,退回普通夹取
            var push = SnapThreshold + 12; // 24 DIP
            double minX = wa.Left + push, maxX = wa.Right - r.Width - push;
            if (maxX >= minX) r.X = Math.Clamp(r.X, minX, maxX);
            double minY = wa.Top + push, maxY = wa.Bottom - r.Height - push;
            if (maxY >= minY) r.Y = Math.Clamp(r.Y, minY, maxY);
        }
        App.Trace($"exit island: restored=({r.X:0},{r.Y:0}) {r.Width:0}x{r.Height:0} before=({_boundsBeforeIsland.Left:0},{_boundsBeforeIsland.Top:0})");
        _main.Left = r.X;
        _main.Top = r.Y;
        _main.Width = r.Width;
        _main.Height = r.Height;
        _main.WindowState = WindowState.Normal;
        _main.Show();
        _main.Activate();
        HideMiniPresence();

        // Show/移动引发的 WM_WINDOWPOSCHANGED → LocationChanged 可能晚于本方法返回才送达,
        // 等消息队列消化完这批程序化移动(空闲优先级)再恢复贴边检测;
        // 用户此后主动拖窗到边缘仍会照常化岛,行为不变
        _main.Dispatcher.BeginInvoke(DispatcherPriority.ApplicationIdle,
            new Action(() => _suppressSnap = false));
    }

    public void Shutdown()
    {
        _snapTimer.Stop();
        _island?.Close();
        _island = null;
        HideMiniPresence();
    }

    // 岛当前是否开着(托盘/胶囊菜单分流用)
    public bool IsIslandOpen => _island is not null;

    // ===== 右下角存在感小胶囊 =====

    // 最小化到托盘时的可见存在:系统托盘图标在本机被防护软件压制,用小胶囊兜底
    public void ShowMiniPresence()
    {
        if (_miniPresence is { } m && m.IsLoaded) return;
        _miniPresence = new MiniPresenceWindow(
            () => _main.Dispatcher.Invoke(new Action(_main.RestoreFromTray)),
            () => _main.Dispatcher.Invoke(new Action(() => ToggleIslandFromTray())),
            () => _main.Dispatcher.Invoke(ExitApplication));
        _miniPresence.SetPosition(WorkAreaOf(_main, out _));
        _miniPresence.Show();
    }

    public void HideMiniPresence() => _miniPresence?.Close();

    private void ToggleIslandFromTray()
    {
        if (_island is not null) { ExitIslandMode(); return; }
        var (edgeStr, offset, scale, vertical, freeX, freeY) = LoadIslandState();
        var edge = edgeStr switch
        {
            "Left" => IslandEdge.Left,
            "Bottom" => IslandEdge.Bottom,
            "Right" => IslandEdge.Right,
            "Top" => IslandEdge.Top,
            _ => (IslandEdge?)null,
        };
        EnterIslandMode(edge, offset, scale, vertical, freeX, freeY);
        Toast.Show("已进入灵动岛", "🏝️");
    }

    // 真实退出:跳过最小化询问,关闭时连带收掉岛与小胶囊
    public void ExitApplication() => _main.ExitApplication();

    // ===== 快速记录窗 =====

    private (string Key, string Glyph, string Label)[] Entries() => new[]
    {
        ("notes", "📝", "便签"),
        ("tasks", "🗂️", "任务记录"),
        ("todos", "✅", "待办"),
    };

    // 点岛上的入口 → 快速记录窗(不再弹整页):
    // 便签 = 直接开新置顶小窗;任务 = 编辑窗新建(标题/内容/子任务/标签);待办 = 快速待办窗
    public void OpenQuickCapture(string key)
    {
        switch (key)
        {
            case "notes":
            {
                var note = new NoteItem();
                App.Data.Notes.Insert(0, note);
                App.Persist();
                var win = new StickyWindow(note) { Owner = _main, Topmost = true };
                win.Show();
                break;
            }
            case "tasks":
            {
                var task = new TaskItem { Title = "新任务", Status = "待开始" };
                var win = new TaskEditWindow(task) { Owner = _island, Topmost = true };
                if (win.ShowDialog() == true)
                {
                    App.Data.Tasks.Insert(0, task);
                    App.Persist();
                }
                break;
            }
            case "todos":
            {
                var win = new QuickTodoWindow { Owner = _island, Topmost = true };
                if (win.ShowDialog() == true && win.Result is not null)
                {
                    App.Data.Todos.Insert(0, win.Result);
                    App.Persist();
                }
                break;
            }
        }
    }

    // ===== 持久化:存 Data\island.json =====
    // 为什么不用注册表:本机防护按进程拦截未签名 exe 写 HKCU(实测 UnauthorizedAccessException),
    // 而数据目录(SQLite 所在)一直放行,且随应用目录便携走
    private static string IslandStatePath => Path.Combine(App.DataDir, "island.json");

    public static (string? Edge, double? Offset, double? Scale, bool? Vertical, double? FreeX, double? FreeY) LoadIslandState()
    {
        try
        {
            if (!File.Exists(IslandStatePath)) return (null, null, null, null, null, null);
            using var doc = JsonDocument.Parse(File.ReadAllText(IslandStatePath));
            var root = doc.RootElement;
            var edge = root.TryGetProperty("edge", out var e) && e.ValueKind == JsonValueKind.String
                ? e.GetString() : null;
            // 审计加固:edge 白名单化——非合法边名一律回退 null(调用方用安全默认),杜绝任意字符串下游解析
            edge = edge is "Left" or "Right" or "Bottom" or "Top" ? edge : null;
            double? offset = root.TryGetProperty("offset", out var o) && o.ValueKind == JsonValueKind.Number
                ? o.GetDouble() : null;
            double? scale = root.TryGetProperty("scale", out var s) && s.ValueKind == JsonValueKind.Number
                ? s.GetDouble() : null;
            bool? vertical = root.TryGetProperty("vertical", out var vv) && vv.ValueKind == JsonValueKind.True
                ? true : root.TryGetProperty("vertical", out var vf) && vf.ValueKind == JsonValueKind.False
                ? false : null;
            double? freeX = root.TryGetProperty("freeX", out var fx) && fx.ValueKind == JsonValueKind.Number
                ? fx.GetDouble() : null;
            double? freeY = root.TryGetProperty("freeY", out var fy) && fy.ValueKind == JsonValueKind.Number
                ? fy.GetDouble() : null;
            return (edge, offset, scale, vertical, freeX, freeY);
        }
        catch
        {
            return (null, null, null, null, null, null);
        }
    }

    private void OnIslandPersist()
    {
        if (_island is null) return;
        var (edge, offset, scale, freeX, freeY, vertical) = _island.CaptureState();
        _currentEdge = edge;
        _currentVertical = vertical;
        SaveIslandState(edge?.ToString(), offset, scale, vertical, freeX, freeY);
    }

    private static void SaveIslandState(string? edge, double? offset, double? scale,
                                        bool? vertical, double? freeX, double? freeY)
    {
        try
        {
            Directory.CreateDirectory(App.DataDir);
            if (string.IsNullOrWhiteSpace(edge) && freeX is null)
            {
                if (File.Exists(IslandStatePath)) File.Delete(IslandStatePath);
                return;
            }
            var json = JsonSerializer.Serialize(new { edge, offset, scale, vertical, freeX, freeY });
            File.WriteAllText(IslandStatePath, json);
        }
        catch
        {
            // 持久化失败只影响"记住位置",不影响化岛本身
        }
    }

    private static System.Windows.Media.ImageSource AppIcon()
        => new System.Windows.Media.Imaging.BitmapImage(new Uri("pack://application:,,,/Assets/app.ico"));

    // 窗口所在屏幕的工作区,换算成 WPF 的 DIP 坐标(Screen 返回的是物理像素)。
    // 启动即化岛时主窗口还没走完整 Show 流程,PresentationSource 可能拿不到,
    // 此时 EnsureHandle 补建句柄并用 GDI 查该屏设备 DPI
    private Rect WorkAreaOf(Window w, out double dpi)
    {
        dpi = 1;
        var hwnd = new WindowInteropHelper(w).EnsureHandle();
        if (hwnd == IntPtr.Zero) return Rect.Empty;
        var source = PresentationSource.FromVisual(w);
        if (source?.CompositionTarget is not null)
        {
            dpi = source.CompositionTarget.TransformToDevice.M11;
        }
        else
        {
            try
            {
                using var g = System.Drawing.Graphics.FromHwnd(hwnd);
                dpi = g.DpiX / 96.0;
            }
            catch { /* 保持 1.0 */ }
        }
        if (dpi <= 0) dpi = 1;
        var area = WinForms.Screen.FromHandle(hwnd).WorkingArea;
        return new Rect(area.Left / dpi, area.Top / dpi, area.Width / dpi, area.Height / dpi);
    }
}
