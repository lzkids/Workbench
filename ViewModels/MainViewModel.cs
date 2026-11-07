using Workbench.Models;

namespace Workbench.ViewModels;

public class MainViewModel : ObservableObject
{
    public List<NavigationItem> NavItems { get; }

    private NavigationItem _selected = null!;
    public NavigationItem Selected
    {
        get => _selected;
        set
        {
            if (SetProperty(ref _selected, value) && value is not null)
            {
                Current = value.Page;
                // 页面到达钩子:需要刷新过滤视图/重建分组的页面在这里触发
                switch (value.Page)
                {
                    case DashboardViewModel p: p.Rebuild(); break;
                    case NotesViewModel p: p.RefreshFilter(); break;
                    case TasksViewModel p: p.RefreshFilter(); break;
                    case TodosViewModel p: p.RefreshSort(); break;
                    case ArchiveViewModel p: p.Rebuild(); break;
                }
            }
        }
    }

    // ContentControl 绑定它;MainWindow.xaml 里按类型写 DataTemplate 完成页面映射
    private object _current = null!;
    public object Current { get => _current; set => SetProperty(ref _current, value); }

    public MainViewModel(int initialPage = 0)
    {
        NavItems = new List<NavigationItem>
        {
            new() { Glyph = "🏠", Title = "主页",     Page = new DashboardViewModel(this) },
            new() { Glyph = "📝", Title = "便签",     Page = new NotesViewModel() },
            new() { Glyph = "🗂️", Title = "任务记录", Page = new TasksViewModel() },
            new() { Glyph = "✅",  Title = "待办",     Page = new TodosViewModel() },
            new() { Glyph = "📦",  Title = "归档",     Page = new ArchiveViewModel() },
            new() { Glyph = "🗑️", Title = "回收站",   Page = new RecycleBinViewModel() },
            new() { Glyph = "⚙️",  Title = "设置",     Page = new SettingsViewModel() },
        };
        Selected = NavItems[Math.Clamp(initialPage, 0, NavItems.Count - 1)];
    }

    // 供主页等页面的跳转按钮使用
    public void SelectIndex(int index)
        => Selected = NavItems[Math.Clamp(index, 0, NavItems.Count - 1)];

    // 主页点击任务条目:跳到任务页并高亮那条任务(3 秒后自动消除)
    public void HighlightTask(string id)
    {
        HighlightTaskId = id;
        foreach (var t in App.Data.Tasks)
            t.IsHighlighted = t.Id == id;

        var timer = new System.Windows.Threading.DispatcherTimer { Interval = TimeSpan.FromSeconds(3) };
        timer.Tick += (s, e) =>
        {
            foreach (var t in App.Data.Tasks)
                t.IsHighlighted = false;
            HighlightTaskId = null;
            ((System.Windows.Threading.DispatcherTimer)s).Stop();
        };
        timer.Start();
    }

    private string? _highlightTaskId;
    public string? HighlightTaskId
    {
        get => _highlightTaskId;
        private set => SetProperty(ref _highlightTaskId, value);
    }
}
