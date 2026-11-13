using System.ComponentModel;
using System.IO;
using System.Runtime.InteropServices;
using System.Windows;
using System.Windows.Interop;
using System.Windows.Media.Animation;
using Wpf.Ui.Controls;
using Workbench.Services;
using Workbench.ViewModels;
using WinForms = System.Windows.Forms;

namespace Workbench;

public partial class MainWindow : FluentWindow
{
    // 侧栏展开/收起宽度,与 XAML 中 Sidebar 的 Width="200" 对应
    private const double ExpandedSidebarWidth = 200;
    private const double CollapsedSidebarWidth = 56;

    private MainViewModel? _hookedVm;

    // 托盘(通知区域)图标:应用常驻右下角;_forceExit=托盘"退出"走真实关闭,绕过最小化询问
    private WinForms.NotifyIcon? _trayIcon;
    private bool _forceExit;

    public MainWindow()
    {
        InitializeComponent();
        UpdateThemeButton();
        CreateTrayIcon();

        // 顶边贴岛前置:拖到屏幕顶边松手,系统的 Aero Snap 会抢先最大化(窗口变大),
        // 化岛定时器因 WindowState≠Normal 直接放弃——表现为"拖上去变大了,岛没了"。
        // 摘掉 WS_MAXIMIZEBOX 样式位即按窗口禁用拖顶最大化;WPF-UI 自绘的最大化按钮
        // 走 WindowState 属性设置,不经过这个样式位,不受影响
        SourceInitialized += (_, _) =>
        {
            var hwnd = new WindowInteropHelper(this).Handle;
            const int GWL_STYLE = -16, WS_MAXIMIZEBOX = 0x00010000;
            var style = GetWindowLong(hwnd, GWL_STYLE);
            // run-2 审计加固:GetWindowLong 失败返回 0,此时照常写回会把整窗样式清零——跳过并留痕
            if (style == 0)
            {
                App.Trace("aero-snap-disable: GetWindowLong returned 0, style edit skipped");
                return;
            }
            // SetWindowLong 失败返回 0(拖顶最大化未禁,化岛防抖会放弃=功能降级):留痕便于排查
            if (SetWindowLong(hwnd, GWL_STYLE, style & ~WS_MAXIMIZEBOX) == 0)
                App.Trace("aero-snap-disable: SetWindowLong failed, top-drag maximize stays enabled");
        };

        // App 里是 new MainWindow { DataContext = ... },构造时还拿不到 VM;
        // 在 DataContextChanged 里挂选中同步钩子。先退订旧 VM 再订新 VM:
        // VM 持有窗口引用,重复挂会旧引用堆积累(理论上 DataContext 只设一次,这里做保险)
        DataContextChanged += (_, _) =>
        {
            if (DataContext is MainViewModel vm)
            {
                if (!ReferenceEquals(_hookedVm, vm))
                {
                    if (_hookedVm is not null) _hookedVm.PropertyChanged -= VmOnPropertyChanged;
                    vm.PropertyChanged += VmOnPropertyChanged;
                    _hookedVm = vm;
                }
                SyncTopNavHighlight();
            }
        };
    }

    private void VmOnPropertyChanged(object? sender, PropertyChangedEventArgs e)
    {
        if (e.PropertyName == nameof(MainViewModel.Selected))
            SyncTopNavHighlight();
    }

    [DllImport("user32.dll")]
    private static extern int GetWindowLong(IntPtr hWnd, int nIndex);

    [DllImport("user32.dll")]
    private static extern int SetWindowLong(IntPtr hWnd, int nIndex, int dwNewLong);

    // ===== 系统托盘 =====

