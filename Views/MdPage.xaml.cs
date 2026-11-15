using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using Workbench.Models;
using Workbench.ViewModels;

namespace Workbench.Views;

public partial class MdPage : UserControl
{
    public MdPage()
    {
        InitializeComponent();
        Loaded += Page_Loaded;
        Unloaded += Page_Unloaded;
    }

    // 页面到达时(重)挂集合事件并刷新树序行(VM 单例,导航往返增减订阅)
    private void Page_Loaded(object sender, RoutedEventArgs e)
    {
        if (DataContext is MdViewModel vm)
            vm.Attach();
    }

    // 点卡片任意处打开编辑窗(✕ 删除按钮自己处理点击,不会冒泡到这里触发打开);DataContext 是树序行包装
    private void OpenDoc_Click(object sender, MouseButtonEventArgs e)
    {
        if (sender is FrameworkElement { DataContext: MdDocRow row } && row.Doc is MdDoc doc)
        {
            var existing = System.Windows.Application.Current.Windows
                .OfType<MdDocWindow>()
                .FirstOrDefault(w => ReferenceEquals(w.DataContext, doc));
            if (existing != null) { existing.Activate(); return; }
            new MdDocWindow(doc).Show();
        }
    }

    // 页面导航离开时退订集合事件,防止 VM 被钉住(同 VM 再进页面时 ctor 会重新订阅)
    private void Page_Unloaded(object sender, RoutedEventArgs e)
    {
        if (DataContext is MdViewModel vm)
            vm.Detach();
    }
}
