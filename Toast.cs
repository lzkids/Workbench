using System.Windows;
using System.Windows.Controls;
using System.Windows.Interop;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Threading;
using WinForms = System.Windows.Forms;

namespace Workbench;

// 轻提示(toast):非阻断瞬时反馈,锚定主窗所在屏的工作区底部居中,淡入 → 停留 → 淡出自动关闭。
// 鼠标穿透(WS_EX_TRANSPARENT)+不抢焦点(WS_EX_NOACTIVATE)+不进 Alt-Tab(WS_EX_TOOLWINDOW):
// toast 只报信,绝不挡住/吃掉用户对下层窗口的任何操作。
// 分工:成功类一句话走这里;错误/需要用户决策仍走 Dialog.Info/Confirm(阻断式)。
// 样式跟主题:DynamicResource 主题笔刷,深浅切换实时生效;多条时自下而上堆叠,上面的关了下面的落回去
public static class Toast
{
    // 停留时长与动画(毫秒);堆叠间距与外边距(DIP,外边距给投影留裁切余量)
    private const int HoldMs = 1800;
    private const int InMs = 150, OutMs = 220;
    private const double Gap = 8, PadX = 20, PadY = 10;
    private const double MaxWidth = 420;

    // 活动中的 toast(自下而上);任一关闭后重排剩余,消除空洞
    private static readonly List<ToastWindow> Active = new();

    public static void Show(string message, string? glyph = null)
    {
        if (Application.Current is null) return; // 无 App 上下文(测试边缘):静默放弃,提示不该成为故障源
        var t = new ToastWindow(message, glyph);
        Active.Add(t);
        t.Closed += (_, _) =>
        {
            Active.Remove(t);
            foreach (var r in Active) r.Reflow();
        };
        t.Show();
    }

    private sealed class ToastWindow : Window
    {
        private const int GWL_EXSTYLE = -20;
        private const int WS_EX_TRANSPARENT = 0x00000020, WS_EX_NOACTIVATE = 0x08000000, WS_EX_TOOLWINDOW = 0x00000080;

        private readonly string _message;
        private readonly string? _glyph;
        private DispatcherTimer? _hold;

        public ToastWindow(string message, string? glyph)
        {
            _message = message;
            _glyph = glyph;
            WindowStyle = WindowStyle.None;
            AllowsTransparency = true;
            Background = System.Windows.Media.Brushes.Transparent; // Drawing/WPF Brushes 二义,全限定
            Topmost = true;
            ShowInTaskbar = false;
            ShowActivated = false;
            Focusable = false;
            SizeToContent = SizeToContent.WidthAndHeight;
            WindowStartupLocation = WindowStartupLocation.Manual;
            MaxWidth = MaxWidth + 2 * PadX; // 含外边距的窗口上限,正文被 MaxWidth 限制换行
            Opacity = 0;                    // 定位前隐形,ContentRendered 后才淡入,避免闪现在 (0,0)
            Content = BuildBody();

            SourceInitialized += (_, _) =>
            {
                var hwnd = new WindowInteropHelper(this).Handle;
                var ex = GetWindowLong(hwnd, GWL_EXSTYLE);
                SetWindowLong(hwnd, GWL_EXSTYLE, ex | WS_EX_TRANSPARENT | WS_EX_NOACTIVATE | WS_EX_TOOLWINDOW);
            };
            Closing += (_, _) => _hold?.Stop();
            ContentRendered += (_, _) =>
            {
                Place();
                BeginAnimation(OpacityProperty, new DoubleAnimation(1, TimeSpan.FromMilliseconds(InMs)));
                StartHold();
            };
        }

        private FrameworkElement BuildBody()
        {
            var row = new StackPanel { Orientation = Orientation.Horizontal };
            if (!string.IsNullOrEmpty(_glyph))
            {
                var g = new TextBlock { Text = _glyph, FontSize = 15, VerticalAlignment = VerticalAlignment.Center };
                row.Children.Add(g);
            }
            var text = new TextBlock
            {
                Text = _message,
                FontSize = 13,
                TextWrapping = TextWrapping.Wrap,
                VerticalAlignment = VerticalAlignment.Center,
            };
            if (_glyph is not null) text.Margin = new Thickness(8, 0, 0, 0);
            row.Children.Add(text);

            var border = new Border
            {
                CornerRadius = new CornerRadius(14),
                BorderThickness = new Thickness(1),
                Padding = new Thickness(18, 10, 18, 10),
                Child = row,
                MaxWidth = MaxWidth,
                Effect = new System.Windows.Media.Effects.DropShadowEffect
                {
                    BlurRadius = 18, ShadowDepth = 1.5, Direction = 270, Opacity = 0.28,
                },
            };
            border.SetResourceReference(Border.BackgroundProperty, "SolidBackgroundFillColorSecondaryBrush");
            border.SetResourceReference(Border.BorderBrushProperty, "DividerStrokeColorDefaultBrush");
            text.SetResourceReference(TextBlock.ForegroundProperty, "TextFillColorPrimaryBrush");
            return border;
        }

        private void StartHold()
        {
            _hold = new DispatcherTimer { Interval = TimeSpan.FromMilliseconds(HoldMs) };
            _hold.Tick += (_, _) =>
            {
                _hold.Stop();
                var anim = new DoubleAnimation(0, TimeSpan.FromMilliseconds(OutMs));
                anim.Completed += (_, _) => Close();
                BeginAnimation(OpacityProperty, anim);
            };
            _hold.Start();
        }

        // 重排:自己按堆叠序落位(底部对齐工作区,索引大的在上);任一 toast 关闭时全体调用
        public void Reflow() => Place();

        private void Place()
        {
            var wa = WorkAreaDip();
            if (wa.IsEmpty) return;
            var i = Active.IndexOf(this);
            double below = 0;
            for (var j = 0; j < i; j++) below += Math.Max(0, Active[j].ActualHeight - 2 * PadY) + Gap;
            Left = wa.Left + (wa.Width - ActualWidth) / 2;
            Top = wa.Bottom - PadY - 8 - below - ActualHeight;
        }

        // 主窗所在屏的工作区换算成 DIP(物理像素 → /dpi);主窗拿不到句柄时退回主屏
        private Rect WorkAreaDip()
        {
            var hwnd = new WindowInteropHelper(this).EnsureHandle();
            double dpi = 1;
            try { using var g = System.Drawing.Graphics.FromHwnd(hwnd); dpi = g.DpiX / 96.0; }
            catch { /* 保持 1.0 */ }
            if (dpi <= 0) dpi = 1;
            WinForms.Screen screen;
            try
            {
                var main = Application.Current.MainWindow;
                var mainHwnd = main is null ? IntPtr.Zero : new WindowInteropHelper(main).EnsureHandle();
                screen = mainHwnd != IntPtr.Zero
                    ? WinForms.Screen.FromHandle(mainHwnd)
                    : WinForms.Screen.PrimaryScreen!;
            }
            catch { screen = WinForms.Screen.PrimaryScreen!; }
            var area = screen.WorkingArea;
            return new Rect(area.Left / dpi, area.Top / dpi, area.Width / dpi, area.Height / dpi);
        }

        [System.Runtime.InteropServices.DllImport("user32.dll")]
        private static extern int GetWindowLong(IntPtr hWnd, int nIndex);

        [System.Runtime.InteropServices.DllImport("user32.dll")]
        private static extern int SetWindowLong(IntPtr hWnd, int nIndex, int dwNewLong);
    }
}
