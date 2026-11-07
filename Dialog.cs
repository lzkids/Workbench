using System.Windows;

namespace Workbench;

// 统一风格弹窗:替换原生 MessageBox(老白框与 Fluent 界面不搭)
public static class Dialog
{
    /// 确认框:返回 true = 用户点了确定
    public static bool Confirm(string title, string message)
    {
        var win = new ConfirmWindow(title, message, warning: true, okOnly: false);
        if (Application.Current.MainWindow is { } main && main != win)
            win.Owner = main;
        return win.ShowDialog() == true;
    }

    /// 信息提示:只有确定按钮
    public static void Info(string title, string message)
    {
        var win = new ConfirmWindow(title, message, warning: false, okOnly: true);
        if (Application.Current.MainWindow is { } main && main != win)
            win.Owner = main;
        win.ShowDialog();
    }
}
