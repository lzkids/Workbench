using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using Workbench.Models;

namespace Workbench.Views;

public partial class DashboardPage : UserControl
{
    public DashboardPage()
    {
        InitializeComponent();
    }

    // 主页直接勾选完成待办:从汇总里移除(勾选状态已在数据层,自动保存接管)
    private void QuickDone_Changed(object sender, RoutedEventArgs e)
    {
        if (sender is FrameworkElement { DataContext: TodoItem todo } &&
            (DataContext as ViewModels.DashboardViewModel) is { } vm)
        {
            vm.PendingTodos.Remove(todo);
            App.Persist();
        }
    }

    // 点任务条目:跳到任务页并高亮
    private void TaskCard_Click(object sender, System.Windows.Input.MouseButtonEventArgs e)
    {
        if (sender is FrameworkElement { DataContext: TaskItem task } &&
            DataContext is ViewModels.DashboardViewModel vm)
            vm.JumpToTask(task);
    }

    // 底部快速便签:回车或按钮提交,生成便签并清空输入框
    private void QuickNote_KeyDown(object sender, KeyEventArgs e)
    {
        if (e.Key == Key.Enter) SubmitQuickNote(QuickNoteInput);
    }

    private void QuickNote_Button_Click(object sender, RoutedEventArgs e)
        => SubmitQuickNote(QuickNoteInput);

    private void SubmitQuickNote(System.Windows.Controls.TextBox box)
    {
        var text = box.Text.Trim();
        if (text.Length == 0) return;
        App.Data.Notes.Insert(0, new NoteItem { Content = text });
        App.Persist();
        box.Text = "";
    }
}
