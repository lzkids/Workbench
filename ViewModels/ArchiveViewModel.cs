using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Windows.Data;
using Workbench.Models;

namespace Workbench.ViewModels;

// 归档页:按"类型 → 月份"两级分组,组用 Expander 折叠
public class ArchiveViewModel : ObservableObject
{
    public ObservableCollection<ArchiveGroup> Groups { get; } = new();

    // 云同步快捷按钮:逻辑在 CloudSyncBar(与便签/回收站页共用)
    public CloudSyncBar Cloud { get; } = new();

    public RelayCommand RestoreCommand { get; }
    public RelayCommand RecycleCommand { get; }

    public ArchiveViewModel()
    {
        // 恢复:取消归档标记,回到原页面
        RestoreCommand = new RelayCommand(p =>
        {
            if (p is ArchiveEntry e) App.RestoreFromArchive(e.Item);
            Rebuild();
        });

        // 归档里直接删除 → 进回收站(和页面上删除一致)
        RecycleCommand = new RelayCommand(p =>
        {
            if (p is ArchiveEntry e)
            {
                App.MoveToRecycle(e.Kind, e.Item);
                Rebuild();
            }
        });
    }

    // 每次导航到本页时重建分组(数据可能已变)
    public void Rebuild()
    {
        Groups.Clear();

        void AddKind<T>(string kind, string kindName, string glyph, IEnumerable<T> items, Func<T, DateTime?> archivedAt,
            Func<T, string> titleOf) where T : ObservableObject
        {
            var byMonth = items
                .GroupBy(i => archivedAt(i)?.ToString("yyyy-MM") ?? "未知")
                .OrderByDescending(g => g.Key);

            foreach (var g in byMonth)
            {
                var list = g.OrderByDescending(i => archivedAt(i) ?? DateTime.MinValue).ToList();
                var group = new ArchiveGroup
                {
                    Title = $"{glyph} {kindName} · {g.Key}({list.Count} 条)",
                    IsExpanded = Groups.Count == 0, // 只有第一组默认展开
                };
                foreach (var i in list)
                    group.Items.Add(new ArchiveEntry(kind, titleOf(i), i));
                Groups.Add(group);
            }
        }

        AddKind("Note", "便签", "📝", App.Data.Notes.Where(n => n.Archived), n => n.ArchivedAt, n =>
            string.IsNullOrWhiteSpace(n.Content) ? "(空便签)" :
            n.Content.Length > 40 ? n.Content[..40] : n.Content);
        AddKind("Task", "任务", "🗂️", App.Data.Tasks.Where(t => t.Archived), t => t.ArchivedAt, t => t.Title);
        AddKind("Todo", "待办", "✅", App.Data.Todos.Where(t => t.Archived), t => t.ArchivedAt, t => t.Title);
        AddKind("MdDoc", "Markdown", "📄", App.Data.MdDocs.Where(m => m.Archived), m => m.ArchivedAt, m => m.Title);

        if (Groups.Count == 0)
            IsEmpty = true;
        else
            IsEmpty = false;
        OnPropertyChanged(nameof(IsEmpty));
    }

    private bool _isEmpty = true;
    public bool IsEmpty { get => _isEmpty; private set => SetProperty(ref _isEmpty, value); }
}

// 一个折叠分组
public class ArchiveGroup : ObservableObject
{
    public string Title { get; init; } = "";
    public ObservableCollection<ArchiveEntry> Items { get; } = new();

    private bool _isExpanded;
    public bool IsExpanded { get => _isExpanded; set => SetProperty(ref _isExpanded, value); }
}

// 组内一条:持有原对象引用(恢复/删除直接作用于它)
public class ArchiveEntry
{
    public ArchiveEntry(string kind, string title, ObservableObject item)
    {
        Kind = kind;
        Title = title;
        Item = item;
    }

    public string Kind { get; }
    public string Title { get; }
    public ObservableObject Item { get; }
}
