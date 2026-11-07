using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using Workbench.Models;

namespace Workbench.Views;

public partial class TasksPage : UserControl
{
    public TasksPage()
    {
        InitializeComponent();
    }

    // 点击任务标题 → 打开编辑窗(标题/详情/状态)
    private void Title_Click(object sender, MouseButtonEventArgs e)
    {
        if (sender is FrameworkElement { DataContext: TaskItem task })
        {
            var win = new TaskEditWindow(task) { Owner = Window.GetWindow(this) };
            win.ShowDialog();
            App.Persist();
        }
    }

    // 子任务折叠切换:直接展开/收起(面板里就能添加,不需要弹窗)
    private void SubTasksToggle_Click(object sender, RoutedEventArgs e)
    {
        if (sender is FrameworkElement { DataContext: TaskItem task })
            task.SubTasksExpanded = !task.SubTasksExpanded;
    }

    // 行内添加子任务(＋按钮):从同面板的输入框取文本
    private void AddInlineSubTask_Click(object sender, RoutedEventArgs e)
    {
        if (sender is FrameworkElement { Tag: TaskItem task } btn && btn.Parent is DockPanel dp)
        {
            var box = dp.Children.OfType<System.Windows.Controls.TextBox>().FirstOrDefault();
            AddSub(task, box);
        }
    }

    // 行内添加子任务(回车)
    private void InlineSubInput_KeyDown(object sender, KeyEventArgs e)
    {
        if (e.Key == Key.Enter && sender is System.Windows.Controls.TextBox { DataContext: TaskItem task } box)
            AddSub(task, box);
    }

    private static void AddSub(TaskItem task, System.Windows.Controls.TextBox? box)
    {
        var title = box?.Text.Trim() ?? "";
        if (title.Length == 0) return;
        task.SubTasks.Add(new SubTask { Title = title, Tag = task.PendingSubTag?.Trim() ?? "" });
        task.PendingSubTag = "";
        if (box != null) box.Text = "";
        task.SubTasksExpanded = true;
    }

    // 行内删除子任务:Tag 里带了所属任务
    private void RemoveInlineSubTask_Click(object sender, RoutedEventArgs e)
    {
        if (sender is FrameworkElement { DataContext: SubTask sub, Tag: TaskItem task })
        {
            task.SubTasks.Remove(sub);
            App.Persist();
        }
    }
}
