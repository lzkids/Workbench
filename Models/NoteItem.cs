namespace Workbench.Models;

public class NoteItem : ObservableObject
{
    private string _content = "";

    public string Id { get; set; } = Guid.NewGuid().ToString("N");
    public string Content { get => _content; set => SetProperty(ref _content, value); }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    // 归档:true = 已移入归档页(不在便签页显示)
    public bool Archived { get; set; }
    public DateTime? ArchivedAt { get; set; }

    // 卡片配色:NoteColors 里的 Key(老数据缺省 = yellow)
    private string _colorKey = "yellow";
    public string ColorKey { get => _colorKey; set => SetProperty(ref _colorKey, value); }

    // 卡片尺寸(右下角拖拽调整,持久化)
    private double _cardWidth = 230;
    public double CardWidth
    {
        get => _cardWidth;
        set => SetProperty(ref _cardWidth, Math.Clamp(value, 180, 600));
    }

    private double _cardHeight = 150;
    public double CardHeight
    {
        get => _cardHeight;
        set => SetProperty(ref _cardHeight, Math.Clamp(value, 120, 420));
    }
}
