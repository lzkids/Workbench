using System.IO;
using System.Text.Json;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Interop;
using System.Windows.Threading;
using Wpf.Ui.Controls;
using Workbench.Models;
using Workbench.ViewModels;
using Workbench.Views;
using WinForms = System.Windows.Forms;

namespace Workbench;

public enum IslandEdge { Left, Right, Bottom } // 顶边留给系统最大化,不做贴边

// 灵动岛总控:主窗口拖到屏幕左/右/下边缘静止片刻 → 化岛(便签/任务记录/待办三个入口);
// 点岛上的入口弹出对应页面的独立窗口(主窗口保持隐藏);还原时主窗口回到化岛前的位置
public class IslandController
{
    // DIP:窗口边缘距工作区边缘小于该值算"贴边";按住不动这么久才真正化岛,防误触
    private const double SnapThreshold = 12;
    private static readonly TimeSpan SnapDelay = TimeSpan.FromMilliseconds(550);

    private readonly MainWindow _main;
    private readonly DispatcherTimer _snapTimer;
    private IslandEdge? _pendingEdge;
    private IslandWindow? _island;
    private IslandEdge _currentEdge;
    private readonly Dictionary<string, Window> _popouts = new();
    private Rect _boundsBeforeIsland;

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
        if (_island is not null || _main.WindowState != WindowState.Normal) return;
        var wa = WorkAreaOf(_main, out _);
        if (wa.IsEmpty) return;

        var rect = new Rect(_main.Left, _main.Top, _main.ActualWidth, _main.ActualHeight);
        IslandEdge? edge =
            rect.Left - wa.Left <= SnapThreshold ? IslandEdge.Left :
            wa.Right - rect.Right <= SnapThreshold ? IslandEdge.Right :
            wa.Bottom - rect.Bottom <= SnapThreshold ? IslandEdge.Bottom : null;

