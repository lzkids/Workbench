using System.Globalization;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.RegularExpressions;

namespace Workbench.Services;

// 极简 WebDAV 客户端:只实现云同步要用的动词(PUT/GET/PROPFIND/MKCOL)+ Basic 认证。
// 刻意不引第三方依赖(HttpClient 原生够用);超时 20s;非 2xx 抛 HttpRequestException,
// 由调用方(CloudSync/设置页)翻译成人话。404 一律返回 null/特殊标记,让上层区分"远端还没有"和"出错"
public sealed class WebDavClient
{
    private readonly HttpClient _http;

    public WebDavClient(string username, string password, Uri? target = null, TimeSpan? timeout = null)
    {
        var handler = new HttpClientHandler
        {
            // run-3 加固:WebDAV 客户端无需重定向——关闭后跨主机重定向直接报错,消除凭据跟随类暴露面
            AllowAutoRedirect = false,
        };
        // 回环目标绝不走系统代理:本机防护会注入全局代理,吞掉发往 127.0.0.1 的请求(davtest 实测卡死在连接前);
        // 真实服务器保持系统默认,用户自配代理仍生效
        if (target is not null && target.IsLoopback) handler.UseProxy = false;
        _http = new HttpClient(handler) { Timeout = timeout ?? TimeSpan.FromSeconds(20) };
        var token = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{username}:{password}"));
        _http.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", token);
        // 有些服务商(坚果云等)会对无 UA 的请求挑刺,补一个常规 UA
        _http.DefaultRequestHeaders.UserAgent.ParseAdd("Workbench-CloudSync/1.0");
    }

    // 上传;2xx = 成功
    public async Task PutAsync(string url, byte[] data)
    {
        using var content = new ByteArrayContent(data);
        content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
        using var resp = await _http.PutAsync(url, content);
        resp.EnsureSuccessStatusCode();
    }

    // 响应体上限(run-3 加固):防敌意服务器无界内存;真实库文件远小于此
    private const long MaxResponseBodyBytes = 64 * 1024 * 1024;

    // 有界读取:超限抛 InvalidOperationException,由上游 catch 翻译
    private static async Task<byte[]> ReadBoundedAsync(HttpContent content)
    {
        await using var s = await content.ReadAsStreamAsync();
        using var buf = new MemoryStream();
        var chunk = new byte[81920];
        long total = 0;
        int n;
        while ((n = await s.ReadAsync(chunk)) > 0)
        {
            total += n;
            if (total > MaxResponseBodyBytes)
                throw new InvalidOperationException("云端响应超过 64MB 上限,已拒绝读入");
            await buf.WriteAsync(chunk.AsMemory(0, n));
        }
        return buf.ToArray();
    }

    // 下载;404(远端尚无该文件)返回 null,其余非 2xx 抛异常
    public async Task<byte[]?> GetAsync(string url)
    {
        using var resp = await _http.GetAsync(url);
        if (resp.StatusCode == System.Net.HttpStatusCode.NotFound) return null;
        resp.EnsureSuccessStatusCode();
        return await ReadBoundedAsync(resp.Content);
    }

    // 存在性 + 修改时间(PROPFIND Depth:0);404 = null(目录/文件还没建)
    public async Task<WebDavStat?> StatAsync(string url)
    {
        using var req = new HttpRequestMessage(new HttpMethod("PROPFIND"), url);
        req.Headers.Add("Depth", "0");
        using var resp = await _http.SendAsync(req);
        if (resp.StatusCode == System.Net.HttpStatusCode.NotFound) return null;
        resp.EnsureSuccessStatusCode(); // 正常返回 207 Multi-Status
        var xml = Encoding.UTF8.GetString(await ReadBoundedAsync(resp.Content));
        return ParseStat(xml);
    }

    // 建目录;201=新建成功,405=已存在 → 都算成功;其余抛异常
    public async Task MkcolAsync(string url)
    {
        using var resp = await _http.SendAsync(new HttpRequestMessage(new HttpMethod("MKCOL"), url));
        if (resp.IsSuccessStatusCode
            || resp.StatusCode == System.Net.HttpStatusCode.MethodNotAllowed
            || resp.StatusCode == System.Net.HttpStatusCode.Conflict) // 部分实现用 409 表示父目录已建
            return;
        throw new HttpRequestException($"MKCOL {(int)resp.StatusCode}");
    }

    // 从 PROPFIND 的 207 XML 里抠 getlastmodified(RFC1123 GMT);命名空间前缀各家不一,用正则兼容
    internal static WebDavStat? ParseStat(string xml)
    {
        var m = Regex.Match(xml, @"<(?:[\w.-]+:)?getlastmodified>\s*([^<]+?)\s*<", RegexOptions.IgnoreCase);
        if (!m.Success) return new WebDavStat(null);
        // RFC1123 恒为 GMT;AssumeUniversal 兜住个别服务商少写 GMT 后缀的情况
        var ok = DateTimeOffset.TryParse(m.Groups[1].Value, CultureInfo.InvariantCulture,
            DateTimeStyles.AssumeUniversal | DateTimeStyles.AdjustToUniversal, out var lm);
        return new WebDavStat(ok ? lm : null);
    }
}

public sealed record WebDavStat(DateTimeOffset? LastModified);
