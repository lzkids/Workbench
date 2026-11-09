using System.Collections.ObjectModel;
using System.Globalization;
using System.IO;
using System.Text.Json;
using Microsoft.Data.Sqlite;
using Workbench.Models;

namespace Workbench.Services;

// SQLite 持久层:单文件 workbench.db,目录可配置(默认 exe 旁 Data,便携)。
// 策略:启动时读入内存模型(UI/VM 不感知存储);保存时事务内全量重写——
// 单机单用户的数据量下,全量重写 + 事务的可靠性和简单性都优于逐条 UPSERT。
public class SqliteStore : IDataStore
{
    private readonly string _dir;
    private readonly string _dbPath;

    // 上一代 JSON 存储(自动迁移一次后改名保留)
    private readonly string _legacyJson;
    private readonly string _legacyJsonDone;

    // 当前生效的数据目录(供设置页显示)
    public string DataDir => _dir;

    public SqliteStore(string? dataDir = null)
    {
        _dir = dataDir ?? Path.Combine(AppContext.BaseDirectory, "Data");
        _dbPath = Path.Combine(_dir, "workbench.db");
        _legacyJson = Path.Combine(_dir, "data.json");
        _legacyJsonDone = _legacyJson + ".migrated";
    }

    private string ConnString =>
        new SqliteConnectionStringBuilder { DataSource = _dbPath }.ToString();

