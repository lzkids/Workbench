using System;
using System.Collections.ObjectModel;
using System.Collections.Specialized;
using System.Windows;
using Workbench.Models;

namespace Workbench.ViewModels;

// MD 文档卡片行(主页平铺视图):树序 DFS + 深度缩进,子文档在父卡片右侧缩进一层
public class MdDocRow
{
    public MdDocRow(MdDoc doc, int depth) { Doc = doc; Depth = depth; }

    public MdDoc Doc { get; }
    public int Depth { get; }
    public Thickness Indent => new(Depth * 16, 0, 0, 10); // 左缘缩进,保留卡片底部间距
}

// MD 文档页:独立 Markdown 文档列表(Typora 式文档,区别于便签随手小条)。
// 点击文档 → MdDocWindow 独立编辑窗(WebView2 Muya 内核,与置顶小窗同一渲染管线);
// 卡片按树序缩进平铺(树状子文档),只显示未归档的(归档的进归档页)
public class MdViewModel : ObservableObject
{
    // 空态提示用(总数;含归档)
    public ObservableCollection<MdDoc> Items => App.Data.MdDocs;

    // 树序平铺行(跳过归档);MdDocs 变化时重建
    public ObservableCollection<MdDocRow> Rows { get; } = new();

    private bool _attached;

    public RelayCommand NewCommand { get; }
    public RelayCommand OpenCommand { get; }
    public RelayCommand ArchiveCommand { get; }
    public RelayCommand DeleteCommand { get; }

    public MdViewModel()
    {
        NewCommand = new RelayCommand(_ =>
        {
            var doc = App.AddMdDoc(); // 统一创建入口:根文档
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
            RebuildRows(); // 归档后立即从列表消失
        });

        DeleteCommand = new RelayCommand(p =>
        {
            if (p is MdDoc doc) App.MoveToRecycle("MdDoc", doc); // 级联整棵子树
            RebuildRows();
        });

        RebuildRows();
        App.Data.MdDocs.CollectionChanged += MdDocs_CollectionChanged;
        _attached = true;
    }

    // 页面 Loaded 时(重)挂集合事件:VM 在 MainViewModel 中单例创建,导航往返靠 Attach/Detach 增减订阅
    public void Attach()
    {
        if (_attached) return;
        _attached = true;
        App.Data.MdDocs.CollectionChanged += MdDocs_CollectionChanged;
        RebuildRows(); // 离开页面期间的增删在此补齐
    }

    // 页面导航离开(Unloaded)时退订,防止 VM 被集合事件钉住
    public void Detach()
    {
        if (!_attached) return;
        _attached = false;
        App.Data.MdDocs.CollectionChanged -= MdDocs_CollectionChanged;
    }

    private void MdDocs_CollectionChanged(object? sender, NotifyCollectionChangedEventArgs e) => RebuildRows();

    // 页面到达/归档动作后重建平铺行(旧 _view.Filter 方案改为显式重建,归档卡片不再泄漏)
    public void RefreshFilter() => RebuildRows();

    private void RebuildRows()
    {
        Rows.Clear();
        foreach (var (doc, depth) in App.MdTreeRows())
            Rows.Add(new MdDocRow(doc, depth));
    }
}
