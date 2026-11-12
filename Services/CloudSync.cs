using System.Diagnostics;
using System.IO;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace Workbench.Services;

// WebDAV 云同步总控:只同步主数据库 workbench.db(偏好/岛位置属本机设置,不跨设备)。
// 策略 = 双向自动:启动时云端较新自动拉取(开库前完成,免重启);退出时本地推云端;设置页另有手动按钮。
// 安全栏:①远端被覆盖前,先把它备份成 workbench.db.bak(误同步可找回);②启动拉取前若本地自上次同步
// 后也有改动(崩溃等少见态)→ 不覆盖,提示手动"从云端恢复";③快照走 SQLite 在线备份 API,不复制半截文件;
// ④替换主库前删除 -journal/-wal/-shm 边车,防旧会话 hot journal 回放损坏新库。
// 凭据存 Data\webdav.json(明文——与 prefs.json 同一便携姿态:整个 Data 拷走即迁移,DPAPI 加密会破坏跨机携带;
// 单用户本地文件,run-1 审计口径:同账户可读不构成跨界),状态存 Data\cloud.json
//
// run-3 审计修复(跨时钟域):拉取比较令牌不再用本地 UtcNow,改存「上次成功同步时远端文件的服务器端
// Last-Modified」,并按远端 URL 键控(换服务器即令牌失效)——两侧比较值同处服务器时钟域,偏差免疫;
// 本地改动检测仍用本地时钟(lastSyncUtc vs 库文件 mtime,同域)。
public static class CloudSync
{
    public sealed class Config
    {
        public bool Enabled { get; set; }
        public string Url { get; set; } = "";
        public string Username { get; set; } = "";
        public string Password { get; set; } = "";
        // 内容加密:上传前 AES-256-GCM 加密,云端只存密文;密码存本配置(云端永远拿不到)
        public bool Encrypt { get; set; }
        public string Passphrase { get; set; } = "";
    }

    private static string ConfigPath => Path.Combine(App.DataDir, "webdav.json");
    private static string StatePath => Path.Combine(App.DataDir, "cloud.json");
    private static string DbPath => Path.Combine(App.DataDir, "workbench.db");
    private static string PendingRestorePath => Path.Combine(App.DataDir, "restore-pending.json");

    // 远端固定子目录:root(如 https://dav.jianguoyun.com/dav/) + Workbench/workbench.db
    private const string RemoteDirName = "Workbench";
    private const string RemoteFileName = "workbench.db";

    // 在飞守卫:设置页手动操作与 OnExit 推送互斥(run-3 加固),避免并发写同一远端
    private static bool _inFlight;
    private static bool TryBegin() { if (_inFlight) return false; _inFlight = true; return true; }
    private static void End() => _inFlight = false;

    // ===== 异常翻译:网络层异常→人话;InvalidOperationException 是配置类错误,原文已是人话 =====
    // 供设置页和便签页快捷按钮共用(便签页只有 Toast,没有状态栏可展示,更依赖人话)

    public static string TranslateError(Exception ex) => ex switch
    {
        InvalidOperationException => ex.Message,
        HttpRequestException h when h.Message.Contains("401") => "认证失败:账号或密码不对(坚果云请用「应用密码」)",
        HttpRequestException h when h.Message.Contains("403") => "被服务器拒绝:检查账号权限或是否超出流量",
        TaskCanceledException or System.TimeoutException => "连接超时:检查服务器地址与网络",
        _ => ex.Message,
    };

    // ===== 配置 =====

    public static Config LoadConfig()
    {
        var c = new Config { Url = "https://dav.jianguoyun.com/dav/" }; // URL 预填国内最常用的坚果云,可随时改
        try
        {
            if (!File.Exists(ConfigPath)) return c;
            var loaded = JsonSerializer.Deserialize<Config>(File.ReadAllText(ConfigPath));
            if (loaded is not null) c = loaded;
        }
        catch (Exception ex) { App.Trace("cloud config load failed: " + ex.Message); }
        return c;
    }

    public static void SaveConfig(Config c)
    {
        try
        {
            Directory.CreateDirectory(App.DataDir);
            File.WriteAllText(ConfigPath, JsonSerializer.Serialize(c));
        }
        catch (Exception ex) { App.Trace("cloud config save failed: " + ex.Message); }
    }

