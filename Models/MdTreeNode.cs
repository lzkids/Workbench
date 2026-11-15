using System.Collections.ObjectModel;

namespace Workbench.Models;

// MD 文档树节点(编辑窗侧栏 TreeView 视图模型):包一层 MdDoc 提供子级集合与选中/展开状态。
// XAML 的 DataType 不能用嵌套类,故为顶层类;Doc.Title 的 INPC 由模板直接绑定刷新
public class MdTreeNode : ObservableObject
{
    public MdTreeNode(MdDoc doc) { Doc = doc; }

    public MdDoc Doc { get; }

    public ObservableCollection<MdTreeNode> Children { get; } = new();

    private bool _isExpanded;
    public bool IsExpanded { get => _isExpanded; set => SetProperty(ref _isExpanded, value); }

    private bool _isSelected;
    public bool IsSelected { get => _isSelected; set => SetProperty(ref _isSelected, value); }
}
