using Microsoft.Win32;
using System.IO;

namespace Workbench.Services;

// 轻量应用设置:存注册表 HKCU(不随数据目录走,否则改目录时自举困难)。
// 目前只存"数据目录"一项;为空 = 使用默认(exe 旁 Data)。
public static class AppSettings
{
    private const string Key = @"Software\Workbench";

    public static string? GetDataDir()
    {
        try
        {
            using var k = Registry.CurrentUser.OpenSubKey(Key);
            var v = k?.GetValue("DataDir") as string;
            // 审计加固:该单值重定向全部数据 sink,归一化校验,盘根/非法路径回退默认
            if (string.IsNullOrWhiteSpace(v)) return null;
            try { v = Path.GetFullPath(v); } catch { return null; }
            var root = Path.GetPathRoot(v)?.TrimEnd('\\');
            return string.IsNullOrEmpty(root) || v.TrimEnd('\\').Equals(root, StringComparison.OrdinalIgnoreCase)
                ? null
                : v;
        }
        catch
        {
            return null;
        }
    }

    public static void SetDataDir(string? dir)
    {
        using var k = Registry.CurrentUser.CreateSubKey(Key);
        if (string.IsNullOrWhiteSpace(dir))
            k.DeleteValue("DataDir", false); // 删除 = 恢复默认
        else
            k.SetValue("DataDir", dir);
    }

    // 导出默认文件夹(空 = 用 Data\exports)
    public static string? GetExportDir()
    {
        try
        {
            using var k = Registry.CurrentUser.OpenSubKey(Key);
            var v = k?.GetValue("ExportDir") as string;
            return string.IsNullOrWhiteSpace(v) ? null : v;
        }
        catch
        {
            return null;
        }
    }

    public static void SetExportDir(string? dir)
    {
        using var k = Registry.CurrentUser.CreateSubKey(Key);
        if (string.IsNullOrWhiteSpace(dir))
            k.DeleteValue("ExportDir", false);
        else
            k.SetValue("ExportDir", dir);
    }
}
