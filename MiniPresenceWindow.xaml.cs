using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;

namespace Workbench;

// 最小化到托盘时的右下角小胶囊:左键还原工作台,右键菜单(打开/灵动岛/退出);
// 位置固定在任务栏上方右下角(Anchor 工作区由控制器提供)
public partial class MiniPresenceWindow : Window
{
    private readonly Action _onOpen;
    private readonly Action _onToggleIsland;
    private readonly Action _onExit;
    private Rect _wa;

    public MiniPresenceWindow(Action onOpen, Action onToggleIsland, Action onExit)
    {
        InitializeComponent();
        _onOpen = onOpen;
        _onToggleIsland = onToggleIsland;
        _onExit = onExit;

        var menu = new ContextMenu();
        menu.Items.Add(new MenuItem { Header = "打开工作台", FontWeight = FontWeights.Medium });
        menu.Items.Add(new MenuItem { Header = "进入灵动岛" });
        menu.Items.Add(new MenuItem { Header = "退出" });
        // 占位:真正动作在初始化后挂(闭包引用三个委托)
        ((MenuItem)menu.Items[0]).Click += (_, _) => _onOpen();
        ((MenuItem)menu.Items[1]).Click += (_, _) => _onToggleIsland();
        ((MenuItem)menu.Items[2]).Click += (_, _) => _onExit();
        Pill.ContextMenu = menu;
        Pill.ToolTip = "点击还原工作台";

        Loaded += (_, _) => Place();
    }

    public Rect Anchor => _wa;

    // 控制器告知工作区(DIP),贴在右下角任务栏上方
    public void SetPosition(Rect workArea)
    {
        _wa = workArea;
    }

    public void Place()
    {
        if (_wa.IsEmpty || ActualWidth <= 0) return;
        Left = _wa.Right - ActualWidth - 6;
        Top = _wa.Bottom - ActualHeight - 6;
    }

    private void Pill_MouseLeftButtonDown(object sender, MouseButtonEventArgs e) => _onOpen();
}
