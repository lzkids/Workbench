namespace Workbench.Models;

// 任务下的子任务:标题 + 完成状态 + 标签,存在任务的 subtasks JSON 列里
public class SubTask : ObservableObject
{
    private string _title = "";
    private bool _isDone;
    private string _tag = "";

    public string Id { get; set; } = Guid.NewGuid().ToString("N");
    public string Title { get => _title; set => SetProperty(ref _title, value); }
    public bool IsDone { get => _isDone; set => SetProperty(ref _isDone, value); }
    public string Tag { get => _tag; set => SetProperty(ref _tag, value); }
}
