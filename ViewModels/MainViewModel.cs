using Workbench.Models;

namespace Workbench.ViewModels;

public class MainViewModel : ObservableObject
{
    // 全部导航项:索引恒定;Top/Bottom 只是侧栏的显示分区
    public List<NavigationItem> NavItems { get; }
    // 侧栏上部列表(收起时变成纯图标)
    public List<NavigationItem> TopNavItems { get; }
    // 侧栏底部图标区(回收站/设置,永远只显示图标)
    public List<NavigationItem> BottomNavItems { get; }

    // 侧栏收起态:宽度动画在 MainWindow,文字/边距的显隐全部由绑定驱动
    private bool _isCollapsed;
    public bool IsCollapsed { get => _isCollapsed; set => SetProperty(ref _isCollapsed, value); }

    // 底部两个图标按钮的选中高亮(与 NavItems[5]/[6] 对应)
    public bool IsRecycleSelected => ReferenceEquals(Selected, NavItems[5]);
    public bool IsSettingsSelected => ReferenceEquals(Selected, NavItems[6]);

    private NavigationItem _selected = null!;
    public NavigationItem Selected
    {
        get => _selected;
        set
        {
            if (SetProperty(ref _selected, value) && value is not null)
            {
                Current = value.Page;
                OnPropertyChanged(nameof(IsRecycleSelected));
                OnPropertyChanged(nameof(IsSettingsSelected));
                // 页面到达钩子:需要刷新过滤视图/重建分组的页面在这里触发
                switch (value.Page)
                {
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
            new() { Glyph = "📝", Title = "便签",     Page = new NotesViewModel() },
            new() { Glyph = "🗂️", Title = "任务记录", Page = new TasksViewModel() },
            new() { Glyph = "✅",  Title = "待办",     Page = new TodosViewModel() },
            new() { Glyph = "📄",  Title = "MD 文档",  Page = new MdViewModel() },
            new() { Glyph = "📦",  Title = "归档",     Page = new ArchiveViewModel() },
            new() { Glyph = "🗑️", Title = "回收站",   Page = new RecycleBinViewModel() },
            new() { Glyph = "⚙️",  Title = "设置",     Page = new SettingsViewModel() },
        };
        TopNavItems = NavItems.Take(5).ToList();
        BottomNavItems = NavItems.Skip(5).ToList();
        Selected = NavItems[Math.Clamp(initialPage, 0, NavItems.Count - 1)];
    }
}
