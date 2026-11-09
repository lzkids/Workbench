using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media.Animation;
using System.Windows.Threading;
using WinForms = System.Windows.Forms;
// UseWindowsForms 的隐式 using 会带进 System.Drawing,Point 须显式指向 WPF
using Point = System.Windows.Point;

namespace Workbench;

// 灵动岛胶囊窗:贴边悬浮、置顶;鼠标靠近(不用碰到)自动放大;
// 三个入口弹出对应独立窗口;左键拖动沿边滑动(松手回吸并上报偏移);
// 拖边缘等比缩放(离中心越远越大,松手上报);双击或右键还原主窗口
public partial class IslandWindow : Window
{
    // 鼠标距胶囊多近算"靠近"(物理像素);靠近放大比例
    private const double ProximityPx = 36;
    private const double EnlargeScale = 1.18;

    // 拖边缘调大小:边缘感应带(DIP)与缩放范围
    private const double ResizeBand = 7;
    private const double ScaleMin = 0.6;
    private const double ScaleMax = 2.4;

    // 窗口内透明边距(XAML Grid Margin),胶囊本体相对窗口的偏移,Place/偏移换算全依赖它
    private const double MarginX = 28;
    private const double MarginY = 16;

    private readonly Action<string> _onItem;
    private readonly Action _onRestore;
    private readonly Action<double, double> _onGeometry; // (沿边偏移, 缩放) 拖动/缩放结束后上报持久化
    private readonly DispatcherTimer _proximityTimer;
    private bool _enlarged;
    private IslandEdge _edge;
    private Rect _wa;
    private double _dpi = 1;
    private double? _offset; // 沿边偏移(DIP);null = 居中
    private double _scale = 1;

    // 拖边缘缩放进行中的状态
    private bool _resizing;
    private Point _resizeCenter; // 按下时胶囊中心(屏幕 DIP 坐标),缩放以它为锚
    private double _resizeStartDist;
    private double _resizeStartScale;

    public IslandWindow(IReadOnlyList<(string Key, string Glyph, string Label)> entries,
                        bool vertical, Action<string> onItem, Action onRestore,
                        Action<double, double> onGeometry)
    {
        InitializeComponent();
        _onItem = onItem;
        _onRestore = onRestore;
        _onGeometry = onGeometry;

        ItemsHost.Orientation = vertical ? Orientation.Vertical : Orientation.Horizontal;
        foreach (var entry in entries)
        {
            var btn = new Button
            {
                Style = (Style)Resources["PillItemStyle"],
                ToolTip = entry.Label,
            };
            if (vertical)
            {
                btn.Content = new TextBlock { Text = entry.Glyph, FontSize = 15 };
                btn.Margin = new Thickness(0, 3, 0, 3);
            }
            else
            {
                btn.Content = new StackPanel
                {
                    Orientation = Orientation.Horizontal,
                    Children =
                    {
                        new TextBlock { Text = entry.Glyph, FontSize = 15 },
                        new TextBlock { Text = entry.Label, FontSize = 12.5,
                                        Margin = new Thickness(7, 0, 0, 0),
                                        VerticalAlignment = VerticalAlignment.Center },
                    }
                };
                btn.Margin = new Thickness(3, 0, 3, 0);
            }
            btn.Click += (_, _) => _onItem(entry.Key);
            ItemsHost.Children.Add(btn);
        }

        // 还原入口:右键菜单(双击也可,但拖动会偶发吞掉第二次点击,右键是可靠的主入口)
        var menu = new ContextMenu();
        var restore = new MenuItem { Header = "还原完整工作台", FontWeight = FontWeights.Medium };
        restore.Click += (_, _) => _onRestore();
        menu.Items.Add(restore);
        Pill.ContextMenu = menu;
        Pill.ToolTip = "拖动沿边移动 · 拖边缘调整大小 · 双击/右键还原完整软件";

        _proximityTimer = new DispatcherTimer { Interval = TimeSpan.FromMilliseconds(90) };
        _proximityTimer.Tick += (_, _) => UpdateEnlarge();

        SizeChanged += (_, _) => Place(); // LayoutTransform 缩放改变窗口尺寸 → 重新吸附

        Loaded += (_, _) =>
        {
            _proximityTimer.Start();
            Opacity = 0;
            BeginAnimation(OpacityProperty, new DoubleAnimation(1, TimeSpan.FromMilliseconds(160)));
        };
        Closing += (_, _) => _proximityTimer.Stop();
        ContentRendered += (_, _) => Place(); // 尺寸确定后吸附到位
    }

