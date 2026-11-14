using System;
using System.Text.Json;
using System.Windows;
using Microsoft.Web.WebView2.Core;
using Wpf.Ui.Controls;
using Workbench.Models;
using Workbench.Services;

namespace Workbench;

// MD 文档独立编辑窗:WebView2 + Vditor 即时渲染(Typora 式),与置顶便签小窗同一渲染管线(MdEditor.AttachAsync)。
// 与便签小窗的差异:配色不跟卡片、跟应用深浅主题;标题从内容实时推导(首个 # 行)显示在标题栏;空文档关闭即丢弃
public partial class MdDocWindow : FluentWindow
{
    private bool _mdReady;
    private bool _suppressEcho;

    public MdDocWindow(MdDoc doc)
    {
        InitializeComponent();
        // 首绘前 WebView2 默认底色是黑(用户可见的"黑色内容区"),改透明由下方 Border 卡片供底
        Editor.DefaultBackgroundColor = System.Drawing.Color.Transparent;
        DataContext = doc;
        doc.PropertyChanged += Doc_PropertyChanged;
        TitleBar.Title = string.IsNullOrWhiteSpace(doc.Title) ? "Markdown" : doc.Title;
        // 文件树侧栏:全部 MD 文档(集合引用,增删自动跟随;标题 INPC 实时刷新)
        DocList.ItemsSource = App.Data.MdDocs;
        DocList.SelectedItem = doc;
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

    private void NewDoc_Click(object sender, RoutedEventArgs e)
    {
        var doc = new MdDoc();
        App.Data.MdDocs.Insert(0, doc);
        App.Persist();
        SwitchToDoc(doc);
    }

    private void DocList_SelectionChanged(object sender, System.Windows.Controls.SelectionChangedEventArgs e)
    {
        // 点列表切文档;代码侧的选中同步会再次触发,这里靠 ReferenceEquals 短路
        if (DocList.SelectedItem is MdDoc doc && !ReferenceEquals(DataContext, doc))
            SwitchToDoc(doc);
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
        DocList.SelectedItem = doc;
        if (_mdReady)
        {
            var (bg, fg, accent) = ThemeColors();
            Editor.CoreWebView2?.PostWebMessageAsJson(JsonSerializer.Serialize(new
            {
                type = "init",
                content = doc.Content ?? "",
                dark = IsAppDark(),
                bg, fg, accent,
                toolbar = true,
            }));
        }
    }

    private static bool IsAppDark() => string.Equals(App.Data.Theme, "Dark", StringComparison.OrdinalIgnoreCase);

    // MD 文档配色跟主题走(不跟便签卡片色)
    private static (string Bg, string Fg, string Accent) ThemeColors() => IsAppDark()
        ? ("#252629", "#DCDCDC", "#6FA8DC")
        : ("#FFFFFF", "#1F2328", "#4A7C9B");

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
            toolbar = true, // MD 文档窗带常用语法工具栏(便签小窗不带=纯打字面)
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

    // App 深浅主题切换时由 MainWindow 推送:MD 文档配色跟主题,连配色一起换(重建,内容从 JS 侧 cur 恢复)
    public void OnAppThemeChanged()
    {
        if (!_mdReady || Editor.CoreWebView2 is null) return;
        var (bg, fg, accent) = ThemeColors();
        Editor.CoreWebView2.PostWebMessageAsJson(JsonSerializer.Serialize(new
        {
            type = "theme", dark = IsAppDark(), bg, fg, accent,
        }));
    }

    private void Window_Closed(object sender, EventArgs e)
    {
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
