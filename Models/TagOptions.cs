using System.Collections.ObjectModel;

namespace Workbench.Models;

// 标签池:任务/子任务的标签下拉都从这里取。
// 预设(全英文):Urgent(首要,红)、Error(红)、Warning(黄)、Done(绿);
// 用户自定义自动入池(Persist 时收集),可在设置页删除。
// 特定标签的颜色映射见 TagColors,徽章显示时走 TagForeConverter/TagBgConverter。
public static class TagOptions
{
    public static ObservableCollection<string> All { get; } = new() { "Urgent", "Error", "Warning", "Done" };

    // 旧名,启动时从用户标签池里清掉(用户点名删除/英文化)
    public static readonly string[] RetiredTags = { "工作", "学习", "生活", "紧急" };

    // 特定标签的颜色映射:(文字色, 浅底色);未映射的用默认紫
    private static readonly Dictionary<string, (string Fg, string Bg)> TagColors = new()
    {
        ["Urgent"] = ("#DC2626", "#FDE7E7"),
        ["Error"] = ("#DC2626", "#FDE7E7"),
        ["Warning"] = ("#B45309", "#FCF0DD"),
        ["Done"] = ("#16A34A", "#E3F4E8"),
    };

    public static string ForeColorOf(string? tag)
        => tag != null && TagColors.TryGetValue(tag, out var c) ? c.Fg : "#7C3AED";

    public static string BgColorOf(string? tag)
        => tag != null && TagColors.TryGetValue(tag, out var c) ? c.Bg : "#F3E8FF";

    // 返回 true = 新增了标签(false = 空或已存在)
    public static bool AddTag(string? tag)
    {
        tag = tag?.Trim();
        if (string.IsNullOrEmpty(tag) || All.Contains(tag)) return false;
        All.Add(tag);
        return true;
    }

    public static void RemoveTag(string tag) => All.Remove(tag);

    // 从持久化恢复(先清空再填,保持引用不变)
    public static void LoadFrom(IEnumerable<string> tags)
    {
        All.Clear();
        foreach (var t in tags) All.Add(t);
    }
}
