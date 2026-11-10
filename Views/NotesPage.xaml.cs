using System.Windows;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
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

    // 卡片编辑完(焦点离开)就落盘,防止编辑后直接关程序丢数据
    private void NoteEdit_LostFocus(object sender, RoutedEventArgs e) => App.Persist();

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
