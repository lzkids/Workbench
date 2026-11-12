using System.Collections.Specialized;
using System.ComponentModel;
using System.IO;
using System.Text.Json;
using System.Windows;
using System.Windows.Threading;
using Wpf.Ui.Appearance;
using Wpf.Ui.Controls;
using Workbench.Models;
using Workbench.Services;
using Workbench.ViewModels;

namespace Workbench;

public partial class App : Application
{
    // 全局数据入口:三个页面共享同一份 WorkbenchData;存储后端 = SQLite(单文件,目录可在设置里改)
    public static string DataDir { get; } =
        AppSettings.GetDataDir() ?? Path.Combine(AppContext.BaseDirectory, "Data");
    public static IDataStore Store { get; } = new SqliteStore(DataDir);
    public static WorkbenchData Data { get; private set; } = new();

    // 自动保存防抖:任何改动后 1 秒无新动作才落盘
    private static readonly DispatcherTimer SaveTimer = new() { Interval = TimeSpan.FromSeconds(1) };

    protected override void OnStartup(StartupEventArgs e)
    {
        Trace("startup begin, args=[" + string.Join(", ", e.Args) + "]");

        // 单实例守卫(审计修复):两个实例会对同一 workbench.db 做"整库快照替换"式保存,
        // 后写者用陈旧快照覆盖先写者。第二实例直接提示退出。
        _singleInstance = new Mutex(initiallyOwned: true, @"Local\Workbench.SingleInstance", out var createdNew);
        if (!createdNew)
        {
            System.Windows.MessageBox.Show("工作台已在运行中。\n如需打开界面,请从右下角托盘图标或灵动岛进入。", "工作台",
                System.Windows.MessageBoxButton.OK, System.Windows.MessageBoxImage.Information);
            Shutdown();
            return;
        }

        // 黑匣子:任何未捕获异常写 crash.log 且不闪退
        DispatcherUnhandledException += (_, args) =>
        {
            WriteCrashLog(args.Exception);
            args.Handled = true;
        };

        SaveTimer.Tick += (_, _) =>
        {
            SaveTimer.Stop();
            Persist();
        };

        // 云同步:先消费"待恢复"(设置页手动恢复后重启)与启动自动拉取——都必须赶在开库之前;
        // 网络不可达时限 8s 放弃,不为同步卡启动
        string? cloudNote = null;
        try
        {
            CloudSync.ConsumePendingRestore();
            var pull = CloudSync.PullAtStartupAsync(CloudSync.LoadConfig())
                .WaitAsync(TimeSpan.FromSeconds(8)).GetAwaiter().GetResult();
            cloudNote = pull.Note;
            Trace("cloud startup pull: " + pull.Outcome + (pull.Note is null ? "" : " | " + pull.Note));
        }
        catch (Exception ex)
        {
            Trace("cloud startup sync skipped: " + ex.Message);
        }

        Data = Store.Load();
        Trace("data loaded");
        base.OnStartup(e);

        if (Data.Theme == "Dark")
        {
            ApplyTheme("Dark");
            Trace("dark theme applied at startup");
        }

        HookAutoSave(Data);
        Trace("autosave hooked");

        // 可选启动参数:0-5 选初始页;"toggle" 自动切主题;"selftest" 跑功能自测(自动化验证用)
        int page = 0;
        if (e.Args.Length > 0 && int.TryParse(e.Args[0], out var p) && p is >= 0 and <= 5) page = p;
        var main = new MainWindow { DataContext = new MainViewModel(page) };
        Trace("window constructed");

        // 灵动岛总控:主窗口拖到屏幕边缘(左/右/上/下)或托盘菜单 → 化岛
        var islandController = new IslandController(main);
        main.AttachIsland(islandController);
        Trace("island controller attached");

        // 上次化过岛 → 直接以灵动岛启动(主窗口不闪现);island= 测试钩子优先。
        // 审计修复:argv 只接受精确形式(island / island=left|right|bottom|top)——门控与 switch 一致地用
        // 精确集合匹配,未知 island=<x> 一律忽略(不算化岛指令,按 island.json 走常规启动恢复),
        // 不再 StartsWith 宽松命中;island.json 的 edge 由 LoadIslandState 白名单化,此处不再 Enum.Parse 任意字符串
        var islandArg = e.Args.FirstOrDefault(a => a == "island" || a == "island=left"
            || a == "island=right" || a == "island=bottom" || a == "island=top");
        var (savedEdge, savedOffset, savedScale, savedVertical, savedFreeX, savedFreeY) = IslandController.LoadIslandState();
        bool startIsland = islandArg is not null || savedEdge is not null || savedFreeX is not null;
        if (!startIsland)
        {
            main.Show();
            Trace("window shown");
        }
        else
        {
            // island= 指定了边 → 用指定边;否则恢复上次姿态(贴边态用 savedEdge,自由态 edge=null)
            var edge = islandArg switch
            {
                "island=left" => IslandEdge.Left,
                "island=bottom" => IslandEdge.Bottom,
                "island=top" => IslandEdge.Top,
                "island" or "island=right" => IslandEdge.Right,
                _ => savedEdge switch
                {
                    "Left" => IslandEdge.Left,
                    "Right" => IslandEdge.Right,
                    "Bottom" => IslandEdge.Bottom,
                    "Top" => IslandEdge.Top,
                    _ => (IslandEdge?)null,
                },
            };
            islandController.EnterIslandMode(edge, savedOffset, savedScale, savedVertical, savedFreeX, savedFreeY);
            Trace($"island mode entered: {edge?.ToString() ?? "free"} (arg={islandArg ?? "saved"}, offset={savedOffset?.ToString() ?? "center"}, scale={savedScale?.ToString() ?? "1"})");
        }
        if (e.Args.Contains("capture"))
        {
            islandController.OpenQuickCapture("notes");
            Trace("capture opened: notes");
        }

        // 测试钩子:同步执行(与点击按钮完全等价)。之前的 BeginInvoke(ApplicationIdle)
        // 从未触发过,导致自动化测试全部假阴性——教训已记
        if (e.Args.Contains("toggle"))
        {
            Trace("toggle branch reached");
            main.ToggleTheme();
            Trace("toggle done");
        }

        if (e.Args.Contains("selftest"))
        {
            Trace("selftest branch reached");
            RunSelfTest();
        }

        if (e.Args.Contains("memtest"))
        {
            Trace("memtest branch reached");
            RunMemoryLeakTest(islandController);
        }

        // 测试钩子:WebDAV 客户端回环自测(本机伪装服务端,不出网),结果写 trace + toast
        if (e.Args.Contains("davtest"))
        {
            Trace("davtest branch reached");
            RunDavTest();
        }

        if (cloudNote is not null)
            Toast.Show(cloudNote, "☁️");
    }

