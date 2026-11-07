using System.Windows;
using System.Windows.Input;
using Wpf.Ui.Controls;
using Workbench.Models;

namespace Workbench;

// 任务编辑窗:DataContext 用一个小包装(任务本体 + 状态选项列表)
public partial class TaskEditWindow : FluentWindow
{
    private sealed record EditContext(TaskItem Task, List<string> Statuses,
        System.Collections.ObjectModel.ObservableCollection<string> TagOptions);

    private readonly TaskItem _task;

    public TaskEditWindow(TaskItem task)
    {
        _task = task;
        InitializeComponent();
        DataContext = new EditContext(task,
            new List<string> { "待开始", "进行中", "已完成" },
            Models.TagOptions.All);
    }

    private void Save_Click(object sender, RoutedEventArgs e)
    {
        _task.UpdatedAt = DateTime.Now;
        DialogResult = true; // 关闭窗口,ShowDialog 返回 true
    }

    private void AddSubTask_Click(object sender, RoutedEventArgs e) => AddSubTask();

    private void RemoveSubTask_Click(object sender, RoutedEventArgs e)
    {
        if (sender is FrameworkElement { DataContext: SubTask st })
            _task.SubTasks.Remove(st);
    }

    private void SubTaskInput_KeyDown(object sender, KeyEventArgs e)
    {
        if (e.Key == Key.Enter) AddSubTask();
    }

    private void AddSubTask()
    {
        var title = SubTaskInput.Text.Trim();
        if (title.Length == 0) return;
        _task.SubTasks.Add(new SubTask { Title = title, Tag = _task.PendingSubTag?.Trim() ?? "" });
        _task.PendingSubTag = "";
        SubTaskInput.Text = "";
    }
}
