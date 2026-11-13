using System;
using System.IO;
using System.Text.Json;
using System.Windows;
using System.Windows.Input;
using Microsoft.Web.WebView2.Core;
using Workbench.Models;
using Workbench.Services;

namespace Workbench;

// 置顶便签小窗:无边框、半透明圆角、始终在最前、可拖动可缩放。
// 内容区 = WebView2 里的 Vditor「即时渲染」编辑器(Typora 式:输入语法自动渲染,光标回入显示原文);
// WebView2 初始化失败(运行时缺失/防护拦截)自动回退纯文本框——两层共用 NoteItem.Content,数据层等价,
// 持久化走同一 INPC→App 1s 防抖,不另开保存通道。
// airspace 注意:WebView2 是 HWND 宿主,工具栏行与网页区上下排布(不重叠),底部留缩放 grip 条。
public partial class StickyWindow : Window
{
    private bool _mdReady;
    private bool _suppressEcho; // JS 回写 Content 时抑制 PropertyChanged 再推回编辑器(防回声环)

    public StickyWindow(NoteItem note)
    {
        InitializeComponent();
        DataContext = note;
        note.PropertyChanged += Note_PropertyChanged;
        _ = InitEditorAsync(note);
    }

    private async System.Threading.Tasks.Task InitEditorAsync(NoteItem note)
    {
        try
        {
            await MdEditor.AttachAsync(Editor, Editor_WebMessage,
                () => _mdReady, () => Dispatcher.Invoke(() =>
                {
                    if (_mdReady) return;
                    App.Trace("sticky md editor watchdog: not ready in 10s, fallback");
                    Editor.Visibility = Visibility.Collapsed;
                    FallbackBox.Visibility = Visibility.Visible;
                }));
        }
        catch (Exception ex)
        {
            // 回退纯文本框:同一份 Content,仅编辑体验降级(不再重试,重启应用再试)
            App.Trace("sticky md editor fallback: " + ex.Message);
            Editor.Visibility = Visibility.Collapsed;
            FallbackBox.Visibility = Visibility.Visible;
        }
    }

    private void Editor_WebMessage(object? sender, CoreWebView2WebMessageReceivedEventArgs e)
    {
        if (DataContext is not NoteItem note || Editor.CoreWebView2 is null) return;
        try
        {
            using var doc = JsonDocument.Parse(e.WebMessageAsJson);
            var root = doc.RootElement;
            switch (root.GetProperty("type").GetString())
            {
                case "boot": // 编辑器页就绪,下发初始内容+配色+主题
                    var c = NoteColors.Of(note.ColorKey);
                    Editor.CoreWebView2.PostWebMessageAsJson(JsonSerializer.Serialize(new
                    {
                        type = "init",
                        content = note.Content ?? "",
                        dark = IsAppDark(),
                        bg = c.Background,
                        fg = c.Foreground,
                        accent = c.Accent,
                    }));
                    break;

                case "ready":
                    _mdReady = true;
                    Editor.Visibility = Visibility.Visible;
                    FallbackBox.Visibility = Visibility.Collapsed;
                    break;
                case "input": // 编辑内容回写:INPC → App 1s 防抖落盘(与卡片直编同通道)
                    if (root.TryGetProperty("value", out var v) && v.GetString() is string val && val != note.Content)
                    {
                        _suppressEcho = true;
                        note.Content = val;
                        _suppressEcho = false;
                    }
                    break;

                case "blur":
                    App.Persist();
                    break;

                case "metrics": // 视口诊断(临时)
                    App.Trace($"sticky metrics: innerW={root.GetProperty("innerW").GetInt32()} edW={root.GetProperty("edW").GetInt32()} " +
                              $"resetW={root.GetProperty("resetW").GetDouble():F0} scrollW={root.GetProperty("scrollW").GetInt32()} " +
                              $"bodyScrollW={root.GetProperty("bodyScrollW").GetInt32()}");
                    break;
            }
        }
        catch (Exception ex)
        {
            App.Trace("sticky editor message error: " + ex.Message);
        }
    }

    private void Note_PropertyChanged(object? sender, System.ComponentModel.PropertyChangedEventArgs e)
    {
        // 外部改了内容(卡片编辑/程序写值)→ 推给编辑器整段替换;自己回写的由 _suppressEcho 挡住
        if (e.PropertyName == nameof(NoteItem.Content) && !_suppressEcho && _mdReady && DataContext is NoteItem note)
            Editor.CoreWebView2?.PostWebMessageAsJson(JsonSerializer.Serialize(new { type = "content", value = note.Content ?? "" }));
    }

    private static bool IsAppDark() => string.Equals(App.Data.Theme, "Dark", StringComparison.OrdinalIgnoreCase);

    // App 深浅主题切换时由 MainWindow 推送:Vditor 重建换肤,内容从 JS 侧 cur 恢复
    public void OnAppThemeChanged()
    {
        if (_mdReady)
            Editor.CoreWebView2?.PostWebMessageAsJson(JsonSerializer.Serialize(new { type = "theme", dark = IsAppDark() }));
    }

    private void Border_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
    {
        if (e.ButtonState == MouseButtonState.Pressed)
            DragMove();
    }

    // 🎨 换色:与便签卡片共用同一套配色菜单;换色后编辑器配色/内容主题同步重建
    private void PickColor_Click(object sender, RoutedEventArgs e)
    {
        if (sender is FrameworkElement anchor && DataContext is NoteItem note)
        {
            Views.NoteColorMenu.Show(anchor, note);
            if (_mdReady)
            {
                var c = NoteColors.Of(note.ColorKey);
                Editor.CoreWebView2?.PostWebMessageAsJson(JsonSerializer.Serialize(new
                {
                    type = "init",
                    content = note.Content ?? "",
                    dark = IsAppDark(),
                    bg = c.Background,
                    fg = c.Foreground,
                    accent = c.Accent,
                }));
            }
        }
    }

    private void Close_Click(object sender, RoutedEventArgs e) => Close();

    private void NewNote_Click(object sender, RoutedEventArgs e)
    {
        var note = new NoteItem();
        App.Data.Notes.Insert(0, note); // 先入库再开窗
        new StickyWindow(note).Show();
    }

    private void Window_Closed(object sender, EventArgs e)
    {
        if (DataContext is NoteItem note)
            note.PropertyChanged -= Note_PropertyChanged;
        // 空便签直接回收,不留垃圾
        if (DataContext is NoteItem n2 && string.IsNullOrWhiteSpace(n2.Content))
            App.Data.Notes.Remove(n2);
        App.Persist();
    }
}
