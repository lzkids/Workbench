using System.Collections.ObjectModel;

namespace Workbench.Models;

// 整个应用的数据根,序列化为一个 JSON 文件。
// 用 ObservableCollection 让"增删条目"自动刷新 UI;条目自身的属性变化靠 ObservableObject。
public class WorkbenchData
{
    public ObservableCollection<NoteItem> Notes { get; set; } = new();
    public ObservableCollection<TaskItem> Tasks { get; set; } = new();
    public ObservableCollection<TodoItem> Todos { get; set; } = new();
    public ObservableCollection<RecycleItem> RecycleBin { get; set; } = new();
    // 主题偏好:Light / Dark
    public string Theme { get; set; } = "Light";
}
