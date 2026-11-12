using System;
using System.Threading.Tasks;
using System.Windows;
using Workbench.Models;
using Workbench.Services;

namespace Workbench.ViewModels;

// 云同步快捷按钮共享条:便签/归档/回收站三页顶部各放一组「☁️ 上传 / ⬇ 同步」,
// 命令与忙态逻辑只写这一份(与设置页同一套 CloudSync 调用与错误文案,不另起炉灶)
public class CloudSyncBar : ObservableObject
{
    // 两个按钮互斥:操作进行中禁用(绑定 IsEnabled)
    private bool _cloudBusy;
    public bool CloudIdle
    {
        get => !_cloudBusy;
        set => SetProperty(ref _cloudBusy, !value);
    }

    public RelayCommand CloudPushCommand { get; }
    public RelayCommand CloudSyncCommand { get; }

    public CloudSyncBar()
    {
        // 配置每次现读 webdav.json(设置页 800ms 防抖写盘,实例常驻所以离开页面后仍会落盘);
        // CloudSync 内部自带 _inFlight 互斥,与设置页/退出推送并发时抛"已有云同步操作在进行"
        CloudPushCommand = new RelayCommand(async _ => await PushAsync());
        CloudSyncCommand = new RelayCommand(async _ => await RestoreAsync());
    }

    // run-3 加固口径延续:http 明文传 Basic 凭据,给用户可见警告前缀(与设置页一致)
    private static string HttpWarning(CloudSync.Config c)
        => c.Url.StartsWith("http://", StringComparison.OrdinalIgnoreCase) ? "⚠ 未加密连接(http):" : "";

    private static CloudSync.Config? LoadConfigOrToast()
    {
        var cloud = CloudSync.LoadConfig();
        if (string.IsNullOrWhiteSpace(cloud.Url))
        {
            Toast.Show("尚未配置云同步,请到「设置 → 云同步」填写服务器地址", "☁️");
            return null;
        }
        return cloud;
    }

    private async Task PushAsync()
    {
        var cloud = LoadConfigOrToast();
        if (cloud is null) return;
        CloudIdle = false;
        try
        {
            await CloudSync.PushAsync(cloud);
            Toast.Show(HttpWarning(cloud) + "已上传到云端 ☁️", "☁️");
        }
        catch (Exception ex)
        {
            Toast.Show("上传失败:" + CloudSync.TranslateError(ex), "⚠️");
        }
        finally { CloudIdle = true; }
    }

    private async Task RestoreAsync()
    {
        var cloud = LoadConfigOrToast();
        if (cloud is null) return;
        if (!Dialog.Confirm("从云端同步",
                (HttpWarning(cloud).Length > 0 ? HttpWarning(cloud) + "\n\n" : "") +
                "将用云端数据覆盖本地数据(便签/任务/待办以云端为准)。\n\n当前本地数据会先备份到云端 workbench.db.bak,恢复错了还能找回。\n恢复在重启应用后生效。继续?"))
            return;
        CloudIdle = false;
        try
        {
            await CloudSync.RestoreNowAsync(cloud);
            // 与设置页同一路径:请求重启,OnExit 释放 Mutex 后再拉起新实例(旧实例退出推送最长占 12s)
            App.RequestRestart();
            Application.Current.Shutdown();
        }
        catch (Exception ex)
        {
            Toast.Show("同步失败:" + CloudSync.TranslateError(ex), "⚠️");
        }
        finally { CloudIdle = true; }
    }
}
