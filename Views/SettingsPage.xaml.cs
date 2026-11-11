using System.Windows;
using System.Windows.Controls;

namespace Workbench.Views;

public partial class SettingsPage : UserControl
{
    public SettingsPage()
    {
        InitializeComponent();
        // 页面拿到 VM(已从配置加载密码)后,先把它回填进密码框
        DataContextChanged += (_, _) =>
        {
            PullCloudPasswordIntoBox();
            PullCloudCryptoIntoBox();
        };
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