    // 右下角常驻图标:左键点击还原完整工作台,右键出菜单(打开/灵动岛/退出)
    private void CreateTrayIcon()
    {
        // 诊断实录:直接从 pack 流构造的 System.Drawing.Icon 在本机 shell 上不显示。
        // 改为把包内 app.ico 提取到 exe 旁文件,从文件构造(外壳对文件路径图标兼容性最好)
        var sri = Application.GetResourceStream(new Uri("pack://application:,,,/Assets/app.ico"))
                  ?? throw new InvalidOperationException("Assets/app.ico 资源缺失");
        var iconFile = Path.Combine(AppContext.BaseDirectory, "workbench.tray.ico");
        using (var fs = File.Create(iconFile))
            sri.Stream.CopyTo(fs);

        var menu = new WinForms.ContextMenuStrip();
        menu.Items.Add("打开工作台", null, (s, _) => RestoreFromTray());
        menu.Items.Add("进入灵动岛", null, (s, _) => ToggleIslandFromTray());
        menu.Items.Add(new WinForms.ToolStripSeparator());
        menu.Items.Add("退出", null, (s, _) => ExitApplication());

        _trayIcon = new WinForms.NotifyIcon
        {
            Icon = new System.Drawing.Icon(iconFile),
            Text = "工作台",
            Visible = true,
            ContextMenuStrip = menu,
        };
        _trayIcon.MouseUp += (s, e) =>
        {
            if (e.Button == WinForms.MouseButtons.Left) RestoreFromTray();
        };
    }

    // 从托盘/小胶囊还原:岛开着就还原成完整软件,否则显示主窗口
    public void RestoreFromTray()
    {
        if (_islandController is { } c && c.IsIslandOpen)
        {
            c.ExitIslandMode();
            return;
        }
        _islandController?.HideMiniPresence();
        Show();
        if (WindowState == WindowState.Minimized) WindowState = WindowState.Normal;
        Activate();
    }

    // ✕ 分流的"最小化到托盘":隐藏主窗,右下角显示存在感小胶囊(系统托盘图标在本机被压制)
    private void MinimizeToTray()
    {
        Hide();
        _islandController?.ShowMiniPresence();
    }

    // 托盘菜单的灵动岛入口:开着就还原,没开就按上次姿态(贴边/自由)进入
    private void ToggleIslandFromTray()
    {
        if (_islandController is null) return;
        if (_islandController.IsIslandOpen)
        {
            _islandController.ExitIslandMode();
            return;
        }
        var (edgeStr, offset, scale, vertical, freeX, freeY) = IslandController.LoadIslandState();
        var edge = edgeStr switch
        {
            "Left" => IslandEdge.Left,
            "Bottom" => IslandEdge.Bottom,
            "Right" => IslandEdge.Right,
            "Top" => IslandEdge.Top,
            _ => (IslandEdge?)null,
        };
        _islandController.EnterIslandMode(edge, offset, scale, vertical, freeX, freeY);
        Toast.Show("已进入灵动岛", "🏝️");
    }

    // 真实退出:跳过最小化询问,关闭时连带收掉岛、小胶囊与置顶便签
    public void ExitApplication()
    {
        _forceExit = true;
        Close();
        Application.Current.Shutdown();
    }

    // ✕ 按钮:按用户偏好分流——直接退出 / 最小化到托盘 / 每次询问
    protected override void OnClosing(CancelEventArgs e)
    {
        if (!_forceExit)
        {
            var action = UserPrefs.GetCloseAction();
            if (action == "minimize")
            {
                e.Cancel = true;
                MinimizeToTray();
                return;
            }
            if (action == "ask")
            {
                var ask = new CloseAskWindow { Owner = this };
                if (ask.ShowDialog() != true) { e.Cancel = true; return; }
                if (ask.Remember) UserPrefs.SetCloseAction(ask.Choice);
                if (ask.Choice == "minimize")
                {
                    e.Cancel = true;
                    MinimizeToTray();
                    return;
                }
            }
            // 直接退出 → 标记真退出
            _forceExit = true;
        }
        _trayIcon?.Dispose(); // 真退出:清掉托盘图标,防止残留幽灵图标
        _trayIcon = null;
        base.OnClosing(e);
        // 审计反馈的"完整退出":主窗关闭后连带关掉置顶便签等全部窗口,
        // 否则 ShutdownMode=OnLastWindowClose 会因残留置顶窗而继续驻留后台
        if (_forceExit)
            Application.Current.Shutdown();
    }

    private MainViewModel Vm => (MainViewModel)DataContext;

    private IslandController? _islandController;

    // App 注入灵动岛总控:主窗口拖到屏幕左/右/下边缘静止片刻 → 化岛
    public void AttachIsland(IslandController controller)
    {
        _islandController = controller;
        LocationChanged += (_, _) => controller.OnMainLocationChanged();
        Closed += (_, _) => controller.Shutdown();
    }