    // 控制器告知贴哪条边、哪块工作区(DIP)、DPI 缩放、上次沿边偏移与缩放
    public void SetAnchor(IslandEdge edge, Rect workArea, double dpi, double? offset, double? scale)
    {
        _edge = edge;
        _wa = workArea;
        _dpi = dpi <= 0 ? 1 : dpi;
        _offset = offset;
        _scale = Math.Clamp(scale ?? 1, ScaleMin, ScaleMax);
        BodyScale.ScaleX = BodyScale.ScaleY = _scale;
    }

    public Rect Anchor => _wa;

    public double CurrentScale => _scale;

    // 吸附到锚定边缘;_offset 为空时沿边居中
    public void Place()
    {
        if (_wa.IsEmpty || ActualWidth <= 0) return;
        switch (_edge)
        {
            case IslandEdge.Left:
            {
                var h = ActualHeight - 2 * MarginY;
                var body = Math.Clamp(_offset ?? (_wa.Height - h) / 2, 0, Math.Max(0, _wa.Height - h));
                Top = _wa.Top + body - MarginY;
                Left = _wa.Left + 6 - MarginX;
                break;
            }
            case IslandEdge.Right:
            {
                var h = ActualHeight - 2 * MarginY;
                var body = Math.Clamp(_offset ?? (_wa.Height - h) / 2, 0, Math.Max(0, _wa.Height - h));
                Top = _wa.Top + body - MarginY;
                Left = _wa.Right - 6 - MarginX - (ActualWidth - 2 * MarginX);
                break;
            }
            case IslandEdge.Bottom:
            {
                var w = ActualWidth - 2 * MarginX;
                var body = Math.Clamp(_offset ?? (_wa.Width - w) / 2, 0, Math.Max(0, _wa.Width - w));
                Left = _wa.Left + body - MarginX;
                Top = _wa.Bottom - 6 - MarginY - (ActualHeight - 2 * MarginY);
                break;
            }
        }
    }

    // 当前沿边偏移(胶囊本体起点距工作区起点),拖动松手后上报控制器做持久化
    private double? CurrentOffset()
    {
        if (_wa.IsEmpty) return null;
        return _edge switch
        {
            IslandEdge.Left or IslandEdge.Right => Top + MarginY - _wa.Top,
            _ => Left + MarginX - _wa.Left,
        };
    }

    private void Pill_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
    {
        if (!IsEdgeBand(e.GetPosition(Pill)))
        {
            if (e.ClickCount >= 2) { _onRestore(); return; }
            try { DragMove(); } catch (InvalidOperationException) { }
            Place();
            _onGeometry(CurrentOffset() ?? 0, _scale);
            return;
        }

        // 拖边缘 → 等比缩放,以按下时的胶囊中心为锚
        _resizing = true;
        Pill.CaptureMouse();
        _resizeCenter = PointToScreen(new Point(ActualWidth / 2, ActualHeight / 2));
        var p = PointToScreen(e.GetPosition(this));
        _resizeStartDist = Math.Max(10, (p - _resizeCenter).Length);
        _resizeStartScale = _scale;
    }

