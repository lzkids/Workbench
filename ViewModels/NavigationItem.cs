using Workbench.Models;

namespace Workbench.ViewModels;

// 侧边导航的一项:Glyph 是 emoji,Page 是该页的 ViewModel(内容区按它的类型映射到对应页面)
public class NavigationItem
{
    public string Glyph { get; init; } = "";
    public string Title { get; init; } = "";
    public ObservableObject Page { get; init; } = null!;
}