    // ===== 同步状态:cloud.json =====
    // lastSyncUtc(本地时钟,只做本地域比较)、lastRemoteLM(服务器时钟令牌)、lastRemoteUrl(令牌绑定)
    private sealed class SyncState
    {
        public string? LastSyncUtc { get; set; }
        public string? LastRemoteLM { get; set; }
        public string? LastRemoteUrl { get; set; }
    }

    private static SyncState LoadState()
    {
        var s = new SyncState();
        try
        {
            if (!File.Exists(StatePath)) return s;
            var loaded = JsonSerializer.Deserialize<SyncState>(File.ReadAllText(StatePath));
            if (loaded is not null) s = loaded;
        }
        catch { /* 坏状态当首次用 */ }
        return s;
    }

    private static void SaveState(DateTimeOffset lastSyncUtc, DateTimeOffset? lastRemoteLM, string remoteUrl)
    {
        try
        {
            Directory.CreateDirectory(App.DataDir);
            File.WriteAllText(StatePath, JsonSerializer.Serialize(new SyncState
            {
                LastSyncUtc = lastSyncUtc.ToString("O"),
                LastRemoteLM = lastRemoteLM?.ToString("O"),
                LastRemoteUrl = remoteUrl,
            }));
        }
        catch (Exception ex) { App.Trace("cloud state save failed: " + ex.Message); }
    }

    // 设置页展示用:最近一次成功同步时间(null = 从未同步过)
    public static DateTimeOffset? LastSyncUtc
    {
        get
        {
            var s = LoadState();
            return DateTimeOffset.TryParse(s.LastSyncUtc, null, System.Globalization.DateTimeStyles.RoundtripKind, out var t) ? t : null;
        }
    }

    // ===== 远端路径 =====

    private static (WebDavClient Client, string DirUrl, string DbUrl) Prepare(Config c)
    {
        // run-3 加固:严格 URI 校验(旧 StartsWith("http") 会放过 "httpfoo" 等畸形前缀)
        if (string.IsNullOrWhiteSpace(c.Url) ||
            !Uri.TryCreate(c.Url.Trim(), UriKind.Absolute, out var uri) ||
            (uri.Scheme != Uri.UriSchemeHttp && uri.Scheme != Uri.UriSchemeHttps))
            throw new InvalidOperationException("服务器地址未配置或不合法(须为 http/https 完整 URL)");
        var root = uri.ToString().TrimEnd('/') + "/";
        var dir = root + RemoteDirName;
        return (new WebDavClient(c.Username, c.Password, uri), dir, dir + "/" + RemoteFileName);
    }

    // ===== 测试连接:目录不存在就建;返回给用户看的一句话 =====

    public static async Task<string> TestAsync(Config c)
    {
        var (client, dir, _) = Prepare(c);
        var stat = await client.StatAsync(dir);
        if (stat is null) await client.MkcolAsync(dir);
        return "连接成功" + (stat is null ? "(云端目录已创建)" : "");
    }

    // ===== 推(上传快照):持久化 → 在线备份快照 → 旧远端留 .bak → PUT → 回读服务器端 LM 作令牌 =====

    public static async Task PushAsync(Config c)
    {
        var (client, _, dbUrl) = Prepare(c);
        if (!TryBegin()) throw new InvalidOperationException("已有云同步操作在进行,请稍后再试");
        try
        {
            App.Persist(); // 先把防抖窗口里的改动落盘,快照才是最新的
            var snapshot = App.Store.SnapshotToBytes();
            if (snapshot.Length == 0)
                throw new InvalidOperationException("数据快照为空,拒绝上传(防把云端有效数据覆盖成空文件)");
            if (c.Encrypt)
                snapshot = EncryptSnapshot(snapshot, c.Passphrase); // 空密码会在内部抛"未设置加密密码"

            // 被覆盖的远端先留底(404 = 首次推送,无旧内容可留);
            // 远端是密文而本机已关加密 → 明文覆盖密文属事故,直接拒绝(run-3 加固)
            var old = await client.GetAsync(dbUrl);
            if (old is not null)
            {
                if (!c.Encrypt && IsWbe1Container(old))
                    throw new InvalidOperationException(
                        "远端是加密内容(WBE1),但本机已关闭内容加密——已阻止明文覆盖。请先开启内容加密并填原密码,或确认后手动删除云端文件");
                await client.PutAsync(dbUrl + ".bak", old);
            }

            await client.PutAsync(dbUrl, snapshot);

            // 回读服务器端 Last-Modified 作为下次拉取的比较令牌(run-3 审计修复:不用本地时钟);
            // 读不到存 null = 保守,下次启动会自动核对一次
            DateTimeOffset? serverLM = null;
            try { serverLM = (await client.StatAsync(dbUrl))?.LastModified; }
            catch (Exception ex) { App.Trace("cloud push stat-back failed: " + ex.Message); }
            SaveState(DateTimeOffset.UtcNow, serverLM, dbUrl);
            App.Trace($"cloud push ok, {snapshot.Length} bytes, tokenLM={(serverLM?.ToString("O") ?? "null")}");
        }
        finally { End(); }
    }

