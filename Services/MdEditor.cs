using System.Diagnostics;
using System.IO;
using Microsoft.Web.WebView2.Core;

namespace Workbench.Services;

// WebView2 md 编辑器装配(置顶便签小窗/MD 文档窗共用):虚拟域名+安全设置+editor.html 导航。
// 消息协议:JS→C# = boot/ready/input{value}/blur/metrics/openlink{url};C#→JS = init{content,dark,bg,fg,accent,toolbar}/content{value}/theme{dark[,bg,fg,accent]}
// 数据模型在宿主窗口侧,这里只管环境装配;失败(运行时缺失/防护拦截)返回 false,宿主回退纯文本框。
//
// run-4 审计加固(workbench.mdeditor.core-not-origin-bound):消息桥/导航/弹窗三面全部钉死到本机虚拟域名——
// 桥按 e.Source 过滤、主框架导航一律取消非 md.local 目标、window.open 弹窗改走系统默认浏览器;
// 外链不再进入 WebView2 弹窗(app 相邻钓鱼面消除),任何换页路径都无法触达"boot 换全文/input 写库"的桥协议。
public static class MdEditor
{
    public const string VirtualHost = "https://md.local";

    public static async Task<bool> AttachAsync(
        Microsoft.Web.WebView2.Wpf.WebView2 editor,
        EventHandler<CoreWebView2WebMessageReceivedEventArgs> onMessage,
        Func<bool> isReady, Action onFallback)
    {
        var env = await CoreWebView2Environment.CreateAsync(
            userDataFolder: Path.Combine(App.DataDir, "webview2")); // 防护拦未签名 exe 写 %APPDATA%/%TEMP%,Data 目录实测放行
        await editor.EnsureCoreWebView2Async(env);

        var core = editor.CoreWebView2;
        core.SetVirtualHostNameToFolderMapping(
            "md.local", App.MdEditorDir, CoreWebView2HostResourceAccessKind.Allow);
        var s = core.Settings;
        s.AreDevToolsEnabled = false;
        s.IsStatusBarEnabled = false;
        s.IsZoomControlEnabled = false;
        s.AreDefaultContextMenusEnabled = false; // Typora 式纯编辑面,不要网页右键菜单
        s.AreBrowserAcceleratorKeysEnabled = false;

        // 消息桥来源绑定:只接受本机虚拟域名编辑器页的消息(run-4:桥协议携带整篇内容/写入持久化,必须锁定发送方)
        core.WebMessageReceived += (_, e) =>
        {
            if (e.Source is null || !e.Source.StartsWith(VirtualHost + "/", StringComparison.Ordinal))
            {
                App.Trace("md editor message blocked (source=" + (e.Source ?? "null") + ")");
                return;
            }
            onMessage(editor, e);
        };

        // 主框架导航钉死:任何非 md.local 目标(拖放/畸形内容/意外换页路径)一律取消——外部内容进不了同一核
        core.NavigationStarting += (_, e) =>
        {
            if (e.Uri is null || !e.Uri.StartsWith(VirtualHost + "/", StringComparison.Ordinal))
            {
                App.Trace("md editor navigation cancelled: " + (e.Uri ?? "null"));
                e.Cancel = true;
            }
        };

        // 新窗策略:window.open 一律不进 app 弹窗;http(s) 走系统默认浏览器,其余 scheme 直接丢弃
        core.NewWindowRequested += (_, e) =>
        {
            e.Handled = true;
            OpenInSystemBrowser(e.Uri);
        };

        core.Navigate(VirtualHost + "/editor.html");

        // 10s 看门狗:页面迟迟不 ready(加载失败/JS 异常)→ 交还宿主回退纯文本,不留空白窗
        _ = Task.Delay(TimeSpan.FromSeconds(10)).ContinueWith(t =>
        {
            if (!isReady()) onFallback();
        });

        return true;
    }

    // 系统默认浏览器打开外链(scheme 白名单:杜绝 javascript:/file: 等经宿主进程触达任意 handler)
    public static void OpenInSystemBrowser(string? url)
    {
        if (string.IsNullOrWhiteSpace(url)) return;
        if (!url.StartsWith("http://", StringComparison.OrdinalIgnoreCase) &&
            !url.StartsWith("https://", StringComparison.OrdinalIgnoreCase)) return;
        try
        {
            Process.Start(new ProcessStartInfo(url) { UseShellExecute = true });
        }
        catch (Exception ex)
        {
            App.Trace("open external link failed: " + ex.Message);
        }
    }

    // 消息 JSON 容错取值(run-4 加固:缺字段/错型回缺省值,不靠异常驱动;metrics 类诊断消息专用)
    public static int TryGetI(System.Text.Json.JsonElement root, string name, int def = 0)
        => root.ValueKind == System.Text.Json.JsonValueKind.Object
           && root.TryGetProperty(name, out var v) && v.TryGetInt32(out var i) ? i : def;

    public static double TryGetD(System.Text.Json.JsonElement root, string name, double def = 0)
        => root.ValueKind == System.Text.Json.JsonValueKind.Object
           && root.TryGetProperty(name, out var v) && v.TryGetDouble(out var d) ? d : def;
}