        if (edge is null) { _snapTimer.Stop(); _pendingEdge = null; return; }
        if (_pendingEdge != edge) { _pendingEdge = edge; _snapTimer.Stop(); }
        _snapTimer.Start();
    }

    // offset:沿边偏移(DIP,null=居中);scale:缩放(null=1)。化岛即持久化,重启后按原样恢复
    public void EnterIslandMode(IslandEdge edge, double? offset = null, double? scale = null)
    {
        if (_island is not null) return;
        _snapTimer.Stop();
        var wa = WorkAreaOf(_main, out var dpi);
        App.Trace($"enter island: edge={edge} offset={offset} scale={scale} wa={wa} dpi={dpi}");
        if (wa.IsEmpty)
        {
            App.Trace("enter island aborted: work area unknown");
            return;
        }

        _currentEdge = edge;
        SaveIslandState(edge.ToString(), offset, scale);
        _boundsBeforeIsland = new Rect(_main.Left, _main.Top, _main.Width, _main.Height);
        _main.Hide();

        bool vertical = edge is IslandEdge.Left or IslandEdge.Right;
        _island = new IslandWindow(Entries(), vertical, OpenPopout, ExitIslandMode, OnIslandGeometry);
        _island.SetAnchor(edge, wa, dpi, offset, scale);
        _island.Show();
    }

    // 岛上拖动/缩放松手 → 记住新的沿边偏移与缩放
    private void OnIslandGeometry(double offset, double scale)
        => SaveIslandState(_currentEdge.ToString(), offset, scale);

    public void ExitIslandMode()
    {
        if (_island is null) return;
        var wa = _island.Anchor;
        _island.Close();
        _island = null;
        SaveIslandState(null, null, null); // 还原 = 清除持久化,下次完整窗口启动

        // 主窗口回到化岛前的位置,夹回当前工作区防止在屏幕外
        var r = _boundsBeforeIsland;
        if (!wa.IsEmpty)
        {
            r.Width = Math.Min(Math.Max(r.Width, 300), wa.Width);
            r.Height = Math.Min(Math.Max(r.Height, 300), wa.Height);
            r.X = Math.Clamp(r.X, wa.Left, Math.Max(wa.Left, wa.Right - r.Width));
            r.Y = Math.Clamp(r.Y, wa.Top, Math.Max(wa.Top, wa.Bottom - r.Height));
        }
        _main.Left = r.X;
        _main.Top = r.Y;
        _main.Width = r.Width;
        _main.Height = r.Height;
        _main.WindowState = WindowState.Normal;
        _main.Show();
        _main.Activate();
    }

    public void Shutdown()
    {
        _snapTimer.Stop();
        _island?.Close();
        _island = null;
        foreach (var w in _popouts.Values) w.Close();
        _popouts.Clear();
    }

    // ===== 独立窗口 =====

    private (string Key, string Glyph, string Label)[] Entries() => new[]
    {
        ("notes", "📝", "便签"),
        ("tasks", "🗂️", "任务记录"),
        ("todos", "✅", "待办"),
    };

    // 点岛上的入口:同类型窗口单实例(已开则聚焦),与主窗口共享同一份 ViewModel
    public void OpenPopout(string key)
    {
        if (_popouts.TryGetValue(key, out var existing))
        {
            existing.Activate();
            return;
        }

        var nav = key switch
        {
            "notes" => FindNav("便签"),
            "tasks" => FindNav("任务记录"),
            _ => FindNav("待办"),
        };

        // 页面到达钩子,与主窗口导航时保持一致
        switch (nav.Page)
        {
            case NotesViewModel p: p.RefreshFilter(); break;
            case TasksViewModel p: p.RefreshFilter(); break;
            case TodosViewModel p: p.RefreshSort(); break;
        }

        var (title, width, height, content) = key switch
        {
            "notes" => ("便签", 560.0, 580.0, (FrameworkElement)new NotesPage()),
            "tasks" => ("任务记录", 820.0, 560.0, (FrameworkElement)new TasksPage()),
            _ => ("待办", 500.0, 580.0, (FrameworkElement)new TodosPage()),
        };
        content.DataContext = nav.Page;

        var win = new FluentWindow
        {
            Title = title,
            Icon = AppIcon(),
            Width = width,
            Height = height,
            MinWidth = 420,
            MinHeight = 400,
            ExtendsContentIntoTitleBar = true,
            WindowStartupLocation = WindowStartupLocation.Manual,
        };

        var grid = new Grid();
        grid.RowDefinitions.Add(new RowDefinition { Height = GridLength.Auto });
        grid.RowDefinitions.Add(new RowDefinition { Height = new GridLength(1, GridUnitType.Star) });
        var titleBar = new TitleBar { Title = title };
        var host = new ContentControl { Content = content, Margin = new Thickness(22, 16, 22, 16) };
        Grid.SetRow(titleBar, 0);
        Grid.SetRow(host, 1);
        grid.Children.Add(titleBar);
        grid.Children.Add(host);
        win.Content = grid;

        // 弹窗居中在灵动岛所在屏幕
        var wa = _island?.Anchor ?? WorkAreaOf(_main, out _);
        if (!wa.IsEmpty)
        {
            win.Left = wa.Left + (wa.Width - width) / 2;
            win.Top = wa.Top + (wa.Height - height) / 2;
        }

        win.Closed += (_, _) => _popouts.Remove(key);
        _popouts[key] = win;
        win.Show();
    }

    // ===== 持久化:存 Data\island.json =====
    // 为什么不用注册表:本机防护按进程拦截未签名 exe 写 HKCU(实测 UnauthorizedAccessException),
    // 而数据目录(SQLite 所在)一直放行,且随应用目录便携走
    private static string IslandStatePath => Path.Combine(App.DataDir, "island.json");

    public static (string? Edge, double? Offset, double? Scale) LoadIslandState()
    {
        try
        {
            if (!File.Exists(IslandStatePath)) return (null, null, null);
            using var doc = JsonDocument.Parse(File.ReadAllText(IslandStatePath));
            var root = doc.RootElement;
            var edge = root.TryGetProperty("edge", out var e) && e.ValueKind == JsonValueKind.String
                ? e.GetString() : null;
            double? offset = root.TryGetProperty("offset", out var o) && o.ValueKind == JsonValueKind.Number
                ? o.GetDouble() : null;
            double? scale = root.TryGetProperty("scale", out var s) && s.ValueKind == JsonValueKind.Number
                ? s.GetDouble() : null;
            return (string.IsNullOrWhiteSpace(edge) ? null : edge, offset, scale);
        }
        catch
        {
            return (null, null, null);
        }
    }

    private static void SaveIslandState(string? edge, double? offset, double? scale)
    {
        try
        {
            Directory.CreateDirectory(App.DataDir);
            if (string.IsNullOrWhiteSpace(edge))
            {
                if (File.Exists(IslandStatePath)) File.Delete(IslandStatePath);
                return;
            }
            var json = JsonSerializer.Serialize(new { edge, offset, scale });
            File.WriteAllText(IslandStatePath, json);
        }
        catch
        {
            // 持久化失败只影响"记住位置",不影响化岛本身
        }
    }

    // 仅供 memtest:关闭全部弹窗(走正常 Closed 流程,清理字典)
    public void CloseAllPopouts()
    {
        foreach (var w in _popouts.Values.ToList()) w.Close();
    }

    private NavigationItem FindNav(string title)
        => ((MainViewModel)_main.DataContext).TopNavItems.First(i => i.Title == title);

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
