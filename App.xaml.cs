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

        // 可选启动参数:0-6 选初始页;"toggle" 自动切主题;"selftest" 跑功能自测(自动化验证用)
        int page = 0;
        if (e.Args.Length > 0 && int.TryParse(e.Args[0], out var p) && p is >= 0 and <= 6) page = p;
        var main = new MainWindow { DataContext = new MainViewModel(page) };
        Trace("window constructed");
        main.Show();
        Trace("window shown");

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

            // 4) 三格式导出到 exe 旁 Data\exports\
            var dir = Path.Combine(AppContext.BaseDirectory, "Data", "exports");
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
        }
        Data.RecycleBin.Remove(r);
        Persist();
    }

    protected override void OnExit(ExitEventArgs e)
    {
        SaveTimer.Stop();
        Persist(); // 退出前把防抖窗口里的最后改动落盘
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
            File.AppendAllText(Path.Combine(AppContext.BaseDirectory, "trace.log"), line);
        }
        catch { /* 单路失败不影响另一路 */ }
        try
        {
            var dir = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), "Workbench");
            Directory.CreateDirectory(dir);
            File.AppendAllText(Path.Combine(dir, "trace.log"), line);
        }
        catch { /* 同上 */ }
    }
}