    public WorkbenchData Load()
    {
        MigrateLegacyJson();
        var data = new WorkbenchData();

        Directory.CreateDirectory(_dir);
        using var conn = Open();
        EnsureSchema(conn);
        EnsureColumns(conn);

        using (var cmd = conn.CreateCommand())
        {
            cmd.CommandText = "SELECT id, content, created_at, archived, archived_at, card_width, card_height FROM notes";
            using var r = cmd.ExecuteReader();
            while (r.Read())
                data.Notes.Add(new NoteItem
                {
                    Id = r.GetString(0),
                    Content = r.IsDBNull(1) ? "" : r.GetString(1),
                    CreatedAt = GetDate(r, 2),
                    Archived = !r.IsDBNull(3) && r.GetInt64(3) != 0,
                    ArchivedAt = r.IsDBNull(4) ? null : GetDate(r, 4),
                    CardWidth = r.IsDBNull(5) ? 230 : r.GetDouble(5),
                    CardHeight = r.IsDBNull(6) ? 150 : r.GetDouble(6),
                });
        }

        using (var cmd = conn.CreateCommand())
        {
            cmd.CommandText = "SELECT id, title, content, status, created_at, updated_at, archived, archived_at, subtasks, tag FROM tasks";
            using var r = cmd.ExecuteReader();
            while (r.Read())
            {
                var subs = new List<SubTask>();
                if (!r.IsDBNull(8))
                {
                    try { subs = JsonSerializer.Deserialize<List<SubTask>>(r.GetString(8)) ?? new(); }
                    catch { /* 子任务列损坏就当没有 */ }
                }
                data.Tasks.Add(new TaskItem
                {
                    Id = r.GetString(0),
                    Title = r.IsDBNull(1) ? "" : r.GetString(1),
                    Content = r.IsDBNull(2) ? "" : r.GetString(2),
                    Status = r.IsDBNull(3) ? "待开始" : r.GetString(3),
                    CreatedAt = GetDate(r, 4),
                    UpdatedAt = GetDate(r, 5),
                    Archived = !r.IsDBNull(6) && r.GetInt64(6) != 0,
                    ArchivedAt = r.IsDBNull(7) ? null : GetDate(r, 7),
                    SubTasks = new ObservableCollection<SubTask>(subs),
                    Tag = r.IsDBNull(9) ? "" : r.GetString(9),
                });
            }
        }

        using (var cmd = conn.CreateCommand())
        {
            cmd.CommandText = "SELECT id, title, is_done, priority, due_date, created_at, archived, archived_at, completed_at FROM todos";
            using var r = cmd.ExecuteReader();
            while (r.Read())
            {
                var wasDone = !r.IsDBNull(2) && r.GetInt64(2) != 0;
                var todo = new TodoItem
                {
                    Id = r.GetString(0),
                    Title = r.IsDBNull(1) ? "" : r.GetString(1),
                    IsDone = wasDone,
                    Priority = r.IsDBNull(3) ? "普通" : r.GetString(3),
                    DueDate = r.IsDBNull(4) ? null : GetDate(r, 4),
                    CreatedAt = GetDate(r, 5),
                    Archived = !r.IsDBNull(6) && r.GetInt64(6) != 0,
                    ArchivedAt = r.IsDBNull(7) ? null : GetDate(r, 7),
                };
                // 库里的完成时间优先(IsDone setter 会盖成 Now,这里读回真实值)
                if (wasDone && !r.IsDBNull(8))
                    todo.CompletedAt = GetDate(r, 8);
                data.Todos.Add(todo);
            }
        }

        using (var cmd = conn.CreateCommand())
        {
            cmd.CommandText = "SELECT id, kind, title, payload, deleted_at FROM recycle";
            using var r = cmd.ExecuteReader();
            while (r.Read())
                data.RecycleBin.Add(new RecycleItem
                {
                    Id = r.GetString(0),
                    Kind = r.IsDBNull(1) ? "" : r.GetString(1),
                    Title = r.IsDBNull(2) ? "" : r.GetString(2),
                    PayloadJson = r.IsDBNull(3) ? "" : r.GetString(3),
                    DeletedAt = GetDate(r, 4),
                });
        }

        using (var cmd = conn.CreateCommand())
        {
            cmd.CommandText = "SELECT value FROM meta WHERE key = 'theme'";
            var v = cmd.ExecuteScalar() as string;
            if (!string.IsNullOrEmpty(v))
                data.Theme = v;
        }

        using (var cmd = conn.CreateCommand())
        {
            cmd.CommandText = "SELECT value FROM meta WHERE key = 'tags'";
            var v = cmd.ExecuteScalar() as string;
            if (!string.IsNullOrEmpty(v))
            {
                try { TagOptions.LoadFrom(JsonSerializer.Deserialize<List<string>>(v) ?? new List<string>()); }
                catch { /* 损坏忽略,保留当前池 */ }
            }
            // 一次性清理:用户点名删除/英文化的旧名;并保证四个核心标签在池里(幂等)
            foreach (var retired in TagOptions.RetiredTags)
                TagOptions.RemoveTag(retired);
            foreach (var core in new[] { "Urgent", "Error", "Warning", "Done" })
                TagOptions.AddTag(core);
        }

        // 旧标签名迁移:数据里打过的"紧急" → "Urgent"(重启后第一次保存固化)
        foreach (var t in data.Tasks)
        {
            if (t.Tag == "紧急") t.Tag = "Urgent";
            foreach (var s in t.SubTasks)
                if (s.Tag == "紧急") s.Tag = "Urgent";
        }

        // 完成的待办次日自动归档:今天勾完的留在列表划线,明天启动就进归档页
        foreach (var t in data.Todos)
            if (t.IsDone && t.CompletedAt.HasValue && t.CompletedAt.Value.Date < DateTime.Today)
                t.Archived = true;

        return data;
    }

