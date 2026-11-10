using System.Windows;
using System.Windows.Input;
using System.Windows.Controls;
using Wpf.Ui.Controls;
using Workbench.Models;

namespace Workbench;

// 快速待办窗(灵动岛入口):标题 + 优先级 + 到期,添加即入库并关窗
public partial class QuickTodoWindow : FluentWindow
{
    /// 添加成功后的成品待办(控制器取出插入集合)
    public TodoItem? Result { get; private set; }

    public QuickTodoWindow()
    {
        InitializeComponent();
        TitleInput.Focus();
    }

    private void Add_Click(object sender, RoutedEventArgs e) => Finish();

    private void TitleInput_KeyDown(object sender, KeyEventArgs e)
    {
        if (e.Key == Key.Enter) Finish();
    }

    private void Finish()
    {
        var title = TitleInput.Text.Trim();
        if (title.Length == 0)
        {
            Dialog.Info("内容为空", "请先填写待办内容。");
            return;
        }
        Result = new TodoItem
        {
            Title = title,
            Priority = (PriorityBox.SelectedItem as ComboBoxItem)?.Content as string ?? "普通",
            DueDate = DueBox.SelectedDate,
        };
        DialogResult = true;
    }
}
