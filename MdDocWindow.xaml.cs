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
        DataContext = doc;
        doc.PropertyChanged += Doc_PropertyChanged;
        TitleBar.Title = string.IsNullOrWhiteSpace(doc.Title) ? "MD 文档" : doc.Title;
        _ = InitEditorAsync(doc);
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

                case "metrics":
                    App.Trace($"md doc metrics: innerW={root.GetProperty("innerW").GetInt32()} " +
                              $"scrollW={root.GetProperty("scrollW").GetInt32()}");
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
