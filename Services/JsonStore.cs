using System.IO;
using System.Text.Encodings.Web;
using System.Text.Json;
using Workbench.Models;

namespace Workbench.Services;

// 上一代 JSON 存储(已被 SqliteStore 替代,保留作为参考实现);
// 两个类都实现 IDataStore,App 里换一行即完成切换——这就是存储层隔离的意义。
public class JsonStore : IDataStore
{
    // 数据目录:exe 旁 Data\(便携模式)。
    // 实测本机有防护软件按进程拦截"未签名程序写 %APPDATA%"(python 能写、本应用 Access denied),
    // exe 旁目录不受影响;数据跟着 exe 走,拷贝即备份。
    private static readonly string Dir = Path.Combine(AppContext.BaseDirectory, "Data");

    // 旧数据位置(此前版本用过)
    private static readonly string LegacyDir = Path.Combine(
        Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), "Workbench");

    private static readonly string FilePath = Path.Combine(Dir, "data.json");

    private static readonly JsonSerializerOptions Options = new()
    {
        WriteIndented = true,
        // 让中文按原样写入 JSON,而不是 \uXXXX 转义
        Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
    };

    // 云同步快照:参考实现直接读当前数据文件(Save 已是"临时文件+原子替换",文件恒一致)
    public byte[] SnapshotToBytes() => File.Exists(FilePath) ? File.ReadAllBytes(FilePath) : [];

    public WorkbenchData Load()
    {
        // 一次性迁移:旧 AppData 数据搬到新位置(只复制不删除)
        try
        {
            var legacy = Path.Combine(LegacyDir, "data.json");
            if (!File.Exists(FilePath) && File.Exists(legacy))
            {
                Directory.CreateDirectory(Dir);
                File.Copy(legacy, FilePath);
            }
        }
        catch
        {
            // 迁移失败就用新位置的现有数据
        }

        try
        {
            if (File.Exists(FilePath))
            {
                return JsonSerializer.Deserialize<WorkbenchData>(File.ReadAllText(FilePath)) ?? new WorkbenchData();
            }
        }
        catch
        {
            // 文件损坏时当作空数据启动,避免应用起不来。以后可以加"损坏备份"逻辑
        }
        return new WorkbenchData();
    }

    // 保存:临时文件 + 原子替换 + 短重试。
    // 实测遇到过瞬时 "Access denied"(杀软实时防护对新建文件的短暂锁定),
    // 所以写盘失败绝不上抛炸 UI——记录到 crash.log,数据留在内存,下次操作再写。
    public bool Save(WorkbenchData data)
    {
        try
        {
            Directory.CreateDirectory(Dir);
            var tmp = FilePath + ".tmp";

            for (var attempt = 1; ; attempt++)
            {
                try
                {
                    File.WriteAllText(tmp, JsonSerializer.Serialize(data, Options));
                    if (File.Exists(FilePath))
                        // 第三参数留上一版备份:万一再被误覆盖/写坏,可从 data.prev 救回
                        File.Replace(tmp, FilePath, Path.Combine(Dir, "data.prev"));
                    else
                        File.Move(tmp, FilePath);
                    return true; // 成功
                }
                catch (IOException) when (attempt < 3)
                {
                    Thread.Sleep(150); // 瞬时锁:稍等重试
                }
                catch (Exception ex)
                {
                    App.WriteCrashLog(new IOException($"数据保存失败(尝试 {attempt} 次)", ex));
                    try { File.Delete(tmp); } catch { /* 清理失败就算了 */ }
                    return false;
                }
            }
        }
        catch (Exception ex)
        {
            App.WriteCrashLog(ex);
            return false;
        }
    }
}
