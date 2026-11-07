using Microsoft.Win32;

namespace Workbench.Services;

// 开机自启:写 HKCU 注册表 Run 键(无需管理员)。便携 exe 直接注册自身完整路径
public static class AutoStart
{
    private const string RunKey = @"Software\Microsoft\Windows\CurrentVersion\Run";
    private const string ValueName = "Workbench";

    public static bool IsEnabled()
    {
        try
        {
            using var key = Registry.CurrentUser.OpenSubKey(RunKey);
            return key?.GetValue(ValueName) is string v
                && v.Contains(AppContext.BaseDirectory.TrimEnd('\\'), StringComparison.OrdinalIgnoreCase);
        }
        catch
        {
            return false;
        }
    }

    public static void Enable()
    {
        using var key = Registry.CurrentUser.CreateSubKey(RunKey);
        var exe = Environment.ProcessPath
            ?? throw new InvalidOperationException("无法确定 exe 路径");
        key.SetValue(ValueName, $"\"{exe}\"");
    }

    public static void Disable()
    {
        using var key = Registry.CurrentUser.OpenSubKey(RunKey, true);
        key?.DeleteValue(ValueName, false);
    }
}
