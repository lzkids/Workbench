using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text.Json;
using System.Windows;
using System.Windows.Controls;
using Microsoft.Web.WebView2.Core;
using Wpf.Ui.Controls;
using Workbench.Models;
using Workbench.Services;

namespace Workbench;

// MD 文档独立编辑窗:WebView2 + Muya 即时渲染(Typora 式,MarkText 同款内核),与置顶便签小窗同一渲染管线(MdEditor.AttachAsync)。
// 与便签小窗的差异:配色不跟卡片、跟应用深浅主题;标题从内容实时推导(首个 # 行)显示在标题栏;空文档关闭即丢弃。
// 侧栏为树状文档列表(MdTreeNode),支持子文档;收起成 28px 窄条后仍有新建入口,收起态新建自动展开侧栏给即时反馈
public partial class MdDocWindow : FluentWindow
{
    private bool _mdReady;
    private bool _suppressEcho;
    private List<MdTreeNode> _roots = new();
    private readonly HashSet<string> _expandedIds = new(); // 树重建间保持展开状态(按文档 Id)
    private MdDoc? _pendingSelect; // 新建后待选中的文档(树重建完成后消费:选中+滚动+聚焦)

    public MdDocWindow(MdDoc doc)
    {
        InitializeComponent();
        // 首绘前 WebView2 默认底色是黑(用户可见的"黑色内容区"),改透明由下方 Border 卡片供底
        Editor.DefaultBackgroundColor = System.Drawing.Color.Transparent;
        DataContext = doc;
        doc.PropertyChanged += Doc_PropertyChanged;
        TitleBar.Title = string.IsNullOrWhiteSpace(doc.Title) ? "Markdown" : doc.Title;
        // 文件树侧栏:全部 MD 文档(树状);集合增删自动重建(窗口生命周期内订阅,Closed 退订)
        App.Data.MdDocs.CollectionChanged += MdDocs_CollectionChanged;
        // Expanded/Collapsed 是 TreeViewItem 的路由事件,在 TreeView 上以 AddHandler 挂接(冒泡收齐全部层级)
        DocTree.AddHandler(System.Windows.Controls.TreeViewItem.ExpandedEvent, new RoutedEventHandler(DocTree_ExpandChanged));
        DocTree.AddHandler(System.Windows.Controls.TreeViewItem.CollapsedEvent, new RoutedEventHandler(DocTree_ExpandChanged));
        RebuildTree();
        SelectNodeFor(doc, scrollIntoView: false, focusEditor: false);
        _ = InitEditorAsync(doc);
    }

    // ===== 文件树侧栏 =====

    private bool _sidebarExpanded = true;

    private void ToggleSidebar_Click(object sender, RoutedEventArgs e)
    {
        _sidebarExpanded = !_sidebarExpanded;
        SidebarCol.Width = _sidebarExpanded ? new GridLength(200) : new GridLength(28);
        Sidebar.Visibility = _sidebarExpanded ? Visibility.Visible : Visibility.Collapsed;
        SidebarRail.Visibility = _sidebarExpanded ? Visibility.Collapsed : Visibility.Visible;
    }

    private void MdDocs_CollectionChanged(object? sender, NotifyCollectionChangedEventArgs e) => RebuildTree();

    // 由 App.Data.MdDocs 重建树:未归档文档按 ParentId 归组,孤儿(ParentId 指向缺失/环)落根显示,防环不展开
    private void RebuildTree()
    {
        _roots = BuildNodes();
        DocTree.ItemsSource = _roots;
        if (_pendingSelect is not null)
        {
            var target = _pendingSelect;
            _pendingSelect = null;
            SelectNodeFor(target, scrollIntoView: true, focusEditor: true); // 新建反馈:选中+滚动+聚焦
        }
        else if (DataContext is MdDoc cur)
        {
            SelectNodeFor(cur, scrollIntoView: false, focusEditor: false); // 保持当前文档选中
        }
    }

