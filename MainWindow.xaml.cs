using System.ComponentModel;
using System.Windows;
using System.Windows.Media.Animation;
using Wpf.Ui.Controls;
using Workbench.ViewModels;

namespace Workbench;

public partial class MainWindow : FluentWindow
{
    // 侧栏展开/收起宽度,与 XAML 中 Sidebar 的 Width="200" 对应
    private const double ExpandedSidebarWidth = 200;
    private const double CollapsedSidebarWidth = 56;

    private MainViewModel? _hookedVm;

    public MainWindow()
    {
        InitializeComponent();
        UpdateThemeButton();

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
        if (e.AddedItems.Count > 0)
            Vm.Selected = (NavigationItem)e.AddedItems[0];
    }

    private void SyncTopNavHighlight()
    {
        TopNav.SelectedItem = Vm.TopNavItems.Contains(Vm.Selected) ? Vm.Selected : null;
    }

    // 底部导航图标:回收站/设置 → 选中对应 NavItem,内容区随 DataTemplate 切页
    private void BottomNav_Click(object sender, RoutedEventArgs e)
        => Vm.Selected = Vm.BottomNavItems[sender == RecycleBtn ? 0 : 1];

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

    // 底部按钮已改图标-only:图标和悬停提示都显示"要切到"的目标模式
    private void UpdateThemeButton()
    {
        bool dark = App.Data.Theme == "Dark";
        ThemeGlyph.Text = dark ? "☀️" : "🌙";
        ThemeToggle.ToolTip = dark ? "浅色模式" : "深色模式";
    }
}
