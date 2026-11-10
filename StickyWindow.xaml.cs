using System.Windows;
using System.Windows.Input;
using Workbench.Models;

namespace Workbench;

// 置顶便签小窗:无边框、半透明圆角、始终在最前、可拖动可缩放。
// DataContext 是一条 NoteItem,TextBox 直接编辑它的 Content(TwoWay 即时回写)
public partial class StickyWindow : Window
{
    public StickyWindow(NoteItem note)
    {
        InitializeComponent();
        DataContext = note;
    }

    private void Border_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
    {
        if (e.ButtonState == MouseButtonState.Pressed)
            DragMove();
    }

    // 🎨 换色:与便签卡片共用同一套配色菜单
    private void PickColor_Click(object sender, RoutedEventArgs e)
    {
        if (sender is FrameworkElement anchor && DataContext is NoteItem note)
            Views.NoteColorMenu.Show(anchor, note);
    }

    private void Close_Click(object sender, RoutedEventArgs e) => Close();

    private void NewNote_Click(object sender, RoutedEventArgs e)
    {
        var note = new NoteItem();
        App.Data.Notes.Insert(0, note); // 先入库再开窗
        new StickyWindow(note).Show();
    }

    private void Window_Closed(object sender, EventArgs e)
    {
        // 空便签直接回收,不留垃圾
        if (DataContext is NoteItem note && string.IsNullOrWhiteSpace(note.Content))
            App.Data.Notes.Remove(note);
        App.Persist();
    }
}