    // ===== 退出推送:同步等待但限时 12s(卡网络不拖死退出);失败只记日志不影响退出 =====

    public static void PushOnExit(Config c)
    {
        if (!c.Enabled || string.IsNullOrWhiteSpace(c.Url)) return;
        if (_inFlight) { App.Trace("cloud push on exit skipped (another sync in flight)"); return; }
        var task = PushAsync(c);
        var winner = Task.WhenAny(task, Task.Delay(TimeSpan.FromSeconds(12))).GetAwaiter().GetResult();
        if (winner == task && task.IsCompletedSuccessfully)
            App.Trace("cloud push on exit done");
        else
            App.Trace("cloud push on exit skipped (timeout or failure)");
    }

    // ===== 启动拉取:必须在 App.OnStartup 的 Store.Load() 之前调用(此时库文件没人占用) =====

    public enum StartupPullOutcome { None, Pulled, Conflict, NoRemote }

    // 纯决策函数(可单元断言):远端比较走服务器时钟域令牌,本地改动检测走本地时钟域——两域不再互比
    internal static StartupPullOutcome DecidePull(
        DateTimeOffset? serverLM, DateTimeOffset? tokenLM, DateTimeOffset lastSyncUtc, DateTimeOffset? localMtimeUtc)
    {
        if (serverLM is null) return StartupPullOutcome.NoRemote;
        var remoteChanged = tokenLM is null || serverLM.Value > tokenLM.Value.AddSeconds(2); // 2s 只吸收同服取整/往返抖动
        if (!remoteChanged) return StartupPullOutcome.None;
        var localChanged = localMtimeUtc is not null && localMtimeUtc.Value > lastSyncUtc.AddSeconds(2);
        return localChanged ? StartupPullOutcome.Conflict : StartupPullOutcome.Pulled;
    }

    // 返回给 toast 的一句话(null = 不打扰);Conflict 时不动本地,让用户手动"从云端恢复"
    public static async Task<(StartupPullOutcome Outcome, string? Note)> PullAtStartupAsync(Config c)
    {
        if (!c.Enabled || string.IsNullOrWhiteSpace(c.Url)) return (StartupPullOutcome.None, null);
        if (!TryBegin()) return (StartupPullOutcome.None, null);
        try
        {
            var (client, _, dbUrl) = Prepare(c);
            var stat = await client.StatAsync(dbUrl);
            if (stat is null) return (StartupPullOutcome.NoRemote, null);
            if (stat.LastModified is null)
                return (StartupPullOutcome.None, "云端同步元数据不可读(服务器未返回修改时间),本次跳过自动拉取");

            // 令牌按远端 URL 键控(run-3 审计修复):换服务器/首跑 = 令牌失效 → 走保守分支
            var state = LoadState();
            DateTimeOffset? tokenLM = null;
            if (state.LastRemoteUrl == dbUrl &&
                DateTimeOffset.TryParse(state.LastRemoteLM, null, System.Globalization.DateTimeStyles.RoundtripKind, out var parsedLM))
                tokenLM = parsedLM;
            var localMtime = File.Exists(DbPath) ? File.GetLastWriteTimeUtc(DbPath) : (DateTimeOffset?)null;
            var lastSync = DateTimeOffset.TryParse(state.LastSyncUtc, null, System.Globalization.DateTimeStyles.RoundtripKind, out var ls) ? ls : DateTimeOffset.MinValue;

            var outcome = DecidePull(stat.LastModified, tokenLM, lastSync, localMtime);
            if (outcome != StartupPullOutcome.Pulled)
            {
                if (outcome == StartupPullOutcome.Conflict)
                    return (outcome, "云端有更新,但本地也有未同步的更改——请到 设置 → 云同步 里手动「从云端恢复」");
                return (outcome, null);
            }

            var bytes = await client.GetAsync(dbUrl)
                ?? throw new InvalidOperationException("云端文件刚检测到却拉取失败(远端被并发删除?)");
            bytes = DecodeRemoteBytes(bytes, c);
            ValidateDbBytes(bytes);
            BackupLocalDb();
            DeleteDbSidecars();
            File.WriteAllBytes(DbPath, bytes);
            SaveState(DateTimeOffset.UtcNow, stat.LastModified, dbUrl);
            App.Trace($"cloud startup pull ok, {bytes.Length} bytes");
            return (StartupPullOutcome.Pulled, "已从云端同步最新数据 ☁️");
        }
        finally { End(); }
    }