    public void Save(WorkbenchData d)
    {
        try
        {
            Directory.CreateDirectory(_dir);
            using var conn = Open();
            EnsureSchema(conn);
            using var tx = conn.BeginTransaction();

            Exec(conn, tx, "DELETE FROM notes");
            foreach (var n in d.Notes)
                Exec(conn, tx,
                    "INSERT OR REPLACE INTO notes(id, content, created_at, archived, archived_at, card_width, card_height) " +
                    "VALUES($id, $content, $created, $archived, $archived_at, $w, $h)",
                    ("$id", n.Id), ("$content", n.Content), ("$created", Fmt(n.CreatedAt)),
                    ("$archived", n.Archived ? 1L : 0L),
                    ("$archived_at", n.ArchivedAt.HasValue ? Fmt(n.ArchivedAt.Value) : null),
                    ("$w", n.CardWidth), ("$h", n.CardHeight));

            Exec(conn, tx, "DELETE FROM tasks");
            foreach (var t in d.Tasks)
                Exec(conn, tx,
                    "INSERT OR REPLACE INTO tasks(id, title, content, status, created_at, updated_at, archived, archived_at, subtasks, tag) " +
                    "VALUES($id, $title, $content, $status, $created, $updated, $archived, $archived_at, $subtasks, $tag)",
                    ("$id", t.Id), ("$title", t.Title), ("$content", t.Content), ("$status", t.Status),
                    ("$created", Fmt(t.CreatedAt)), ("$updated", Fmt(t.UpdatedAt)),
                    ("$archived", t.Archived ? 1L : 0L),
                    ("$archived_at", t.ArchivedAt.HasValue ? Fmt(t.ArchivedAt.Value) : null),
                    ("$subtasks", JsonSerializer.Serialize(t.SubTasks)),
                    ("$tag", t.Tag));

            Exec(conn, tx, "DELETE FROM todos");
            foreach (var t in d.Todos)
                Exec(conn, tx,
                    "INSERT OR REPLACE INTO todos(id, title, is_done, priority, due_date, created_at, archived, archived_at, completed_at) " +
                    "VALUES($id, $title, $is_done, $priority, $due, $created, $archived, $archived_at, $completed)",
                    ("$id", t.Id), ("$title", t.Title), ("$is_done", t.IsDone ? 1L : 0L),
                    ("$priority", t.Priority),
                    ("$due", t.DueDate.HasValue ? Fmt(t.DueDate.Value) : null),
                    ("$created", Fmt(t.CreatedAt)),
                    ("$archived", t.Archived ? 1L : 0L),
                    ("$archived_at", t.ArchivedAt.HasValue ? Fmt(t.ArchivedAt.Value) : null),
                    ("$completed", t.CompletedAt.HasValue ? Fmt(t.CompletedAt.Value) : null));

            Exec(conn, tx, "DELETE FROM recycle");
            foreach (var r in d.RecycleBin)
                Exec(conn, tx,
                    "INSERT OR REPLACE INTO recycle(id, kind, title, payload, deleted_at) " +
                    "VALUES($id, $kind, $title, $payload, $deleted)",
                    ("$id", r.Id), ("$kind", r.Kind), ("$title", r.Title),
                    ("$payload", r.PayloadJson), ("$deleted", Fmt(r.DeletedAt)));

            Exec(conn, tx,
                "INSERT OR REPLACE INTO meta(key, value) VALUES('theme', $theme)",
                ("$theme", d.Theme));
            // 标签池跟着数据走(自定义标签持久化)
            Exec(conn, tx,
                "INSERT OR REPLACE INTO meta(key, value) VALUES('tags', $tags)",
                ("$tags", JsonSerializer.Serialize(TagOptions.All)));

            tx.Commit();
        }
        catch (Exception ex)
        {
            // 写库失败不上抛炸 UI:记日志、弹一次可见告警,数据留在内存,下次操作再写
            App.WriteCrashLog(ex);
            App.NotifySaveFailure(ex);
        }
    }

    // ===== 基础设施 =====

    private SqliteConnection Open()
    {
        var conn = new SqliteConnection(ConnString);
        conn.Open();
        return conn;
    }

