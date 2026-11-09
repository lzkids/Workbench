using System.Collections.ObjectModel;

namespace Workbench.Models;

public class TaskItem : ObservableObject
{
    private string _title = "";
    private string _content = "";
    private string _status = "待开始";
    private string _tag = "";
    private DateTime _updatedAt = DateTime.Now;
    private ObservableCollection<SubTask> _subTasks = new();

    public string Id { get; set; } = Guid.NewGuid().ToString("N");
    public string Title { get => _title; set => SetProperty(ref _title, value); }
    // 详情正文(编辑窗里改)
    public string Content { get => _content; set => SetProperty(ref _content, value); }
    // 约定取值:待开始 / 进行中 / 已完成
    public string Status { get => _status; set => SetProperty(ref _status, value); }
    // 标签:自由文本,常用值在 TagOptions 里
    public string Tag { get => _tag; set => SetProperty(ref _tag, value); }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get => _updatedAt; set => SetProperty(ref _updatedAt, value); }
    // 归档
    public bool Archived { get; set; }
    public DateTime? ArchivedAt { get; set; }

    // 子任务:集合变化/子项勾选都会联动刷新进度显示
    public ObservableCollection<SubTask> SubTasks
    {
        get => _subTasks;
        set
        {
            if (_subTasks != null) _subTasks.CollectionChanged -= SubTasksChanged;
            _subTasks = value;
            HookSubTasks();
            OnPropertyChanged();
            NotifyProgress();
        }
    }

    public TaskItem()
    {
        HookSubTasks();
    }

    private void HookSubTasks()
    {
        if (_subTasks == null) return;
        _subTasks.CollectionChanged += SubTasksChanged;
        foreach (var s in _subTasks)
            s.PropertyChanged += (_, _) => NotifyProgress();
    }

    private void SubTasksChanged(object? sender, System.Collections.Specialized.NotifyCollectionChangedEventArgs e)
    {
        if (e.NewItems != null)
            foreach (var s in e.NewItems)
                if (s is SubTask st)
                    st.PropertyChanged += (_, _) => NotifyProgress();
        NotifyProgress();
    }

    private void NotifyProgress()
    {
        OnPropertyChanged(nameof(HasSubTasks));
        OnPropertyChanged(nameof(SubTasksProgress));
        OnPropertyChanged(nameof(SubTasksToggleText));
        OnPropertyChanged(nameof(SubTasksToolTip));
        OnPropertyChanged(nameof(ShowSubTasksInline));
    }

    public bool HasSubTasks => _subTasks.Count > 0;

    // "2/5" 形式的完成进度
    public string SubTasksProgress => $"{_subTasks.Count(s => s.IsDone)}/{_subTasks.Count}";

    // 行内子任务面板的展开状态(UI 状态,不持久化)
    private bool _subTasksExpanded;
    public bool SubTasksExpanded
    {
        get => _subTasksExpanded;
        set
        {
            if (SetProperty(ref _subTasksExpanded, value))
            {
                OnPropertyChanged(nameof(SubTasksToggleText));
                OnPropertyChanged(nameof(SubTasksToolTip));
                OnPropertyChanged(nameof(ShowSubTasksInline));
            }
        }
    }

    // 行内"添加子任务"时暂选的标签(输入框旁下拉;UI 暂存,不持久化)
    private string _pendingSubTag = "";
    public string PendingSubTag
    {
        get => _pendingSubTag;
        set => SetProperty(ref _pendingSubTag, value);
    }

    public string SubTasksToggleText
        => HasSubTasks ? (SubTasksExpanded ? "▾" : "▸") : "☰";

    // 按钮悬停提示(带进度)
    public string SubTasksToolTip
        => HasSubTasks ? $"子任务 {SubTasksProgress}" : "子任务(展开后可添加)";

    public bool ShowSubTasksInline => SubTasksExpanded;
}
