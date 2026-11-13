using System.Windows;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Input;
using Workbench.Models;

namespace Workbench.Views;

public partial class NotesPage : UserControl
{
    public NotesPage()
    {
        InitializeComponent();
    }

    // ⤢ 按钮 → 打开置顶小窗编辑同一条便签。
    // 同一便签只允许一张小窗:已打开时聚焦置前,不再重复开
    private void OpenSticky_Click(object sender, RoutedEventArgs e)
    {
        if (sender is FrameworkElement { DataContext: NoteItem note })
        {
            var existing = System.Windows.Application.Current.Windows
                .OfType<StickyWindow>()
                .FirstOrDefault(w => ReferenceEquals(w.DataContext, note));
            if (existing != null)
            {
                existing.Activate();
                return;
            }
            new StickyWindow(note).Show();
        }
    }

    // 🎨 按钮 → 弹出配色菜单;选中即改 ColorKey(自动保存 + 显式落盘双保险)
    private void PickColor_Click(object sender, RoutedEventArgs e)
    {
        if (sender is FrameworkElement { DataContext: NoteItem note } anchor)
            NoteColorMenu.Show(anchor, note);
    }

    // 卡片双态:点击渲染视图 → 切原文编辑框(Typora 式"点入即编辑");原文失焦 → 回渲染视图
    private void CardGrid_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
    {
        if (sender is Grid g && g.Children.Count == 2)
        {
            var tb = (System.Windows.Controls.TextBox)g.Children[0];
            var rv = (FrameworkElement)g.Children[1];
            if (tb.Visibility == Visibility.Collapsed)
            {
                rv.Visibility = Visibility.Collapsed;
                tb.Visibility = Visibility.Visible;
                // 等本次点击布局消化完再聚焦,防焦点被渲染视图吞回
                tb.Dispatcher.BeginInvoke(System.Windows.Threading.DispatcherPriority.Input,
                    () => { if (tb.Visibility == Visibility.Visible) { tb.Focus(); tb.CaretIndex = tb.Text.Length; } });
                e.Handled = true;
            }
        }
    }

    // 卡片编辑完(焦点离开)就落盘 + 回渲染视图,防止编辑后直接关程序丢数据
    private void NoteEdit_LostFocus(object sender, RoutedEventArgs e)
    {
        if (sender is System.Windows.Controls.TextBox tb && tb.Parent is Grid g && g.Children.Count == 2)
        {
            var rv = (FrameworkElement)g.Children[1];
            if (rv.Visibility == Visibility.Collapsed)
            {
                tb.Visibility = Visibility.Collapsed;
                rv.Visibility = Visibility.Visible;
            }
        }
        App.Persist();
    }

    // 右下角拖拽调整卡片大小(尺寸持久化,重启保持)
    private void CardResize_DragDelta(object sender, DragDeltaEventArgs e)
    {
        if (sender is FrameworkElement { DataContext: NoteItem note })
        {
            note.CardWidth += e.HorizontalChange;
            note.CardHeight += e.VerticalChange;
        }
    }
}
