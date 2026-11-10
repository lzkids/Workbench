namespace Workbench.Models;

// 便签配色表:Key 持久化进 NoteItem.ColorKey,背景/字色/描边都由这里统一给出,
// 新增颜色只改这一处(XAML 通过 NoteColorBrushConverter 读取)
public sealed record NoteColor(
    string Key, string Name,
    string Background, string Foreground, string Accent, string Border);

public static class NoteColors
{
    public static readonly IReadOnlyList<NoteColor> All = new[]
    {
        new NoteColor("yellow", "黄", "#FEF3A2", "#3D3617", "#8A7B2E", "#EAD98A"),
        new NoteColor("green",  "绿", "#DDEEC4", "#2F4A1E", "#5F7A44", "#C6DCA8"),
        new NoteColor("blue",   "蓝", "#CFE4F7", "#163A52", "#4A7C9B", "#B4D2ED"),
        new NoteColor("pink",   "粉", "#FAD7DF", "#5A2333", "#A2657A", "#EFBFCB"),
        new NoteColor("purple", "紫", "#E3D8F6", "#3B2A5A", "#7C6AA0", "#CFC0EC"),
        new NoteColor("orange", "橙", "#FFDFC0", "#5A3413", "#A9763F", "#F5C99F"),
        new NoteColor("gray",   "灰", "#E7E7E7", "#2E2E2E", "#7A7A7A", "#D2D2D2"),
        new NoteColor("dark",   "深色", "#2F3437", "#EDEDED", "#A9B2B7", "#202426"),
    };

    // 老数据没有 ColorKey → 落到第一项(黄),不会因为新增字段炸掉
    public static NoteColor Of(string? key)
        => All.FirstOrDefault(c => string.Equals(c.Key, key, StringComparison.Ordinal)) ?? All[0];
}
