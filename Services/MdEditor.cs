using System.IO;
using Microsoft.Web.WebView2.Core;

namespace Workbench.Services;

// WebView2 md 编辑器装配(置顶便签小窗/MD 文档窗共用):虚拟域名+安全设置+editor.html 导航。
// 消息协议:JS→C# = boot/ready/input{value}/blur/metrics;C#→JS = init{content,dark,bg,fg,accent}/content{value}/theme{dark[,bg,fg,accent]}
// 数据模型在宿主窗口侧,这里只管环境装配;失败(运行时缺失/防护拦截)返回 false,宿主回退纯文本框
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

        core.WebMessageReceived += onMessage;
        core.Navigate(VirtualHost + "/editor.html");

        // 10s 看门狗:页面迟迟不 ready(加载失败/JS 异常)→ 交还宿主回退纯文本,不留空白窗
        _ = Task.Delay(TimeSpan.FromSeconds(10)).ContinueWith(t =>
        {
            if (!isReady()) onFallback();
        });

        return true;
    }
}
