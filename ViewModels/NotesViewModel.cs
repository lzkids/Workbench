using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Windows.Data;
using Workbench.Models;

namespace Workbench.ViewModels;

public class NotesViewModel : ObservableObject
{
    public ObservableCollection<NoteItem> Items => App.Data.Notes;

    private ICollectionView? _view;

    // 云同步快捷按钮:逻辑在 CloudSyncBar(与归档/回收站页共用)
    public CloudSyncBar Cloud { get; } = new();

    public RelayCommand NewCommand { get; }
    public RelayCommand DeleteCommand { get; }
    public RelayCommand ArchiveCommand { get; }

    public NotesViewModel()
    {
        NewCommand = new RelayCommand(_ =>
        {
            // 必须先加入集合再开窗:不在集合里的便签关闭时不会保存
            var note = new NoteItem();
            App.Data.Notes.Insert(0, note);
            new StickyWindow(note).Show();
        });

        DeleteCommand = new RelayCommand(p =>
        {
            // 删除进回收站,可恢复
            if (p is NoteItem note) App.MoveToRecycle("Note", note);
        });

        ArchiveCommand = new RelayCommand(p =>
        {
            if (p is NoteItem note) App.MoveToArchive(note);
            RefreshFilter(); // 归档后立即从列表消失
        });

        // 便签页只显示未归档的
        _view = CollectionViewSource.GetDefaultView(Items);
        _view.Filter = o => o is NoteItem n && !n.Archived;
    }

    public void RefreshFilter() => _view?.Refresh();
}
