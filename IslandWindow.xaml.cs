using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media.Animation;
using System.Windows.Threading;
using WinForms = System.Windows.Forms;
// UseWindowsForms 的隐式 using 会带进 System.Drawing,Point 须显式指向 WPF
using Point = System.Windows.Point;

namespace Workbench;

// 灵动岛胶囊窗:置顶悬浮;鼠标靠近(不用碰到)自动放大;三个入口弹出快速记录窗;
// 左键拖动完全自由移动,松手时靠近左/右/上/下边缘则吸附成贴边态,否则保持自由位置;双击或右键还原主窗口
public partial class IslandWindow : Window
{
    // 鼠标距胶囊多近算"靠近"(物理像素);靠近放大比例
    private const double ProximityPx = 36;
    private const double EnlargeScale = 1.18;

    // 拖边缘调大小:边缘感应带(DIP)与缩放范围;拖动松手后的贴边吸附距离
    private const double ResizeBand = 7;
    private const double ScaleMin = 0.6;
    private const double ScaleMax = 2.4;
    private const double SnapDistance = 12;

    // 窗口内透明边距(XAML Grid Margin),胶囊本体相对窗口的偏移,Place/偏移换算全依赖它
    private const double MarginX = 28;
    private const double MarginY = 16;

    private readonly Action<string> _onItem;
    private readonly Action _onRestore;
    private readonly Action _onPersist; // 松手/缩放结束后由控制器读取 CaptureState() 持久化
    private readonly DispatcherTimer _proximityTimer;
    private bool _enlarged;

    // edge = null 表示自由悬浮(不贴边);贴边态用 offset 定位,自由态用 freeX/freeY 定位
    private IslandEdge? _edge;
    private Rect _wa;
    private double _dpi = 1;
    private double? _offset;
    private double _scale = 1;
    private double? _freeX;
    private double? _freeY;
    public bool IsVertical { get; private set; }

    // 拖边缘缩放进行中的状态
    private bool _resizing;
    private Point _resizeCenter; // 按下时胶囊中心(屏幕 DIP 坐标),缩放以它为锚
    private double _resizeStartDist;
    private double _resizeStartScale;

    public IslandWindow(IReadOnlyList<(string Key, string Glyph, string Label)> entries,
                        bool vertical, Action<string> onItem, Action onRestore, Action onPersist)
    {
        InitializeComponent();
        _onItem = onItem;
        _onRestore = onRestore;
        _onPersist = onPersist;
        IsVertical = vertical;

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
        Pill.ToolTip = "拖动移动 · 靠近边缘吸附 · 拖边缘调整大小 · 双击/右键还原完整软件";

        _proximityTimer = new DispatcherTimer { Interval = TimeSpan.FromMilliseconds(90) };
        _proximityTimer.Tick += (_, _) => UpdateEnlarge();

        SizeChanged += (_, _) => Place(); // LayoutTransform 缩放改变窗口尺寸 → 重新定位

        Loaded += (_, _) =>
        {
            _proximityTimer.Start();
            Opacity = 0;
            BeginAnimation(OpacityProperty, new DoubleAnimation(1, TimeSpan.FromMilliseconds(160)));
        };
        Closing += (_, _) => _proximityTimer.Stop();
        ContentRendered += (_, _) => Place(); // 尺寸确定后吸附到位
    }

    // 控制器告知工作区(DIP)、DPI、初始姿态。edge=null 表示自由悬浮(用 freeX/freeY)
    public void SetAnchor(IslandEdge? edge, Rect workArea, double dpi,
                          double? offset, double? scale, double? freeX, double? freeY)
    {
        _edge = edge;
        _wa = workArea;
        _dpi = dpi <= 0 ? 1 : dpi;
        _offset = offset;
        _freeX = freeX;
        _freeY = freeY;
        _scale = Math.Clamp(scale ?? 1, ScaleMin, ScaleMax);
        BodyScale.ScaleX = BodyScale.ScaleY = _scale;
    }

    public Rect Anchor => _wa;

    public (IslandEdge? Edge, double? Offset, double Scale, double? FreeX, double? FreeY, bool Vertical) CaptureState()
        => (_edge, _edge is null ? null : CurrentOffset(), _scale,
            _edge is null ? Left - _wa.Left : null, _edge is null ? Top - _wa.Top : null, IsVertical);

    // 吸附定位:贴边态按 offset(空 = 沿边居中),自由态用记住的位置(夹回屏幕内)
    public void Place()
    {
        if (_wa.IsEmpty || ActualWidth <= 0) return;
        if (_edge is null)
        {
            var fw = _wa.Width - ActualWidth;
            var fh = _wa.Height - ActualHeight;
            Left = _wa.Left + Math.Clamp(_freeX ?? fw / 2, Math.Min(0, fw), Math.Max(0, fw));
            Top = _wa.Top + Math.Clamp(_freeY ?? fh / 2, Math.Min(0, fh), Math.Max(0, fh));
            return;
        }
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
            case IslandEdge.Top:
            {
                var w = ActualWidth - 2 * MarginX;
                var body = Math.Clamp(_offset ?? (_wa.Width - w) / 2, 0, Math.Max(0, _wa.Width - w));
                Left = _wa.Left + body - MarginX;
                Top = _wa.Top + 6 - MarginY;
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

    // 拖动松手后的落位裁定:距左/右/上/下边缘吸附距离内 → 吸附成贴边态并换算沿边偏移;否则自由悬浮
    private void SettleAfterDrag()
    {
        var bodyLeft = Left + MarginX;
        var bodyRight = bodyLeft + (ActualWidth - 2 * MarginX);
        var bodyTop = Top + MarginY;
        var bodyBottom = Top + MarginY + (ActualHeight - 2 * MarginY);

        if (bodyLeft - _wa.Left <= SnapDistance)
            _edge = IslandEdge.Left;
        else if (_wa.Right - bodyRight <= SnapDistance)
            _edge = IslandEdge.Right;
        else if (_wa.Top - bodyTop <= SnapDistance)
            _edge = IslandEdge.Top;
        else if (_wa.Bottom - bodyBottom <= SnapDistance)
            _edge = IslandEdge.Bottom;
        else
            _edge = null;

        if (_edge is null)
        {
            _freeX = Left - _wa.Left;
            _freeY = Top - _wa.Top;
        }
        else
        {
            _offset = CurrentOffset();
        }
    }

    // 当前沿边偏移(贴边态):胶囊本体起点距工作区起点
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
            SettleAfterDrag(); // 审计修复:不再无条件回中——按落点吸附贴边或保持自由位置
            Place();
            _onPersist();
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
        if (_edge is null)
        {
            RepositionKeepingCenter(); // 自由态:中心锚换算回位置
        }
        else
        {
            // 贴边态(run-2 审计加固):中心锚缩放会让垂直于边的坐标漂离贴边(如左贴边岛放大后飘离 6px 贴距),
            // 按当前中心位置换算沿边偏移后 Place() 吸回贴边,视觉/状态/存档三者保持一致
            _offset = CurrentOffset();
            Place();
        }
        _onPersist();
    }

    private void Pill_LostMouseCapture(object sender, MouseEventArgs e)
    {
        if (!_resizing) return;
        _resizing = false; // 捕获被抢走(切窗等):优雅收场——同上,保持沿边位置并吸回贴边
        if (_edge is not null) _offset = CurrentOffset();
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