    private static Mutex? _singleInstance;
    private static bool _saveFailureNotified;
    private static bool _restartAfterExit;

    // 岛底 ☁️ 按钮的一次性跳转令牌:MainWindow 置位后切到设置页,SettingsPage.Loaded 时消费
    public static bool PendingCloudSectionJump;

    // 恢复/改数据目录等场景:请求在 OnExit 释放单实例 Mutex 之后再拉起新实例(run-3 加固)
    public static void RequestRestart() => _restartAfterExit = true;

    // 保存失败一次性可见告警(审计修复):写库异常原被静默吞掉,防抖窗口内的更改丢失无任何信号
    public static void NotifySaveFailure(Exception ex)
    {
        WriteCrashLog(ex);
        if (_saveFailureNotified) return;
        _saveFailureNotified = true;
        try
        {
            System.Windows.MessageBox.Show("数据保存失败——本次的更改还在界面上,但尚未写入磁盘。\n\n" +
                ex.Message + "\n\n(再次失败将不再提示,详情见日志)", "工作台",
                System.Windows.MessageBoxButton.OK, System.Windows.MessageBoxImage.Warning);
        }
        catch { /* 通知本身失败不再放大问题 */ }
    }

    // ===== WebDAV 客户端回环自测(davtest):本机 TcpListener 伪装最小 WebDAV 服务,
    // 验证 PUT/GET/PROPFIND/MKCOL + Basic 认证 + 401 拒绝 + PROPFIND 解析,全程不出网 =====
    private static async void RunDavTest()
    {
        Trace("davtest: begin");

        // 内容加密往返(纯本地内存,不依赖回环网络;本机防护拦回环也不影响这组断言)
        try
        {
            var plain = System.Text.Encoding.UTF8.GetBytes("工作台云同步加密往返测试 payload-123");
            var enc = CloudSync.EncryptSnapshot(plain, "secret1");
            if (!enc.AsSpan(0, 4).SequenceEqual("WBE1"u8)) throw new Exception("加密容器缺 WBE1 魔数");
            var dec = CloudSync.DecryptSnapshot(enc, "secret1");
            if (!dec.AsSpan().SequenceEqual(plain)) throw new Exception("解密内容与原文不一致");
            var wrongRejected = false;
            try { CloudSync.DecryptSnapshot(enc, "wrong"); }
            catch (InvalidOperationException) { wrongRejected = true; }
            if (!wrongRejected) throw new Exception("错误加密密码未被拒绝");

            // 同步决策回归(run-3 审计修复):令牌与比较值同处服务器时钟域,服务器钟慢/快都不再误判。
            // 放在本地断言区:回环网络在本机被防护拦截,网络相关断言不可达,这两组是本机唯一可验证的回归
            var localNow = DateTimeOffset.UtcNow;
            if (CloudSync.DecidePull(localNow.AddHours(-1).AddMinutes(5), localNow.AddHours(-1), localNow, null)
                != CloudSync.StartupPullOutcome.Pulled)
                throw new Exception("服务器钟慢 1h 且远端确实前进 5min 时,应判定拉取(旧实现会被本地时钟误判跳过)");
            if (CloudSync.DecidePull(localNow, localNow, localNow, null) != CloudSync.StartupPullOutcome.None)
                throw new Exception("远端令牌未变时应跳过拉取");
            if (CloudSync.DecidePull(localNow.AddMinutes(5), localNow, localNow.AddMinutes(-10), localNow.AddMinutes(-1))
                != CloudSync.StartupPullOutcome.Conflict)
                throw new Exception("远端前进且本地也有改动时应判 Conflict 保守不覆盖");
            if (CloudSync.DecidePull(localNow.AddMinutes(5), localNow, localNow.AddMinutes(-10), null)
                != CloudSync.StartupPullOutcome.Pulled)
                throw new Exception("远端前进且本地无改动时应自动拉取");
            if (CloudSync.DecidePull(null, null, localNow, null) != CloudSync.StartupPullOutcome.NoRemote)
                throw new Exception("远端无文件应判 NoRemote");

            Trace("davtest local asserts PASS (crypto + sync-decision)");
        }
        catch (Exception ex)
        {
            Trace("davtest crypto FAIL: " + ex.Message);
            Toast.Show("云同步加密自测失败:" + ex.Message, "⚠️");
            return; // 加密层坏了就不必再测网络
        }

        var listener = new System.Net.Sockets.TcpListener(System.Net.IPAddress.Loopback, 0);
        try
        {
            listener.Start();
            var port = ((System.Net.IPEndPoint)listener.LocalEndpoint).Port;
            var store = new Dictionary<string, byte[]>(StringComparer.Ordinal);
            var dirs = new HashSet<string>(StringComparer.Ordinal) { "/dav/" };

            _ = Task.Run(async () =>
            {
                try
                {
                    while (true)
                    {
                        using var client = await listener.AcceptTcpClientAsync();
                        using var stream = client.GetStream();
                        var head = await ReadUntilAsync(stream, "\r\n\r\n");
                        if (head is null) return;
                        var lines = head.Split("\r\n");
                        var parts = lines[0].Split(' ');
                        if (parts.Length < 2) { WriteHttpResponse(stream, "400 Bad Request", null); return; }
                        var verb = parts[0];
                        var path = parts[1];
                        var contentLength = 0;
                        string? auth = null;
                        foreach (var line in lines.Skip(1))
                        {
                            var kv = line.Split(':', 2);
                            if (kv.Length != 2) continue;
                            if (kv[0].Trim().Equals("Content-Length", StringComparison.OrdinalIgnoreCase))
                                contentLength = int.Parse(kv[1].Trim());
                            if (kv[0].Trim().Equals("Authorization", StringComparison.OrdinalIgnoreCase))
                                auth = kv[1].Trim();
                        }
                        var body = await ReadExactlyAsync(stream, contentLength);

                        var expect = "Basic " + Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes("user01:pw01"));
                        if (auth != expect) { WriteHttpResponse(stream, "401 Unauthorized", null); continue; }

                        switch (verb)
                        {
                            case "MKCOL":
                                dirs.Add(path.TrimEnd('/') + "/");
                                WriteHttpResponse(stream, "201 Created", null);
                                break;
                            case "PUT":
                                store[path] = body;
                                WriteHttpResponse(stream, "201 Created", null);
                                break;
                            case "GET" when store.TryGetValue(path, out var data):
                                WriteHttpResponse(stream, "200 OK", data, "application/octet-stream");
                                break;
                            case "GET":
                                WriteHttpResponse(stream, "404 Not Found", null);
                                break;
                            case "PROPFIND":
                                var exists = dirs.Contains(path.TrimEnd('/') + "/") || store.ContainsKey(path);
                                if (!exists) { WriteHttpResponse(stream, "404 Not Found", null); break; }
                                var xml = "<D:multistatus><D:response><D:propstat><D:prop><D:getlastmodified>"
                                          + DateTime.UtcNow.ToString("R")
                                          + "</D:getlastmodified></D:prop></D:propstat></D:response></D:multistatus>";
                                WriteHttpResponse(stream, "207 Multi-Status", System.Text.Encoding.UTF8.GetBytes(xml), "application/xml");
                                break;
                            default:
                                WriteHttpResponse(stream, "405 Method Not Allowed", null);
                                break;
                        }
                    }
                }
                catch { /* listener.Stop() 后 Accept 抛异常 → 服务循环退出 */ }
            });

            var root = $"http://127.0.0.1:{port}/dav";
            var dbUrl = root + "/Workbench/workbench.db";
            // 真 SQLite 魔数开头 + 若干字节,顺带验证 PUT/GET 字节级一致
            var payload = new byte[] { 0x53, 0x51, 0x4C, 0x69, 0x74, 0x65, 0x66, 0x6F, 0x72, 0x6D, 0x61, 0x74, 0x20, 0x33, 0x00, 0x01, 0x02, 0x03 };

            var ok = new WebDavClient("user01", "pw01", null, TimeSpan.FromSeconds(4));
            if (await ok.StatAsync(dbUrl) is not null) throw new Exception("远端不存在时应返回 null");
            await ok.MkcolAsync(root + "/Workbench");
            await ok.PutAsync(dbUrl, payload);
            var st = await ok.StatAsync(dbUrl) ?? throw new Exception("PUT 后 PROPFIND 应命中");
            if (st.LastModified is null) throw new Exception("PROPFIND 未解析出 Last-Modified");
            var got = await ok.GetAsync(dbUrl) ?? throw new Exception("GET 返回 null");
            if (!got.AsSpan().SequenceEqual(payload)) throw new Exception("GET 内容与 PUT 不一致");

            var bad = new WebDavClient("user01", "wrong", null, TimeSpan.FromSeconds(4)); // 错误凭据应被 401 拒绝
            var rejected = false;
            try { await bad.StatAsync(dbUrl); }
            catch (System.Net.Http.HttpRequestException) { rejected = true; }
            if (!rejected) throw new Exception("错误凭据未被 401 拒绝");

            if (WebDavClient.ParseStat("<d:multistatus><d:getlastmodified>Wed, 11 Nov 2026 00:00:00 GMT</d:getlastmodified></d:multistatus>")?.LastModified is null)
                throw new Exception("ParseStat 未兼容 d: 命名空间前缀");

            listener.Stop();
            Trace("davtest PASS (loopback section)");
            Trace("davtest PASS");
            Toast.Show("WebDAV 客户端自测通过(回环)", "☁️");
        }
        catch (Exception ex)
        {
            Trace("davtest FAIL: " + ex.Message);
            // 实测(2026-11-12):本机防护在 WFP 层静默丢弃发往未签名进程监听端口的入站流量
            // (对照:关死端口立即拒绝、本端口静默超时),回环自测在这台机器上天然不可用;
            // 真实云端同步是纯出站连接,不受此限——引导用户用真实账号走「测试连接」验证
            var hint = ex is TaskCanceledException
                ? "回环监听被本机防护拦截(端口流量被静默丢弃),本机回环自测不可用;真实云端同步请填好账号后点「测试连接」验证"
                : ex.Message;
            Toast.Show("WebDAV 自测失败:" + hint, "⚠️");
        }
        finally
        {
            try { listener.Stop(); } catch { }
        }
    }

    private static async Task<string?> ReadUntilAsync(System.Net.Sockets.NetworkStream s, string marker)
    {
        var buf = new List<byte>();
        var mark = System.Text.Encoding.ASCII.GetBytes(marker);
        var chunk = new byte[1024];
        while (buf.Count < 64 * 1024)
        {
            var n = await s.ReadAsync(chunk);
            if (n == 0) return null;
            buf.AddRange(chunk.Take(n));
            if (buf.Count >= mark.Length && buf.TakeLast(mark.Length).SequenceEqual(mark))
                return System.Text.Encoding.ASCII.GetString(buf.Take(buf.Count - mark.Length).ToArray());
        }
        return null;
    }

    private static async Task<byte[]> ReadExactlyAsync(System.Net.Sockets.NetworkStream s, int count)
    {
        var data = new byte[count];
        var read = 0;
        while (read < count)
        {
            var n = await s.ReadAsync(data.AsMemory(read, count - read));
            if (n == 0) break;
            read += n;
        }
        return data;
    }

    private static void WriteHttpResponse(System.Net.Sockets.NetworkStream s, string status, byte[]? body, string contentType = "text/plain")
    {
        body ??= [];
        var head = $"HTTP/1.1 {status}\r\nContent-Type: {contentType}\r\nContent-Length: {body.Length}\r\nConnection: close\r\n\r\n";
        s.Write(System.Text.Encoding.ASCII.GetBytes(head));
        if (body.Length > 0) s.Write(body);
        s.Flush();
    }

    // ===== 内存泄漏自测:岛开合×50 + 弹窗开合×20,断言托管堆回基线、窗口数不变 =====
    private static void RunMemoryLeakTest(IslandController controller)
    {
        try
        {
            Trace("memtest: begin");
            var sw = System.Diagnostics.Stopwatch.StartNew();

            // 预热 3 轮:首轮的模板/字体缓存属于一次性分配,不计入泄漏基线
            for (var i = 0; i < 3; i++)
            {
                controller.EnterIslandMode(IslandEdge.Bottom);
                controller.ExitIslandMode();
            }
            long baseHeap = GcHeap();
            var baseWindows = Application.Current.Windows.Count;

            const int islandCycles = 50;
            for (var i = 0; i < islandCycles; i++)
            {
                controller.EnterIslandMode(IslandEdge.Bottom);
                controller.ExitIslandMode();
                // 让 UI 线程把窗口销毁的收尾消息处理完再进下一轮
                Application.Current.Dispatcher.Invoke(DispatcherPriority.Background, new Action(() => { }));
            }
            long afterIslandHeap = GcHeap();
            var afterIslandWindows = Application.Current.Windows.Count;

            const int stickyCycles = 20;
            for (var i = 0; i < stickyCycles; i++)
            {
                controller.OpenQuickCapture("notes"); // 开新置顶小窗(非模态)
                foreach (var w in Application.Current.Windows.OfType<StickyWindow>().ToList()) w.Close();
                Application.Current.Dispatcher.Invoke(DispatcherPriority.Background, new Action(() => { }));
            }
            long endHeap = GcHeap();
            var endWindows = Application.Current.Windows.Count;

            double islandDeltaMb = (afterIslandHeap - baseHeap) / 1024.0 / 1024;
            double popoutDeltaMb = (endHeap - afterIslandHeap) / 1024.0 / 1024;
            var pass = islandDeltaMb <= 10 && popoutDeltaMb <= 10
                && afterIslandWindows == baseWindows && endWindows == baseWindows;

            Trace($"memtest: island×{islandCycles} Δheap={islandDeltaMb:F2}MB, " +
                  $"windows {baseWindows}->{afterIslandWindows}; sticky×{stickyCycles} Δheap={popoutDeltaMb:F2}MB, " +
                  $"windows->{endWindows}; {sw.ElapsedMilliseconds}ms");
            Trace(pass ? "memtest: PASS" : "memtest: FAIL");
        }
        catch (Exception ex)
        {
            Trace($"memtest: EXCEPTION {ex.GetType().Name}: {ex.Message}");
        }
    }

    private static long GcHeap()
    {
        GC.Collect();
        GC.WaitForPendingFinalizers();
        GC.Collect();
        return GC.GetTotalMemory(true);
    }

    // ===== 功能自测:回收站流转 + 三格式导出,结果写 trace.log =====
    private static void RunSelfTest()
    {
        try
        {
            Trace("selftest: begin");
            var pass = true;

            // 1) 删除进回收站
            var todo = new TodoItem { Title = "自测条目" };
            Data.Todos.Insert(0, todo);
            int before = Data.Todos.Count;
            MoveToRecycle("Todo", todo);
            if (Data.Todos.Count != before - 1 || Data.RecycleBin.Count == 0)
            {
                pass = false;
                Trace($"selftest FAIL: 删除进回收站 (todos={Data.Todos.Count}/{before}, bin={Data.RecycleBin.Count})");
            }

            // 2) 恢复
            int binCount = Data.RecycleBin.Count;
            RestoreFromRecycle(Data.RecycleBin[0]);
            if (Data.Todos.Count != before || Data.RecycleBin.Count != binCount - 1)
            {
                pass = false;
                Trace($"selftest FAIL: 恢复 (todos={Data.Todos.Count}/{before}, bin={Data.RecycleBin.Count}/{binCount})");
            }
            Trace($"selftest: 回收站流转 {(pass ? "PASS" : "FAIL")}");

            // 3) 清理自测数据
            var leftovers = Data.Todos.Where(t => t.Title == "自测条目").ToList();
            foreach (var t in leftovers) Data.Todos.Remove(t);
            Persist();

            // 4) 三格式导出到数据目录 exports(审计修复:跟随 App.DataDir,不再固定写 exe 旁)
            var dir = Path.Combine(App.DataDir, "exports");
            Directory.CreateDirectory(dir);
            Exporter.ExportMarkdown(Path.Combine(dir, "test.md"), Data);
            Exporter.ExportHtml(Path.Combine(dir, "test.html"), Data);
            Exporter.ExportPdf(Path.Combine(dir, "test.pdf"), Data);
            foreach (var f in new[] { "test.md", "test.html", "test.pdf" })
            {
                var fp = Path.Combine(dir, f);
                Trace($"selftest: 导出 {f} {(File.Exists(fp) && new FileInfo(fp).Length > 0 ? "PASS" : "FAIL")} ({(File.Exists(fp) ? new FileInfo(fp).Length : 0)} B)");
            }

            // 5) 归档流转:归档 → 主列表过滤(VM 层判定)→ 恢复;卡片尺寸持久化(存储往返段断言)
            var note = new NoteItem { Content = "归档自测", CardWidth = 300 };
            Data.Notes.Insert(0, note);
            MoveToArchive(note);
            var archivedOk = note.Archived && note.ArchivedAt != null;
            RestoreFromArchive(note);
            var restoredOk = !note.Archived;
            Trace($"selftest: 归档流转 {(archivedOk && restoredOk ? "PASS" : "FAIL")}");

            // 6) 子任务:两个子任务完成一个 → 进度 1/2
            var task = new TaskItem { Title = "子任务自测" };
            task.SubTasks.Add(new SubTask { Title = "s1", IsDone = true });
            task.SubTasks.Add(new SubTask { Title = "s2" });
            var subOk = task.HasSubTasks && task.SubTasksProgress == "1/2";
            Data.Tasks.Insert(0, task);

            // 7) 标签池:自定义标签入池 + meta 持久化
            TagOptions.AddTag("自测标签X");
            Store.Save(Data);
            Store.Load();
            var tagOk = TagOptions.All.Contains("自测标签X");
            Trace($"selftest: 标签池 {(tagOk ? "PASS" : "FAIL")}");
            TagOptions.RemoveTag("自测标签X"); // 清理测试痕迹

            // 8) 存储往返:Save → Load,条目数/主题/子任务都必须一致
            var countBefore = Data.Notes.Count + Data.Tasks.Count + Data.Todos.Count + Data.RecycleBin.Count;
            Store.Save(Data);
            var reloaded = Store.Load();
            var countAfter = reloaded.Notes.Count + reloaded.Tasks.Count + reloaded.Todos.Count + reloaded.RecycleBin.Count;
            var themeOk = reloaded.Theme == Data.Theme;
            var reloadTask = reloaded.Tasks.FirstOrDefault(t => t.Title == "子任务自测");
            var subPersistOk = reloadTask != null && reloadTask.SubTasksProgress == "1/2";
            var reloadNote = reloaded.Notes.FirstOrDefault(n => n.Content == "归档自测");
            var widthPersistOk = reloadNote is { CardWidth: 300 };
            Trace($"selftest: 存储往返 {(countAfter == countBefore && themeOk && subPersistOk && widthPersistOk ? "PASS" : "FAIL")} " +
                  $"(条目 {countAfter}/{countBefore}, theme {reloaded.Theme}/{Data.Theme}, 子任务持久化 {(subPersistOk ? "OK" : "FAIL")}, 卡片尺寸 {(widthPersistOk ? "OK" : "FAIL")})");

            // 清理自测数据
            Data.Notes.Remove(note);
            Data.Tasks.Remove(task);
            Persist();

            Trace($"selftest: 完成, 总体 {(pass ? "PASS" : "FAIL")}");
        }
        catch (Exception ex)
        {
            Trace($"selftest EXCEPTION: {ex}");
        }
        finally
        {
            // 审计修复:即使中途抛异常也清理测试残留,防止被 1 秒防抖自动保存持久化进真实库
            try
            {
                foreach (var t in Data.Todos.Where(t => t.Title == "自测条目").ToList()) Data.Todos.Remove(t);
                foreach (var n in Data.Notes.Where(n => n.Content == "归档自测").ToList()) Data.Notes.Remove(n);
                foreach (var t in Data.Tasks.Where(t => t.Title == "子任务自测").ToList()) Data.Tasks.Remove(t);
                TagOptions.RemoveTag("自测标签X");
                Persist();
            }
            catch { /* 清理失败不掩盖原始结果 */ }
        }
    }

    // ===== 归档流转 =====
    public static void MoveToArchive(object item)
    {
        // 便签归档时同步关闭它的置顶小窗
        if (item is NoteItem archivedNote)
            CloseStickyFor(archivedNote);

        switch (item)
        {
            case NoteItem n: n.Archived = true; n.ArchivedAt = DateTime.Now; break;
            case TaskItem t: t.Archived = true; t.ArchivedAt = DateTime.Now; break;
            case TodoItem td: td.Archived = true; td.ArchivedAt = DateTime.Now; break;
        }
        Persist();
    }

    // 关闭某条便签的置顶小窗(删除/归档时调用,避免"卡片没了窗还在")
    private static void CloseStickyFor(NoteItem note)
    {
        foreach (var w in System.Windows.Application.Current.Windows
                     .OfType<StickyWindow>()
                     .Where(w => ReferenceEquals(w.DataContext, note)).ToList())
            w.Close();
    }

    public static void RestoreFromArchive(object item)
    {
        switch (item)
        {
            case NoteItem n: n.Archived = false; n.ArchivedAt = null; break;
            case TaskItem t: t.Archived = false; t.ArchivedAt = null; break;
            case TodoItem td: td.Archived = false; td.ArchivedAt = null; break;
        }
        Persist();
    }

    // ===== 回收站流转 =====
    public static void MoveToRecycle(string kind, object item)
    {
        // 便签被删除时,同步关闭它的置顶小窗(避免"卡片没了窗还在")
        if (item is NoteItem deletedNote)
            CloseStickyFor(deletedNote);

        var json = JsonSerializer.Serialize(item);
        var title = item switch
        {
            NoteItem n => string.IsNullOrWhiteSpace(n.Content) ? "(空便签)" : n.Content,
            TaskItem t => t.Title,
            TodoItem td => td.Title,
            _ => "",
        };
        if (title.Length > 40) title = title[..40];

        Data.RecycleBin.Insert(0, new RecycleItem { Kind = kind, Title = title, PayloadJson = json });
        switch (item)
        {
            case NoteItem n: Data.Notes.Remove(n); break;
            case TaskItem t: Data.Tasks.Remove(t); break;
            case TodoItem td: Data.Todos.Remove(td); break;
        }
        Persist();
    }

    public static void RestoreFromRecycle(RecycleItem r)
    {
        // 审计修复:整个恢复流程包 try/catch——反序列化失败只提示不炸 UI,
        // 白名单外的 Kind 抛异常走同一容错,条目保留在回收站而不是被 Remove 静默销毁
        try
        {
            switch (r.Kind)
            {
                case "Note":
                    Data.Notes.Insert(0, JsonSerializer.Deserialize<NoteItem>(r.PayloadJson) ?? new NoteItem());
                    break;
                case "Task":
                    Data.Tasks.Insert(0, JsonSerializer.Deserialize<TaskItem>(r.PayloadJson) ?? new TaskItem());
                    break;
                case "Todo":
                    Data.Todos.Insert(0, JsonSerializer.Deserialize<TodoItem>(r.PayloadJson) ?? new TodoItem());
                    break;
                default:
                    throw new InvalidOperationException($"未知的回收站类型「{r.Kind}」,条目已保留");
            }
            Data.RecycleBin.Remove(r);
        }
        catch (Exception ex)
        {
            WriteCrashLog(ex);
            Dialog.Info("恢复失败", "条目已保留在回收站,未做任何改动。\n\n" + ex.Message);
            return;
        }
        Persist();
    }

    protected override void OnExit(ExitEventArgs e)
    {
        SaveTimer.Stop();
        Persist(); // 退出前把防抖窗口里的最后改动落盘
        try { CloudSync.PushOnExit(CloudSync.LoadConfig()); } // 退出自动上传(内部限时 12s,失败只记日志不拦退出)
        catch (Exception ex) { Trace("cloud push on exit failed: " + ex.Message); }
        _singleInstance?.Dispose(); // 释放单实例守卫,允许下一次启动
        // run-3 加固:恢复/改数据目录请求的重启延迟到此——Mutex 已释放,新实例不会撞"已在运行中"
        if (_restartAfterExit)
        {
            try
            {
                var exe = Environment.ProcessPath
                    ?? throw new InvalidOperationException("无法确定 exe 路径");
                System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo
                {
                    FileName = exe,
                    UseShellExecute = true,
                });
            }
            catch (Exception ex) { Trace("restart after exit failed: " + ex.Message); }
        }
        base.OnExit(e);
    }

    // ===== 自动保存:集合增删 / 条目属性变化(打字、勾选、改状态)→ 防抖 1 秒落盘 =====
    private static void HookAutoSave(WorkbenchData d)
    {
        HookCollection(d.Notes);
        HookCollection(d.Tasks);
        HookCollection(d.Todos);
        HookCollection(d.RecycleBin);
    }

    private static void HookCollection<T>(System.Collections.ObjectModel.ObservableCollection<T> list)
    {
        list.CollectionChanged += (_, e) =>
        {
            ScheduleSave();
            if (e.NewItems != null)
                foreach (var item in e.NewItems)
                    if (item is ObservableObject oo) oo.PropertyChanged += OnItemChanged;
            if (e.OldItems != null)
                foreach (var item in e.OldItems)
                    if (item is ObservableObject oo) oo.PropertyChanged -= OnItemChanged;
        };
        foreach (var item in list)
            if (item is ObservableObject oo) oo.PropertyChanged += OnItemChanged;
    }

    private static void OnItemChanged(object? sender, PropertyChangedEventArgs e) => ScheduleSave();

    private static void ScheduleSave()
    {
        SaveTimer.Stop();
        SaveTimer.Start();
    }

    // 骨架采用"操作后手动保存";现在另有自动保存双保险。
    // 保存前顺手收集标签:任何地方用了新标签,一次保存后就进下拉池
    public static void Persist()
    {
        CollectTags();
        Store.Save(Data);
    }

    private static void CollectTags()
    {
        foreach (var t in Data.Tasks)
        {
            TagOptions.AddTag(t.Tag);
            foreach (var s in t.SubTasks)
                TagOptions.AddTag(s.Tag);
        }
    }

    // ===== 主题切换 =====
    // 结论(实测三轮):控件模板颜色是实例化时静态解析的,手动换字典(ThemesDictionary/URI 都试过)
    // 运行时不刷新;只有官方 ApplicationThemeManager.Apply 会驱动全量刷新。
    // 之前怀疑它导致闪退,黑匣子证明它没崩过(那次弹窗是写文件失败)。
    // 关键:必须显式传 WindowBackdropType.None——默认的 Mica 才是 Win10 上的真正高危项。
    public static void ApplyTheme(string themeName)
    {
        var theme = Enum.Parse<ApplicationTheme>(themeName);
        ApplicationThemeManager.Apply(theme, WindowBackdropType.None, true);
    }

    // 黑匣子:异常写 %APPDATA%\Workbench\crash.log,供排查
    public static void WriteCrashLog(Exception ex)
        => Trace($"EXCEPTION {ex}");

    // 分步追踪:关键路径每一步都留痕。双路写:exe 同目录 + %APPDATA%,对比哪条路被拦
    public static void Trace(string message)
    {
        var line = $"[{DateTime.Now:HH:mm:ss.fff}] {message}\r\n";
        try
        {
            WriteTrace(Path.Combine(AppContext.BaseDirectory, "trace.log"), line);
        }
        catch { /* 单路失败不影响另一路 */ }
        try
        {
            var dir = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), "Workbench");
            Directory.CreateDirectory(dir);
            WriteTrace(Path.Combine(dir, "trace.log"), line);
        }
        catch { /* 同上 */ }
    }

    private static int _traceWrites;

    private static void WriteTrace(string path, string line)
    {
        // 每 200 次写入查一次大小,超过 2MB 轮转成 .old.log(日志无上限增长也是一种泄漏)
        if (++_traceWrites % 200 == 1 && File.Exists(path)
            && new FileInfo(path).Length > 2 * 1024 * 1024)
        {
            File.Move(path, Path.ChangeExtension(path, ".old.log"), overwrite: true);
        }
        File.AppendAllText(path, line);
    }
}
