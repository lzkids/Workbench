namespace Workbench.Models;

// 回收站条目:被删除内容的"封存"——原对象整体序列化成 JSON 存着,恢复时还原
public class RecycleItem
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N");
    // 来源类型:Note / Task / Todo
    public string Kind { get; set; } = "";
    // 列表显示用的短标题
    public string Title { get; set; } = "";
    // 原对象的 JSON(恢复时反序列化回对应集合)
    public string PayloadJson { get; set; } = "";
    public DateTime DeletedAt { get; set; } = DateTime.Now;
}