    private List<MdTreeNode> BuildNodes()
    {
        var visible = App.Data.MdDocs.Where(d => !d.Archived).ToList();
        var byParent = new Dictionary<string, List<MdDoc>>();
        foreach (var d in visible)
        {
            var key = string.IsNullOrEmpty(d.ParentId) ? "" : d.ParentId;
            if (!byParent.TryGetValue(key, out var list)) byParent[key] = list = new List<MdDoc>();
            list.Add(d);
        }

        var result = new List<MdTreeNode>();
        var seen = new HashSet<string>();
        void BuildInto(string parentId, System.Collections.Generic.ICollection<MdTreeNode> sink)
        {
            if (!byParent.TryGetValue(parentId, out var kids)) return;
            foreach (var d in kids)
            {
                if (!seen.Add(d.Id)) continue; // 异常数据成环时不再展开
                var node = new MdTreeNode(d) { IsExpanded = _expandedIds.Contains(d.Id) };
                sink.Add(node);
                BuildInto(d.Id, node.Children);
            }
        }
        BuildInto("", result);
        foreach (var d in visible) // 孤儿落根(ParentId 无效或环上节点),数据不丢
        {
            if (seen.Contains(d.Id)) continue;
            seen.Add(d.Id);
            var node = new MdTreeNode(d) { IsExpanded = _expandedIds.Contains(d.Id) };
            result.Add(node);
            BuildInto(d.Id, node.Children);
        }
        return result;
    }

    // 选中某文档的树节点(清其它选中,展开祖先链);找到返回 true
    private bool SelectNodeIn(System.Collections.Generic.IReadOnlyList<MdTreeNode> nodes, MdDoc doc, bool scrollIntoView, bool focusEditor)
    {
        foreach (var n in nodes)
        {
            if (ReferenceEquals(n.Doc, doc))
            {
                n.IsSelected = true;
                if (scrollIntoView) ScrollNodeIntoView(n);
                if (focusEditor && _mdReady) Editor.Focus();
                return true;
            }
            if (SelectNodeIn(n.Children, doc, scrollIntoView, focusEditor))
            {
                n.IsExpanded = true; // 展开祖先链
                _expandedIds.Add(n.Doc.Id);
                return true;
            }
            n.IsSelected = false;
        }
        return false;
    }

    private void SelectNodeFor(MdDoc doc, bool scrollIntoView, bool focusEditor)
        => SelectNodeIn(_roots, doc, scrollIntoView, focusEditor);

    private void ScrollNodeIntoView(MdTreeNode node)
    {
        // 容器在布局后才生成,Loaded 优先级再找(找不到=容器未生成,静默跳过;选中样式仍会显示)
        Dispatcher.BeginInvoke(System.Windows.Threading.DispatcherPriority.Loaded, () =>
        {
            var item = FindContainer(DocTree, node);
            item?.BringIntoView();
        });
    }

    private System.Windows.Controls.TreeViewItem? FindContainer(ItemsControl parent, MdTreeNode target)
    {
        if (!parent.HasItems) return null;
        if (parent is System.Windows.Controls.TreeViewItem { IsExpanded: false }) return null;
        for (var i = 0; i < parent.Items.Count; i++)
        {
            if (parent.ItemContainerGenerator.ContainerFromIndex(i) is not System.Windows.Controls.TreeViewItem item) continue;
            if (ReferenceEquals(item.DataContext, target)) return item;
            var deeper = FindContainer(item, target);
            if (deeper != null) return deeper;
        }
        return null;
    }

    private void DocTree_SelectedItemChanged(object sender, RoutedPropertyChangedEventArgs<object> e)
    {
        // 点树切文档;代码侧选中同步会再次触发,这里靠 ReferenceEquals 短路
        if (e.NewValue is MdTreeNode { Doc: MdDoc doc } && !ReferenceEquals(DataContext, doc))
            SwitchToDoc(doc);
    }

