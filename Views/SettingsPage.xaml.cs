using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Threading;

namespace Workbench.Views;

public partial class SettingsPage : UserControl
{
    // 岛底 ☁️ 跳转:MainWindow 切到设置页后按此定位当前实例(已在本页时直接调 RevealCloudSection)
    public static SettingsPage? Current;

    private DispatcherTimer? _cloudHighlightTimer;

    public SettingsPage()
    {
        InitializeComponent();
        // 页面拿到 VM(已从配置加载密码)后,先把它回填进密码框
        DataContextChanged += (_, _) =>
        {
            PullCloudPasswordIntoBox();
            PullCloudCryptoIntoBox();
        };
        Loaded += (_, _) =>
        {
            Current = this;
            if (App.PendingCloudSectionJump)
            {
                App.PendingCloudSectionJump = false;
                RevealCloudSection();
            }
        };
        Unloaded += (_, _) => { if (Current == this) Current = null; };
    }

    // 滚动到云同步卡片并蓝色描边 3 秒提示位置(岛底 ☁️ 入口)
    public void RevealCloudSection()
    {
        CloudSection.BringIntoView();
        CloudSection.BorderBrush = System.Windows.Media.Brushes.DodgerBlue;
        _cloudHighlightTimer ??= new DispatcherTimer { Interval = TimeSpan.FromSeconds(3) };
        _cloudHighlightTimer.Tick += CloudHighlight_Tick;
        _cloudHighlightTimer.Stop();
        _cloudHighlightTimer.Start();
    }

    private void CloudHighlight_Tick(object? sender, EventArgs e)
    {
        if (_cloudHighlightTimer is not null) _cloudHighlightTimer.Stop();
        CloudSection.BorderBrush = System.Windows.Media.Brushes.Transparent;
    }

    // 原生 PasswordBox 的 Password 不是依赖属性,XAML 绑不了 VM——代码后台手动双向同步
    private void CloudPassword_Changed(object sender, RoutedEventArgs e) => PushCloudPasswordToVm();

    private void CloudCrypto_Changed(object sender, RoutedEventArgs e) => PushCloudCryptoToVm();

    private void PushCloudPasswordToVm()
    {
        if (DataContext is ViewModels.SettingsViewModel vm)
            vm.CloudPassword = CloudPasswordBox.Password;
    }

    private void PullCloudPasswordIntoBox()
    {
        if (DataContext is ViewModels.SettingsViewModel vm)
            CloudPasswordBox.Password = vm.CloudPassword;
    }

    private void PushCloudCryptoToVm()
    {
        if (DataContext is ViewModels.SettingsViewModel vm)
            vm.CloudPassphrase = CloudCryptoBox.Password;
    }

    private void PullCloudCryptoIntoBox()
    {
        if (DataContext is ViewModels.SettingsViewModel vm)
            CloudCryptoBox.Password = vm.CloudPassphrase;
    }
}