    private void Pill_MouseMove(object sender, MouseEventArgs e)
    {
        if (_resizing)
        {
            var p = PointToScreen(e.GetPosition(this));
            var dist = (p - _resizeCenter).Length;
            if (dist > 10)
            {
                var s = Math.Clamp(_resizeStartScale * dist / _resizeStartDist, ScaleMin, ScaleMax);
                if (!s.Equals(_scale))
                {
                    _scale = s;
                    BodyScale.ScaleX = BodyScale.ScaleY = s; // SizeChanged → 重新定位(中心锚)
                    RepositionKeepingCenter();
                }
            }
            return;
        }
        Pill.Cursor = EdgeCursor(e.GetPosition(Pill));
    }

    private void Pill_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
    {
        if (!_resizing) return;
        _resizing = false;
        Pill.ReleaseMouseCapture();
        // 中心锚换算回沿边偏移,交给 Place 夹回工作区,然后持久化
        _offset = OffsetFromCenter();
        Place();
        _onGeometry(CurrentOffset() ?? 0, _scale);
    }

    private void Pill_LostMouseCapture(object sender, MouseEventArgs e)
    {
        if (!_resizing) return;
        _resizing = false; // 捕获被抢走(切窗等):优雅收场
        Place();
    }

    // 缩放过程中:让胶囊中心保持在按下时的位置
    private void RepositionKeepingCenter()
    {
        Left = _resizeCenter.X - ActualWidth / 2;
        Top = _resizeCenter.Y - ActualHeight / 2;
    }

    private double OffsetFromCenter()
    {
        if (_wa.IsEmpty) return 0;
        return _edge switch
        {
            IslandEdge.Left or IslandEdge.Right
                => _resizeCenter.Y - (ActualHeight - 2 * MarginY) / 2 - _wa.Top,
            _ => _resizeCenter.X - (ActualWidth - 2 * MarginX) / 2 - _wa.Left,
        };
    }

    // 边缘感应带判定(坐标相对 Pill 布局槽)
    private bool IsEdgeBand(Point p)
        => p.X < ResizeBand || p.X > Pill.ActualWidth - ResizeBand
        || p.Y < ResizeBand || p.Y > Pill.ActualHeight - ResizeBand;

    private Cursor EdgeCursor(Point p)
    {
        double w = Pill.ActualWidth, h = Pill.ActualHeight;
        bool l = p.X < ResizeBand, r = p.X > w - ResizeBand;
        bool t = p.Y < ResizeBand, b = p.Y > h - ResizeBand;
        if (!l && !r && !t && !b) return Cursors.Arrow;
        if ((l && t) || (r && b)) return Cursors.SizeNWSE;
        if ((l && b) || (r && t)) return Cursors.SizeNESW;
        return l || r ? Cursors.SizeWE : Cursors.SizeNS;
    }

    // 鼠标靠近检测:轮询光标位置,胶囊外扩 ProximityPx 像素范围内即放大
    private void UpdateEnlarge()
    {
        if (_wa.IsEmpty) return;
        var cursor = WinForms.Cursor.Position; // 物理像素
        var body = new Rect(Left + MarginX, Top + MarginY,
                            Math.Max(0, ActualWidth - 2 * MarginX), Math.Max(0, ActualHeight - 2 * MarginY));
        var near = new Rect(body.Left * _dpi - ProximityPx, body.Top * _dpi - ProximityPx,
                            body.Width * _dpi + 2 * ProximityPx, body.Height * _dpi + 2 * ProximityPx);
        SetEnlarged(near.Contains(cursor.X, cursor.Y));
    }

    private void SetEnlarged(bool on)
    {
        if (on == _enlarged) return;
        _enlarged = on;
        var anim = new DoubleAnimation(on ? EnlargeScale : 1, TimeSpan.FromMilliseconds(140))
        {
            EasingFunction = on
                ? new BackEase { Amplitude = 0.2, EasingMode = EasingMode.EaseOut }
                : new QuadraticEase { EasingMode = EasingMode.EaseOut }
        };
        PillScale.BeginAnimation(System.Windows.Media.ScaleTransform.ScaleXProperty, anim);
        PillScale.BeginAnimation(System.Windows.Media.ScaleTransform.ScaleYProperty, anim);
    }
}
