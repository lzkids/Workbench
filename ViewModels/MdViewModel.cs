using System.Collections.ObjectModel;
using System.Linq;
using System.Windows;
using Workbench.Models;

namespace Workbench.ViewModels;

// MD 文档页:独立 Markdown 文档列表(Typora 式文档,区别于便签随手小条)。
// 点击文档 → MdDocWindow 独立编辑窗(WebView2 Vditor,与置顶小窗同一渲染管线)
public class MdViewModel : ObservableObject
{
    public ObservableCollection<MdDoc> Items => App.Data.MdDocs;

    // 云同步快捷按钮:与便签/归档/回收站页同一套(CloudSyncBar)
    public CloudSyncBar Cloud { get; } = new();

    public RelayCommand NewCommand { get; }
    public RelayCommand OpenCommand { get; }
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

        DeleteCommand = new RelayCommand(p =>
        {
            if (p is MdDoc doc) App.MoveToRecycle("MdDoc", doc);
        });
    }
}
