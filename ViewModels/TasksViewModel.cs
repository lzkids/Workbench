using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Windows.Data;
using Workbench.Models;

namespace Workbench.ViewModels;

public class TasksViewModel : ObservableObject
{
    public ObservableCollection<TaskItem> Items => App.Data.Tasks;

    public List<string> StatusOptions { get; } = new() { "待开始", "进行中", "已完成" };
    public List<string> FilterOptions { get; } = new() { "全部", "待开始", "进行中", "已完成" };

    private string _newTitle = "";
    public string NewTitle { get => _newTitle; set => SetProperty(ref _newTitle, value); }

    private string _newStatus = "待开始";
    public string NewStatus { get => _newStatus; set => SetProperty(ref _newStatus, value); }

    private string _newTag = "";
    public string NewTag { get => _newTag; set => SetProperty(ref _newTag, value); }

    public System.Collections.ObjectModel.ObservableCollection<string> TagOptions { get; } = Models.TagOptions.All;

    private string _filterStatus = "全部";
    public string FilterStatus
    {
        get => _filterStatus;
        set { if (SetProperty(ref _filterStatus, value)) RefreshFilter(); }
    }

    public RelayCommand AddCommand { get; }
    public RelayCommand DeleteCommand { get; }
    public RelayCommand CycleStatusCommand { get; }
    public RelayCommand ArchiveCommand { get; }

    private ICollectionView? _view;

    public TasksViewModel()
    {
        AddCommand = new RelayCommand(_ =>
        {
            var title = NewTitle.Trim();
            if (title.Length == 0) return;
            App.Data.Tasks.Insert(0, new TaskItem { Title = title, Status = NewStatus, Tag = NewTag.Trim() });
            NewTitle = "";
            NewTag = "";
            App.Persist();
            RefreshFilter();
        });

        DeleteCommand = new RelayCommand(p =>
        {
            // 删除进回收站,可恢复
            if (p is TaskItem item) App.MoveToRecycle("Task", item);
        });

        // 点击"→"循环切换:待开始 → 进行中 → 已完成 → 待开始
        // 切到"已完成"时校验子任务:还有未完成的,弹确认(防漏)
        CycleStatusCommand = new RelayCommand(p =>
        {
            if (p is not TaskItem item) return;
            var next = item.Status switch
            {
                "待开始" => "进行中",
                "进行中" => "已完成",
                _ => "待开始",
            };
            if (next == "已完成" && item.HasSubTasks)
            {
                var unfinished = item.SubTasks.Count(s => !s.IsDone);
                if (unfinished > 0 &&
                    !Dialog.Confirm("子任务未完成",
                        $"该任务还有 {unfinished} 个子任务未完成,确定标记为「已完成」吗?"))
                    return;
            }
            item.Status = next;
            item.UpdatedAt = DateTime.Now;
            App.Persist();
            RefreshFilter();
        });

        ArchiveCommand = new RelayCommand(p =>
        {
            if (p is TaskItem item) App.MoveToArchive(item);
            RefreshFilter(); // 归档后立即从列表消失
        });

        // 过滤:状态筛选 + 排除已归档
        _view = CollectionViewSource.GetDefaultView(Items);
        _view.Filter = o
            => o is TaskItem t && !t.Archived && (FilterStatus == "全部" || t.Status == FilterStatus);
    }

    public void RefreshFilter() => CollectionViewSource.GetDefaultView(Items).Refresh();
}
