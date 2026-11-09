using System.IO;
using System.Text.Json;

namespace Workbench.Services;

// 轻量用户偏好:存 Data\prefs.json(本机防护拦截未签名进程写 HKCU,一切持久化走文件)。
// 目前只存"点 ✕ 关闭窗口时"的行为:ask=每次询问 / minimize=最小化到托盘 / exit=直接退出
public static class UserPrefs
{
    private static string PrefsPath => Path.Combine(App.DataDir, "prefs.json");

    public static string GetCloseAction()
    {
        try
        {
            if (!File.Exists(PrefsPath)) return "ask";
            using var doc = JsonDocument.Parse(File.ReadAllText(PrefsPath));
            return doc.RootElement.TryGetProperty("closeAction", out var v) && v.ValueKind == JsonValueKind.String
                ? v.GetString() ?? "ask"
                : "ask";
        }
        catch
        {
            return "ask";
        }
    }

    public static void SetCloseAction(string action)
    {
        try
        {
            Directory.CreateDirectory(App.DataDir);
            File.WriteAllText(PrefsPath, JsonSerializer.Serialize(new { closeAction = action }));
        }
        catch
        {
            // 存不进去不影响功能,下次关闭时再问
        }
    }
}
