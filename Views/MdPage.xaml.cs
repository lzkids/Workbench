using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using Workbench.Models;

namespace Workbench.Views;

public partial class MdPage : UserControl
{
    public MdPage()
    {
        InitializeComponent();
    }

    // 点卡片任意处打开编辑窗(✕ 删除按钮自己处理点击,不会冒泡到这里触发打开)
    private void OpenDoc_Click(object sender, MouseButtonEventArgs e)
    {
        if (sender is FrameworkElement { DataContext: MdDoc doc })
        {
            var existing = System.Windows.Application.Current.Windows
                .OfType<MdDocWindow>()
                .FirstOrDefault(w => ReferenceEquals(w.DataContext, doc));
            if (existing != null) { existing.Activate(); return; }
            new MdDocWindow(doc).Show();
        }
    }
}
