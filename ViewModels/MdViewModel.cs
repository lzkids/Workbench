using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Windows.Data;
using Workbench.Models;

namespace Workbench.ViewModels;

// MD 文档页:独立 Markdown 文档列表(Typora 式文档,区别于便签随手小条)。
// 点击文档 → MdDocWindow 独立编辑窗(WebView2 Vditor,与置顶小窗同一渲染管线)
public class MdViewModel : ObservableObject
{
    public ObservableCollection<MdDoc> Items => App.Data.MdDocs;

    private ICollectionView? _view;

    public RelayCommand NewCommand { get; }
    public RelayCommand OpenCommand { get; }
    public RelayCommand ArchiveCommand { get; }
    public RelayCommand DeleteCommand { get; }

    public MdViewModel()
    {
        NewCommand = new RelayCommand(_ =>
        {
            var doc = new MdDoc();
            App.Data.MdDocs.Insert(0, doc);
            App.Persist();
            new MdDocWindow(doc).Show();
        });

        OpenCommand = new RelayCommand(p =>
        {
            if (p is MdDoc doc)
            {
                // 单实例:同文档已开窗则聚焦置前
                var existing = System.Windows.Application.Current.Windows
                    .OfType<MdDocWindow>()
                    .FirstOrDefault(w => ReferenceEquals(w.DataContext, doc));
                if (existing != null) { existing.Activate(); return; }
                new MdDocWindow(doc).Show();
            }
        });

        ArchiveCommand = new RelayCommand(p =>
        {
            if (p is MdDoc doc) App.MoveToArchive(doc);
            RefreshFilter(); // 归档后立即从列表消失
        });

        DeleteCommand = new RelayCommand(p =>
        {
            if (p is MdDoc doc) App.MoveToRecycle("MdDoc", doc);
        });

        // 只显示未归档的(归档的进归档页)
        _view = CollectionViewSource.GetDefaultView(Items);
        _view.Filter = o => o is MdDoc m && !m.Archived;
    }

    // 页面到达/归档动作后手动刷新过滤视图
    public void RefreshFilter() => _view?.Refresh();
}