    // ===== 手动从云端恢复:下载 → 本地现状留底到云端 .bak → 写待恢复标记 → 重启生效 =====
    // 返回 null = 一切就绪(调用方随后重启);否则返回错误描述
    public static async Task<string?> RestoreNowAsync(Config c)
    {
        var (client, _, dbUrl) = Prepare(c);
        if (!TryBegin()) throw new InvalidOperationException("已有云同步操作在进行,请稍后再试");
        try
        {
            var bytes = await client.GetAsync(dbUrl)
                ?? throw new InvalidOperationException("云端还没有数据文件,先「立即上传」一次");
            bytes = DecodeRemoteBytes(bytes, c);
            ValidateDbBytes(bytes);

            try // 本地现状先推到云端 .bak,恢复错了还能找回来(尽力而为,失败不阻断恢复)
            {
                App.Persist();
                await client.PutAsync(dbUrl + ".bak", App.Store.SnapshotToBytes());
            }
            catch (Exception ex) { App.Trace("cloud restore rescue push failed: " + ex.Message); }

            File.WriteAllBytes(Path.Combine(App.DataDir, RemoteFileName + ".cloudrestore"), bytes);
            File.WriteAllText(PendingRestorePath, JsonSerializer.Serialize(new { at = DateTimeOffset.UtcNow }));
            return null;
        }
        finally { End(); }
    }

    // 消费待恢复标记:也必须在 Store.Load() 之前调用。顺序:本地现库 → .presync.bak,云端文件 → 主库
    public static void ConsumePendingRestore()
    {
        if (!File.Exists(PendingRestorePath)) return;
        var pending = Path.Combine(App.DataDir, RemoteFileName + ".cloudrestore");
        try
        {
            // 消费前对字节二次校验(run-3 加固:写入时校验过,间隔内再验一道)
            var bytes = File.ReadAllBytes(pending);
            ValidateDbBytes(bytes);
            BackupLocalDb(); // 被恢复覆盖前,本地现库留底
            DeleteDbSidecars(); // 崩溃残留的 hot journal 不得回放到新库上
            File.WriteAllBytes(DbPath, bytes);
            File.Delete(pending);
            File.Delete(PendingRestorePath);
            // 令牌清空(保守):恢复文件的最新服务器 LM 未知,下次启动核对一次(无害拉取)
            SaveState(DateTimeOffset.UtcNow, null, LoadState().LastRemoteUrl ?? "");
            App.Trace("cloud restore applied");
        }
        catch (Exception ex)
        {
            App.Trace("cloud restore consume failed: " + ex.Message);
            // 不吞文件:保留 pending 让下次再试;删除半截的 cloudrestore 防止拷贝坏块
            try { if (File.Exists(pending)) File.Delete(pending); } catch { }
        }
    }

    // ===== 工具 =====

    private static bool IsWbe1Container(byte[] bytes)
        => bytes.Length >= 4 && bytes.AsSpan(0, 4).SequenceEqual(Encoding.ASCII.GetBytes(ContainerMagic));

    private static void ValidateDbBytes(byte[] bytes)
    {
        // SQLite 文件魔数:防把网页错误页/空文件当数据库覆盖本地
        var magic = "SQLite format 3\0"u8;
        if (bytes.Length < magic.Length || !bytes.AsSpan(0, magic.Length).SequenceEqual(magic))
            throw new InvalidOperationException("云端文件不是有效的 SQLite 数据库(可能被其他程序占用同名路径)");
    }