    // 侧栏收起/展开:文字与边距的显隐由 IsCollapsed 绑定驱动,这里只做宽度短动画
    private void SidebarToggle_Click(object sender, RoutedEventArgs e)
    {
        Vm.IsCollapsed = !Vm.IsCollapsed;
        var anim = new DoubleAnimation(Vm.IsCollapsed ? CollapsedSidebarWidth : ExpandedSidebarWidth,
                                       TimeSpan.FromMilliseconds(170))
        { EasingFunction = new QuadraticEase { EasingMode = EasingMode.EaseOut } };
        Sidebar.BeginAnimation(WidthProperty, anim);
    }

    // 上部列表点击 → 写回 VM;底部按钮/主页跳转改了 Selected → 这里同步高亮。
    // 回收站/设置不属于上部列表,此时清空其选中,由底部按钮样式自行高亮
    private void TopNav_SelectionChanged(object sender, System.Windows.Controls.SelectionChangedEventArgs e)
    {
        if (e.AddedItems.Count > 0 && e.AddedItems[0] is NavigationItem item)
            Vm.Selected = item;
    }

    private void SyncTopNavHighlight()
    {
        TopNav.SelectedItem = Vm.TopNavItems.Contains(Vm.Selected) ? Vm.Selected : null;
    }

    // 底部导航图标:回收站/设置 → 选中对应 NavItem,内容区随 DataTemplate 切页
    private void BottomNav_Click(object sender, RoutedEventArgs e)
        => Vm.Selected = Vm.BottomNavItems[sender == RecycleBtn ? 0 : 1];

    // 底部 ☁️:跳到设置页并滚动定位云同步卡片(已在设置页则直接定位);跨页时给 SettingsPage 一次性令牌
    private void CloudSyncSettings_Click(object sender, RoutedEventArgs e)
    {
        var settingsItem = Vm.BottomNavItems[1];
        bool already = Vm.Selected == settingsItem;
        Vm.Selected = settingsItem;
        if (already) Views.SettingsPage.Current?.RevealCloudSection();
        else App.PendingCloudSectionJump = true;
    }

    // 深浅色切换:防御式——失败弹提示、真正回滚,绝不闪退也不留"半应用"状态
    public void ToggleTheme()
    {
        var previous = App.Data.Theme;
        try
        {
            var next = previous == "Dark" ? "Light" : "Dark";
            App.Trace($"toggle {previous} -> {next}: begin");
            App.ApplyTheme(next);
            App.Trace("toggle: apply ok");
            App.Data.Theme = next;
            App.Persist();
            App.Trace("toggle: persist ok");
            UpdateThemeButton();
            // 推给已打开的 md 编辑器小窗(Vditor 重建换肤,内容保留;MD 文档窗连配色一起换)
            foreach (var w in Application.Current.Windows.OfType<StickyWindow>())
                w.OnAppThemeChanged();
            foreach (var w in Application.Current.Windows.OfType<MdDocWindow>())
                w.OnAppThemeChanged();
        }
        catch (Exception ex)
        {
            App.Trace($"toggle FAILED: {ex.GetType().Name}: {ex.Message}");
            App.WriteCrashLog(ex);
            App.ApplyTheme(previous); // 真正回滚
            UpdateThemeButton();
            System.Windows.MessageBox.Show(this, $"切换主题失败,已恢复原状。\n\n{ex.Message}", "工作台",
                System.Windows.MessageBoxButton.OK, System.Windows.MessageBoxImage.Warning);
        }
    }

    private void ThemeToggle_Click(object sender, RoutedEventArgs e) => ToggleTheme();

    // 底部按钮已改 SymbolIcon-only:图标和悬停提示都显示"要切到"的目标模式
    private void UpdateThemeButton()
    {
        bool dark = App.Data.Theme == "Dark";
        ThemeSymbol.Symbol = dark ? SymbolRegular.WeatherSunny24 : SymbolRegular.WeatherMoon24;
        ThemeToggle.ToolTip = dark ? "浅色模式" : "深色模式";
    }
}