    private static void EnsureSchema(SqliteConnection conn)
    {
        Exec(conn, null, """
            CREATE TABLE IF NOT EXISTS notes(
                id TEXT PRIMARY KEY, content TEXT, created_at TEXT);
            CREATE TABLE IF NOT EXISTS tasks(
                id TEXT PRIMARY KEY, title TEXT, content TEXT, status TEXT,
                created_at TEXT, updated_at TEXT);
            CREATE TABLE IF NOT EXISTS todos(
                id TEXT PRIMARY KEY, title TEXT, is_done INTEGER, priority TEXT,
                due_date TEXT, created_at TEXT);
            CREATE TABLE IF NOT EXISTS recycle(
                id TEXT PRIMARY KEY, kind TEXT, title TEXT, payload TEXT, deleted_at TEXT);
            CREATE TABLE IF NOT EXISTS meta(
                key TEXT PRIMARY KEY, value TEXT);
            """);
    }

    // 已存在旧库的列升级(新增列对老库不是自动的):缺哪列补哪列
    private static void EnsureColumns(SqliteConnection conn)
    {
        EnsureColumn(conn, "notes", "archived", "INTEGER");
        EnsureColumn(conn, "notes", "archived_at", "TEXT");
        EnsureColumn(conn, "notes", "card_width", "REAL");
        EnsureColumn(conn, "notes", "card_height", "REAL");
        EnsureColumn(conn, "tasks", "archived", "INTEGER");
        EnsureColumn(conn, "tasks", "archived_at", "TEXT");
        EnsureColumn(conn, "tasks", "subtasks", "TEXT");
        EnsureColumn(conn, "tasks", "tag", "TEXT");
        EnsureColumn(conn, "todos", "archived", "INTEGER");
        EnsureColumn(conn, "todos", "archived_at", "TEXT");
        EnsureColumn(conn, "todos", "completed_at", "TEXT");
    }

    private static void EnsureColumn(SqliteConnection conn, string table, string column, string ddlType)
    {
        var exists = false;
        using (var cmd = conn.CreateCommand())
        {
            cmd.CommandText = $"PRAGMA table_info({table})";
            using var r = cmd.ExecuteReader();
            while (r.Read())
                if (r.GetString(1) == column)
                {
                    exists = true;
                    break;
                }
        }
        if (!exists)
            Exec(conn, null, $"ALTER TABLE {table} ADD COLUMN {column} {ddlType}");
    }

    private static void Exec(SqliteConnection conn, SqliteTransaction? tx, string sql, params (string, object?)[] args)
    {
        using var cmd = conn.CreateCommand();
        cmd.Transaction = tx;
        cmd.CommandText = sql;
        foreach (var (name, value) in args)
            cmd.Parameters.AddWithValue(name, value ?? (object)DBNull.Value);
        cmd.ExecuteNonQuery();
    }

    // 日期列容错解析(审计加固):TryParse + 固定文化,坏串回退当前时间而不是炸掉整个 Load
    private static DateTime GetDate(SqliteDataReader r, int col)
        => r.IsDBNull(col) ? DateTime.Now
           : DateTime.TryParse(r.GetString(col), CultureInfo.InvariantCulture, DateTimeStyles.None, out var d) ? d
           : DateTime.Now;

    // "O" 往返格式:写入与读取在固定文化下互逆,不再受系统区域设置影响
    private static string Fmt(DateTime dt) => dt.ToString("O");

    // 上一代 JSON → SQLite 一次性迁移(成功后把 JSON 改名保留)
    private void MigrateLegacyJson()
    {
        try
        {
            if (!File.Exists(_legacyJson) || File.Exists(_dbPath)) return;

            var legacy = JsonSerializer.Deserialize<WorkbenchData>(File.ReadAllText(_legacyJson));
            if (legacy is null) return;

            // 复用 Save 的写库逻辑
            Save(legacy);
            File.Move(_legacyJson, _legacyJsonDone);
            App.Trace("sqlite: 旧 data.json 已迁移到 workbench.db");
        }
        catch (Exception ex)
        {
            App.WriteCrashLog(ex);
        }
    }
}
