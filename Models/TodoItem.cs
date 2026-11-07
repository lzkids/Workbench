using System.Text.Json.Serialization;

namespace Workbench.Models;

public class TodoItem : ObservableObject
{
    private string _title = "";
    private bool _isDone;
    private DateTime? _dueDate;

    public string Id { get; set; } = Guid.NewGuid().ToString("N");
    public string Title { get => _title; set => SetProperty(ref _title, value); }
    public bool IsDone
    {
        get => _isDone;
        set
        {
            if (SetProperty(ref _isDone, value))
            {
                CompletedAt = value ? DateTime.Now : null;
                // 完成的待办当天留在列表显示划线,次日启动时自动归档(见 SqliteStore.Load)
                OnPropertyChanged(nameof(IsOverdue));
            }
        }
    }
    // 优先级在新建时确定:高 / 普通 / 低
    public string Priority { get; set; } = "普通";
    public DateTime? DueDate
    {
        get => _dueDate;
        set { if (SetProperty(ref _dueDate, value)) OnPropertyChanged(nameof(IsOverdue)); }
    }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    // 完成时间(勾选完成时记录,取消完成时清除;热力图统计用)
    public DateTime? CompletedAt { get; set; }
    // 归档
    public bool Archived { get; set; }
    public DateTime? ArchivedAt { get; set; }

    // 逾期判定:有到期日、还没完成、已过当天。只给界面标红用,不写入 JSON
    [JsonIgnore]
    public bool IsOverdue => DueDate.HasValue && !IsDone && DueDate.Value.Date < DateTime.Now.Date;
}