    // 替换主库前清掉 SQLite 边车(run-3 加固):上一会话崩溃残留的 hot journal 会在下次打开时被回放到新库上
    private static void DeleteDbSidecars()
    {
        foreach (var suffix in new[] { "-journal", "-wal", "-shm" })
        {
            try
            {
                var p = DbPath + suffix;
                if (File.Exists(p)) File.Delete(p);
            }
            catch (Exception ex) { App.Trace("db sidecar delete failed: " + suffix + " " + ex.Message); }
        }
    }

    private static void BackupLocalDb()
    {
        if (!File.Exists(DbPath)) return;
        var bak = Path.Combine(App.DataDir, RemoteFileName + ".presync.bak");
        File.Copy(DbPath, bak, overwrite: true);
    }

    // ===== 内容加密容器:AES-256-GCM + PBKDF2 =====
    // 布局:[魔数 "WBE1" 4B][盐 16B][nonce 12B][密文][tag 16B];盐/nonce 每次加密随机生成
    // 云端全程只见密文;密码只存在本地 webdav.json(云端拿不到)——防的是云服务商/云端泄露,非本机同用户
    private const string ContainerMagic = "WBE1";
    private const int SaltSize = 16, NonceSize = 12, TagSize = 16, Pbkdf2Iterations = 210_000;

    internal static byte[] EncryptSnapshot(byte[] plain, string passphrase)
    {
        if (string.IsNullOrEmpty(passphrase))
            throw new InvalidOperationException("已开启内容加密,但未设置加密密码");
        var salt = RandomNumberGenerator.GetBytes(SaltSize);
        var nonce = RandomNumberGenerator.GetBytes(NonceSize);
        var key = Rfc2898DeriveBytes.Pbkdf2(passphrase, salt, Pbkdf2Iterations, HashAlgorithmName.SHA256, 32);
        var body = new byte[plain.Length];
        var tag = new byte[TagSize];
        using var aes = new AesGcm(key, TagSize);
        aes.Encrypt(nonce, plain, body, tag);

        var head = Encoding.ASCII.GetBytes(ContainerMagic);
        var container = new byte[head.Length + SaltSize + NonceSize + body.Length + TagSize];
        var pos = 0;
        head.CopyTo(container, pos); pos += head.Length;
        salt.CopyTo(container, pos); pos += SaltSize;
        nonce.CopyTo(container, pos); pos += NonceSize;
        body.CopyTo(container, pos); pos += body.Length;
        tag.CopyTo(container, pos);
        return container;
    }

    internal static byte[] DecryptSnapshot(byte[] container, string passphrase)
    {
        var head = Encoding.ASCII.GetBytes(ContainerMagic);
        if (container.Length <= head.Length + SaltSize + NonceSize + TagSize
            || !container.AsSpan(0, head.Length).SequenceEqual(head))
            throw new InvalidOperationException("云端文件不是有效的工作台加密容器");
        var salt = container.AsSpan(head.Length, SaltSize).ToArray();
        var nonce = container.AsSpan(head.Length + SaltSize, NonceSize).ToArray();
        var bodyLen = container.Length - head.Length - SaltSize - NonceSize - TagSize;
        var body = container.AsSpan(head.Length + SaltSize + NonceSize, bodyLen).ToArray();
        var tag = container.AsSpan(^TagSize).ToArray();
        var key = Rfc2898DeriveBytes.Pbkdf2(passphrase, salt, Pbkdf2Iterations, HashAlgorithmName.SHA256, 32);
        var plain = new byte[bodyLen];
        try
        {
            using var aes = new AesGcm(key, TagSize);
            aes.Decrypt(nonce, body, tag, plain);
        }
        catch (CryptographicException)
        {
            throw new InvalidOperationException("解密失败:云内容加密密码不对");
        }
        return plain;
    }

    // 云端文件识别:WBE1 容器 → 解密;SQLite 魔数 → 未加密时期的明文(过渡兼容)直通;其余交给 ValidateDbBytes 报错
    private static byte[] DecodeRemoteBytes(byte[] bytes, Config c)
    {
        if (IsWbe1Container(bytes))
        {
            if (string.IsNullOrEmpty(c.Passphrase))
                throw new InvalidOperationException("云端内容已加密,但本机未设置加密密码——填入原密码后再拉取");
            return DecryptSnapshot(bytes, c.Passphrase);
        }
        return bytes;
    }
}
