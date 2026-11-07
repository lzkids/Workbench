using System.Windows;
using Wpf.Ui.Controls;

namespace Workbench;

public partial class MainWindow : FluentWindow
{
    public MainWindow()
    {
        InitializeComponent();
        UpdateThemeButton();
    }

    // 深浅色切换:防御式——失败弹提示、真正回滚,绝不闪退也不留"半应用"状态
    public void ToggleTheme()
    {
        var previous = App.Data.Theme;
        try
        {
            var next = previous == "Dark" ? "Light" : "Dark";
            App.Trace($"toggle {previous} -> {next}: begin");
            App.ApplyTheme(next);
            App.Trace("toggle: apply ok");
            App.Data.Theme = next;
            App.Persist();
            App.Trace("toggle: persist ok");
            UpdateThemeButton();
        }
        catch (Exception ex)
        {
            App.Trace($"toggle FAILED: {ex.GetType().Name}: {ex.Message}");
            App.WriteCrashLog(ex);
            App.ApplyTheme(previous); // 真正回滚
            UpdateThemeButton();
            System.Windows.MessageBox.Show(this, $"切换主题失败,已恢复原状。\n\n{ex.Message}", "工作台",
                System.Windows.MessageBoxButton.OK, System.Windows.MessageBoxImage.Warning);
        }
    }

    private void ThemeToggle_Click(object sender, RoutedEventArgs e) => ToggleTheme();

    private void UpdateThemeButton()
        => ThemeToggle.Content = App.Data.Theme == "Dark" ? "☀️ 浅色模式" : "🌙 深色模式";
}
