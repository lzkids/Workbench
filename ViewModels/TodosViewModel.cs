using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Windows.Data;
using Workbench.Models;

namespace Workbench.ViewModels;

public class TodosViewModel : ObservableObject
{
    public ObservableCollection<TodoItem> Items => App.Data.Todos;

    public List<string> PriorityOptions { get; } = new() { "高", "普通", "低" };

    private string _newTitle = "";
    public string NewTitle { get => _newTitle; set => SetProperty(ref _newTitle, value); }

    private string _newPriority = "普通";
    public string NewPriority { get => _newPriority; set => SetProperty(ref _newPriority, value); }

    // 新待办默认当天(添加后保持今天,想改别的日期用日期选择器;不想带日期就手动清除)
    private DateTime? _newDueDate = DateTime.Today;
    public DateTime? NewDueDate { get => _newDueDate; set => SetProperty(ref _newDueDate, value); }

    public RelayCommand AddCommand { get; }
    public RelayCommand DeleteCommand { get; }
    public RelayCommand ArchiveCommand { get; }

    private ICollectionView? _view;

    public TodosViewModel()
    {
        AddCommand = new RelayCommand(_ =>
        {
            var title = NewTitle.Trim();
            if (title.Length == 0) return;
            App.Data.Todos.Insert(0, new TodoItem
            {
                Title = title,
                Priority = NewPriority,
                DueDate = NewDueDate,
            });
            NewTitle = "";
            NewDueDate = DateTime.Today; // 保持默认当天
            App.Persist();
            RefreshSort();
        });

        DeleteCommand = new RelayCommand(p =>
        {
            // 删除进回收站,可恢复
            if (p is TodoItem item) App.MoveToRecycle("Todo", item);
        });

        ArchiveCommand = new RelayCommand(p =>
        {
            if (p is TodoItem item) App.MoveToArchive(item);
            RefreshSort(); // 归档后立即从列表消失(Refresh 同时重算过滤)
        });

        // 待办页只显示未归档的
        _view = CollectionViewSource.GetDefaultView(Items);
        _view.Filter = o => o is TodoItem t && !t.Archived;

        // 排序规则:未完成在前 → 优先级 高>普通>低 → 到期近的在前
        // CustomSort 在 ListCollectionView 上(ICollectionView 接口没有)
        if (CollectionViewSource.GetDefaultView(Items) is ListCollectionView view)
        {
            view.CustomSort = Comparer<TodoItem>.Create((a, b) =>
            {
                int done = a.IsDone.CompareTo(b.IsDone); // false 在 true 前
                if (done != 0) return done;
                static int Rank(string p) => p switch { "高" => 0, "普通" => 1, _ => 2 };
                int pr = Rank(a.Priority).CompareTo(Rank(b.Priority));
                if (pr != 0) return pr;
                var da = a.DueDate ?? DateTime.MaxValue;
                var db = b.DueDate ?? DateTime.MaxValue;
                return da.CompareTo(db);
            });
        }
    }

    // 勾选完成这类"属性变化"不会自动触发 CustomSort 重排,需要手动刷新
    public void RefreshSort() => (CollectionViewSource.GetDefaultView(Items) as ListCollectionView)?.Refresh();
}
