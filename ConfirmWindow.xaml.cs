using System.Windows;
using Wpf.Ui.Controls;

namespace Workbench;

public partial class ConfirmWindow : FluentWindow
{
    private readonly bool _okOnly;

    public ConfirmWindow(string title, string message, bool warning, bool okOnly)
    {
        InitializeComponent();
        Title = title;
        IconText.Text = warning ? "⚠️" : "ℹ️";
        MessageText.Text = message;
        _okOnly = okOnly;
        if (okOnly)
            CancelButton.Visibility = Visibility.Collapsed;
    }

    private void Ok_Click(object sender, RoutedEventArgs e) => DialogResult = true;
}
