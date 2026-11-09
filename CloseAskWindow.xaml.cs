using System.Windows;
using Wpf.Ui.Controls;

namespace Workbench;

// 点 ✕ 关闭主窗口时的询问弹窗:最小化到托盘 / 直接退出,可记住选择
public partial class CloseAskWindow : FluentWindow
{
    /// 用户的选择:"minimize" 或 "exit"
    public string Choice { get; private set; } = "exit";

    /// 是否记住选择(写入 UserPrefs)
    public bool Remember { get; private set; }

    public CloseAskWindow()
    {
        InitializeComponent();
    }

    private void Minimize_Click(object sender, RoutedEventArgs e)
        => Finish("minimize");

    private void Exit_Click(object sender, RoutedEventArgs e)
        => Finish("exit");

    private void Finish(string choice)
    {
        Choice = choice;
        Remember = RememberBox.IsChecked == true;
        DialogResult = true;
    }
}