    // 展开/收起写回 _expandedIds(ExpandChanged 覆盖用户点击与绑定回写两条路径)
    private void DocTree_ExpandChanged(object sender, RoutedEventArgs e)
    {
        if (e.OriginalSource is System.Windows.Controls.TreeViewItem { DataContext: MdTreeNode node })
        {
            if (node.IsExpanded) _expandedIds.Add(node.Doc.Id);
            else _expandedIds.Remove(node.Doc.Id);
        }
    }

    private void NewDoc_Click(object sender, RoutedEventArgs e) => CreateDoc(null);

    // 收起态的新建入口:先自动展开侧栏再新建,新建结果立刻可见
    private void RailNewDoc_Click(object sender, RoutedEventArgs e)
    {
        if (!_sidebarExpanded)
            ToggleSidebar_Click(this, new RoutedEventArgs());
        CreateDoc(null);
    }

    // 树节点悬停「＋」:在该文档下新建子文档
    private void NewSubDoc_Click(object sender, RoutedEventArgs e)
    {
        if ((sender as FrameworkElement)?.Tag is MdDoc parent)
            CreateDoc(parent.Id);
    }

    private void CreateDoc(string? parentId)
    {
        if (parentId != null)
            _expandedIds.Add(parentId);
        var doc = App.AddMdDoc(parentId); // Insert 触发 CollectionChanged → 已重建一次
        _pendingSelect = doc;
        RebuildTree(); // 消费 _pendingSelect:选中+滚动到位+编辑器聚焦
    }

    // 原地切换正在编辑的文档:换 DataContext 并让编辑器整段重建(内容/配色);别处开着同文档窗则关闭防双开
    private void SwitchToDoc(MdDoc doc)
    {
        foreach (var w in Application.Current.Windows
                     .OfType<MdDocWindow>()
                     .Where(w => !ReferenceEquals(w, this) && ReferenceEquals(w.DataContext, doc)).ToList())
            w.Close(); // 空文档会在其 Closed 里被丢弃,下面补回列防孤儿

        if (!App.Data.MdDocs.Contains(doc))
            App.Data.MdDocs.Insert(0, doc);

        if (DataContext is MdDoc old)
            old.PropertyChanged -= Doc_PropertyChanged;
        DataContext = doc;
        doc.PropertyChanged += Doc_PropertyChanged;
        TitleBar.Title = string.IsNullOrWhiteSpace(doc.Title) ? "Markdown" : doc.Title;
        SelectNodeFor(doc, scrollIntoView: false, focusEditor: false);
        if (_mdReady)
        {
            var (bg, fg, accent) = ThemeColors();
            Editor.CoreWebView2?.PostWebMessageAsJson(JsonSerializer.Serialize(new
            {
                type = "init",
                content = doc.Content ?? "",
                dark = IsAppDark(),
                bg, fg, accent,
                font = EditorFont(),
                toolbar = true,
            }));
        }
    }

    private static bool IsAppDark() => App.Data.Theme is "Dark" or "Pixel";

    // MD 文档配色跟主题走(不跟便签卡片色);像素风=复古绿
    private static (string Bg, string Fg, string Accent) ThemeColors() => App.Data.Theme switch
    {
        "Pixel" => ("#141812", "#C6D9A3", "#7FC65B"),
        "Dark" => ("#252629", "#DCDCDC", "#6FA8DC"),
        _ => ("#FFFFFF", "#1F2328", "#4A7C9B"),
    };

    // 像素风时编辑器用缝合像素字体(空=默认);与 muya-theme.css 的 @font-face 家族名一致
    private static string? EditorFont() => App.Data.Theme == "Pixel"
        ? "'Fusion Pixel 12px Prop zh-Hans', 'Microsoft YaHei', monospace"
        : null;

    private async System.Threading.Tasks.Task InitEditorAsync(MdDoc doc)
    {
        try
        {
            await MdEditor.AttachAsync(Editor, Editor_WebMessage,
                () => _mdReady, () => Dispatcher.Invoke(() =>
                {
                    if (_mdReady) return;
                    App.Trace("md doc editor watchdog: not ready in 10s, fallback");
                    Editor.Visibility = Visibility.Collapsed;
                    FallbackBox.Visibility = Visibility.Visible;
                }));
        }
        catch (Exception ex)
        {
            App.Trace("md doc editor fallback: " + ex.Message);
            Editor.Visibility = Visibility.Collapsed;
            FallbackBox.Visibility = Visibility.Visible;
        }
    }

