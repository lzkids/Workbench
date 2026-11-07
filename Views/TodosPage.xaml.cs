using System.Windows;
using System.Windows.Controls;
using Workbench.ViewModels;

namespace Workbench.Views;

public partial class TodosPage : UserControl
{
    public TodosPage()
    {
        InitializeComponent();
    }

    // 勾选/取消:落盘 + 重排序(完成的自动沉底)
    private void TodoDone_Changed(object sender, RoutedEventArgs e)
    {
        App.Persist();
        (DataContext as TodosViewModel)?.RefreshSort();
    }
}
