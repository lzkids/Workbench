namespace Workbench.Models;

// MD 文档:独立的 Markdown 文档(区别于便签的随手小条),Typora 式编辑,置顶小窗同款 WebView2 渲染管线。
// 列表标题从内容推导(首个 # 标题行,否则首个非空行前 40 字,兜底「无标题文档」),存库避免列表反复重算
public class MdDoc : ObservableObject
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N");

    private string _content = "";
    public string Content { get => _content; set => SetProperty(ref _content, value); }

    private string _title = "";
    public string Title { get => _title; set => SetProperty(ref _title, value); }

    public DateTime CreatedAt { get; set; } = DateTime.Now;

    // 归档列已建(UI 暂无归档入口,留作后续)
    public bool Archived { get; set; }
    public DateTime? ArchivedAt { get; set; }

    public static string DeriveTitle(string? content)
    {
        if (!string.IsNullOrWhiteSpace(content))
        {
            foreach (var raw in content.Split('\n'))
            {
                var line = raw.TrimStart();
                if (line.Length == 0) continue;
                var h = line.StartsWith("#") ? line.TrimStart('#').Trim() : line.Trim();
                if (h.Length > 0) return h.Length > 40 ? h[..40] : h;
                break; // 首个非空行处理完即止
            }
        }
        return "无标题文档";
    }

    public void RefreshTitle() => Title = DeriveTitle(Content);
}