    private void SendInit()
    {
        if (Editor.CoreWebView2 is null || DataContext is not MdDoc doc) return;
        var (bg, fg, accent) = ThemeColors();
        Editor.CoreWebView2.PostWebMessageAsJson(JsonSerializer.Serialize(new
        {
            type = "init",
            content = doc.Content ?? "",
            dark = IsAppDark(),
            bg, fg, accent,
            font = EditorFont(), // 像素风=缝合像素字体,亮/暗=null
            toolbar = true, // MD 文档窗带悬浮工具(便签小窗不带=纯打字面)
        }));
    }

    private void Editor_WebMessage(object? sender, CoreWebView2WebMessageReceivedEventArgs e)
    {
        if (DataContext is not MdDoc doc || Editor.CoreWebView2 is null) return;
        try
        {
            using var jdoc = JsonDocument.Parse(e.WebMessageAsJson);
            var root = jdoc.RootElement;
            switch (root.GetProperty("type").GetString())
            {
                case "boot":
                    SendInit();
                    break;

                case "ready":
                    _mdReady = true;
                    FallbackBox.Visibility = Visibility.Collapsed;
                    break;

                case "input":
                    if (root.TryGetProperty("value", out var v) && v.GetString() is string val && val != doc.Content)
                    {
                        _suppressEcho = true;
                        doc.Content = val; // INPC → App 1s 防抖落盘
                        doc.RefreshTitle();
                        _suppressEcho = false;
                        TitleBar.Title = doc.Title; // 标题栏跟随首个标题行
                    }
                    break;

                case "blur":
                    App.Persist();
                    break;

                case "openlink": // 外链走系统默认浏览器(run-4:不再进 WebView2 弹窗)
                    if (root.TryGetProperty("url", out var ol) && ol.GetString() is string link)
                        MdEditor.OpenInSystemBrowser(link);
                    break;

                case "metrics": // 视口诊断(run-4 加固:TryGet 系解析,异常驱动改缺省值)
                    App.Trace($"md doc metrics: innerW={MdEditor.TryGetI(root, "innerW")} scrollW={MdEditor.TryGetI(root, "scrollW")}");
                    break;
            }
        }
        catch (Exception ex)
        {
            App.Trace("md doc editor message error: " + ex.Message);
        }
    }

    private void Doc_PropertyChanged(object? sender, System.ComponentModel.PropertyChangedEventArgs e)
    {
        if (e.PropertyName == nameof(MdDoc.Content) && !_suppressEcho && _mdReady && DataContext is MdDoc doc)
            Editor.CoreWebView2?.PostWebMessageAsJson(JsonSerializer.Serialize(new { type = "content", value = doc.Content ?? "" }));
    }

    // App 深浅主题切换时由 MainWindow 推送:MD 文档配色跟主题,实时换肤(Muya 走 CSS 变量,不重建实例)
    public void OnAppThemeChanged()
    {
        if (!_mdReady || Editor.CoreWebView2 is null) return;
        var (bg, fg, accent) = ThemeColors();
        Editor.CoreWebView2.PostWebMessageAsJson(JsonSerializer.Serialize(new
        {
            type = "theme", dark = IsAppDark(), bg, fg, accent, font = EditorFont(),
        }));
    }

    private void Window_Closed(object sender, EventArgs e)
    {
        App.Data.MdDocs.CollectionChanged -= MdDocs_CollectionChanged;
        _pendingSelect = null;
        if (DataContext is MdDoc doc)
        {
            doc.PropertyChanged -= Doc_PropertyChanged;
            // 空文档直接丢弃,不留垃圾
            if (string.IsNullOrWhiteSpace(doc.Content))
                App.Data.MdDocs.Remove(doc);
            else
                doc.RefreshTitle();
        }
        App.Persist();
    }
}
