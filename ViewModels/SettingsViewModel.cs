using System.IO;
using System.Net.Http;
using System.Windows;
using Workbench.Models;
using Workbench.Services;

namespace Workbench.ViewModels;

public class SettingsViewModel : ObservableObject
{
    // 标签管理:绑定的就是全局标签池,增删即时生效
    public System.Collections.ObjectModel.ObservableCollection<string> Tags => TagOptions.All;

    private string _newTagInput = "";
    public string NewTagInput { get => _newTagInput; set => SetProperty(ref _newTagInput, value); }

    public RelayCommand AddTagCommand { get; }
    public RelayCommand RemoveTagCommand { get; }

    private bool _autoStart = AutoStart.IsEnabled();
    public bool AutoStartEnabled
    {
        get => _autoStart;
        set
        {
            if (!SetProperty(ref _autoStart, value)) return;
            try
            {
                if (value) AutoStart.Enable();
                else AutoStart.Disable();
                Toast.Show(value ? "已开启开机自启" : "已关闭开机自启", "⚙️");
            }
            catch (Exception ex)
            {
                _autoStart = !value;                 // 失败回滚开关状态
                OnPropertyChanged(nameof(AutoStartEnabled));
                App.WriteCrashLog(ex);
                Toast.Show("自启设置失败,详情见日志", "⚠️");
            }
        }
    }

    // 数据位置:显示当前目录;更改 = 选目录 → 复制数据 → 重启生效
    public string CurrentDataDir => App.DataDir;

    // 关闭行为:ask=每次询问 / minimize=最小化到托盘 / exit=直接退出(存 Data\prefs.json)
    private string _closeAction = UserPrefs.GetCloseAction();
    public string CloseAction
    {
        get => _closeAction;
        set
        {
            if (SetProperty(ref _closeAction, value))
            {
                UserPrefs.SetCloseAction(value);
                OnPropertyChanged(nameof(CloseActionIsAsk));
                OnPropertyChanged(nameof(CloseActionIsMinimize));
                OnPropertyChanged(nameof(CloseActionIsExit));
            }
        }
    }

    public bool CloseActionIsAsk { get => _closeAction == "ask"; set { if (value) CloseAction = "ask"; } }
    public bool CloseActionIsMinimize { get => _closeAction == "minimize"; set { if (value) CloseAction = "minimize"; } }
    public bool CloseActionIsExit { get => _closeAction == "exit"; set { if (value) CloseAction = "exit"; } }

    // 导出默认文件夹:空 = Data\exports
    public string CurrentExportDir
        => AppSettings.GetExportDir() ?? System.IO.Path.Combine(App.DataDir, "exports");

    public RelayCommand ChangeExportDirCommand { get; }

    public RelayCommand ChangeDataDirCommand { get; }
    public RelayCommand ResetDataDirCommand { get; }

    public RelayCommand ExportMarkdownCommand { get; }
    public RelayCommand ExportHtmlCommand { get; }
    public RelayCommand ExportPdfCommand { get; }

    // ===== 云同步(WebDAV):只同步主数据库 workbench.db;凭据存 Data\webdav.json =====
    // run-3 加固:配置写盘防抖(每键入即写盘 → 800ms 静止后一次写),云命令执行前强制冲刷
    private readonly CloudSync.Config _cloud = CloudSync.LoadConfig();
    private bool _cloudBusy;
    private string _cloudStatus = "";
    private readonly System.Windows.Threading.DispatcherTimer _configSaveTimer =
        new() { Interval = TimeSpan.FromMilliseconds(800) };

    private void ScheduleCloudSave()
    {
        _configSaveTimer.Stop();
        _configSaveTimer.Start();
    }

    private void FlushCloudConfig()
    {
        _configSaveTimer.Stop();
        CloudSync.SaveConfig(_cloud);
    }

    public bool CloudEnabled
    {
        get => _cloud.Enabled;
        set { if (_cloud.Enabled != value) { _cloud.Enabled = value; ScheduleCloudSave(); OnPropertyChanged(); } }
    }

    public string CloudUrl
    {
        get => _cloud.Url;
        set { if (_cloud.Url != value) { _cloud.Url = value; ScheduleCloudSave(); OnPropertyChanged(); } }
    }

    public string CloudUsername
    {
        get => _cloud.Username;
        set { if (_cloud.Username != value) { _cloud.Username = value; ScheduleCloudSave(); OnPropertyChanged(); } }
    }

    // 由设置页代码后台从 PasswordBox 同步过来(Password 不是依赖属性,XAML 绑不了)
    public string CloudPassword
    {
        get => _cloud.Password;
        set { if (_cloud.Password != value) { _cloud.Password = value; ScheduleCloudSave(); OnPropertyChanged(); } }
    }

    // 内容加密:上传前 AES-256-GCM,云端只存密文;密码同步存本地配置(云端拿不到)
    public bool CloudEncrypt
    {
        get => _cloud.Encrypt;
        set { if (_cloud.Encrypt != value) { _cloud.Encrypt = value; ScheduleCloudSave(); OnPropertyChanged(); } }
    }

    public string CloudPassphrase
    {
        get => _cloud.Passphrase;
        set { if (_cloud.Passphrase != value) { _cloud.Passphrase = value; ScheduleCloudSave(); OnPropertyChanged(); } }
    }

    public bool CloudBusy
    {
        get => _cloudBusy;
        private set { if (SetProperty(ref _cloudBusy, value)) OnPropertyChanged(nameof(CloudNotBusy)); }
    }

    public bool CloudNotBusy => !_cloudBusy;

    public string CloudStatus { get => _cloudStatus; private set => SetProperty(ref _cloudStatus, value); }

    public string CloudLastSync
        => CloudSync.LastSyncUtc?.ToLocalTime().ToString("yyyy-MM-dd HH:mm") ?? "尚未同步";

    // run-3 加固:http 明文连接传 Basic 凭据,给用户可见警告前缀
    private string HttpWarning
        => _cloud.Url.StartsWith("http://", StringComparison.OrdinalIgnoreCase) ? "⚠ 未加密连接(http):" : "";

    public RelayCommand CloudTestCommand { get; }
    public RelayCommand CloudPushCommand { get; }
    public RelayCommand CloudRestoreCommand { get; }

    public SettingsViewModel()
    {
        ChangeDataDirCommand = new RelayCommand(_ => ChangeDataDir(useDefault: false));
        ResetDataDirCommand = new RelayCommand(_ => ChangeDataDir(useDefault: true));
        ChangeExportDirCommand = new RelayCommand(_ =>
        {
            try
            {
                using var dlg = new System.Windows.Forms.FolderBrowserDialog
                {
                    Description = "选择导出的默认保存文件夹",
                    ShowNewFolderButton = true,
                };
                if (dlg.ShowDialog() != System.Windows.Forms.DialogResult.OK) return;
                AppSettings.SetExportDir(dlg.SelectedPath);
                OnPropertyChanged(nameof(CurrentExportDir));
                Toast.Show("导出默认文件夹已更新", "📁");
            }
            catch (Exception ex)
            {
                App.WriteCrashLog(ex);
                Dialog.Info("更改失败", ex.Message);
            }
        });

        AddTagCommand = new RelayCommand(_ =>
        {
            if (TagOptions.AddTag(NewTagInput.Trim()))
            {
                NewTagInput = "";
                App.Persist();
            }
        });
        RemoveTagCommand = new RelayCommand(p =>
        {
            if (p is string tag)
            {
                TagOptions.RemoveTag(tag);
                App.Persist();
            }
        });

        ExportMarkdownCommand = new RelayCommand(_ => Export("Markdown 文档|*.md", ".md", Exporter.ExportMarkdown));
        ExportHtmlCommand = new RelayCommand(_ => Export("网页|*.html", ".html", Exporter.ExportHtml));
        ExportPdfCommand = new RelayCommand(_ => Export("PDF 文档|*.pdf", ".pdf", Exporter.ExportPdf));

        _configSaveTimer.Tick += (_, _) => FlushCloudConfig();
        CloudTestCommand = new RelayCommand(async _ => await CloudTestAsync());
        CloudPushCommand = new RelayCommand(async _ => await CloudPushAsync());
        CloudRestoreCommand = new RelayCommand(async _ => await CloudRestoreAsync());
    }

    private void ChangeDataDir(bool useDefault)
    {
        try
        {
            string? target;
            if (useDefault)
            {
                target = Path.Combine(AppContext.BaseDirectory, "Data");
            }
            else
            {
                using var dlg = new System.Windows.Forms.FolderBrowserDialog
                {
                    Description = "选择新的数据存放文件夹(将把当前数据复制过去)",
                    ShowNewFolderButton = true,
                };
                if (dlg.ShowDialog() != System.Windows.Forms.DialogResult.OK) return;
                target = dlg.SelectedPath;
            }

            var current = App.DataDir;
            if (string.Equals(Path.GetFullPath(target), Path.GetFullPath(current), StringComparison.OrdinalIgnoreCase))
            {
                Dialog.Info("数据位置", "新位置与当前位置相同。");
                return;
            }

            // 新目录可写测试
            var probe = Path.Combine(target, $".wb_probe_{Guid.NewGuid():N}");
            try
            {
                Directory.CreateDirectory(target);
                File.WriteAllText(probe, "x");
                File.Delete(probe);
            }
            catch (Exception ex)
            {
                Dialog.Info("无法使用该位置", $"该文件夹不可写:\n{ex.Message}");
                return;
            }

            var targetDb = Path.Combine(target, "workbench.db");
            if (File.Exists(targetDb))
            {
                // 审计修复:覆盖确认取消时直接终止,不再落到 File.Copy 的 IOException"更改失败"路径
                if (!Dialog.Confirm("目标位置已有数据",
                    "目标文件夹里已存在工作台数据,是否用当前数据覆盖它?\n(选「取消」则放弃更改)"))
                {
                    Dialog.Info("已取消", "未做任何更改。");
                    return;
                }
            }

            if (!Dialog.Confirm("更改数据位置",
                    $"将把当前数据复制到:\n{target}\n\n复制完成后应用会重启以生效。继续?"))
                return;

            // 1) 先把内存数据落盘,保证复制的是最新状态
            App.Persist();

            // 2) 复制数据库 + 偏好/岛状态/云同步状态随迁(run-3 加固:原来只迁 db/prefs/island,
            //    webdav.json/cloud.json 留在旧目录 = 新目录视为从未同步,下次启动可能把云端旧数据拉回)
            Directory.CreateDirectory(target);
            File.Copy(Path.Combine(current, "workbench.db"), targetDb, overwrite: true);
            foreach (var f in new[] { "prefs.json", "island.json", "webdav.json", "cloud.json", "restore-pending.json", "workbench.db.cloudrestore" })
            {
                var src = Path.Combine(current, f);
                if (File.Exists(src)) File.Copy(src, Path.Combine(target, f), overwrite: true);
            }

            // 3) 记住新位置
            AppSettings.SetDataDir(useDefault ? null : target);

            // 4) 重启生效(避免各页面的视图绑定残留旧集合)——run-3 加固:重启改为退出后拉起,
            //    消除与 OnExit 收尾(含云推送最长 12s,持有单实例 Mutex)的竞速
            Dialog.Info("更改完成", "数据已复制,应用即将重启。\n\n旧目录的完整副本保留在:\n" + current + "\n(确认新位置一切正常后,可自行清理)");
            App.RequestRestart();
            Application.Current.Shutdown();
        }
        catch (Exception ex)
        {
            App.WriteCrashLog(ex);
            Dialog.Info("更改失败", ex.Message);
        }
    }

    private static void Export(string filter, string ext, Action<string, WorkbenchData> exporter)
    {
        try
        {
            // 默认文件夹:设置里配置的,未配置则用 Data\exports
            var exportsDir = AppSettings.GetExportDir()
                ?? System.IO.Path.Combine(App.DataDir, "exports");
            System.IO.Directory.CreateDirectory(exportsDir);

            var dlg = new Microsoft.Win32.SaveFileDialog
            {
                Filter = filter,
                FileName = $"工作台导出_{DateTime.Now:yyyyMMdd_HHmm}{ext}",
                InitialDirectory = exportsDir,
            };
            if (dlg.ShowDialog() != true) return;
            exporter(dlg.FileName, App.Data);
            Toast.Show($"已导出 {System.IO.Path.GetFileName(dlg.FileName)}", "📄");
        }
        catch (Exception ex)
        {
            App.WriteCrashLog(ex);
            Dialog.Info("导出失败", $"{ex.Message}\n\n提示:部分文件夹(如桌面)受安全软件保护,可尝试保存到其他位置。");
        }
    }

    // ===== 云同步动作 =====
    // 异常翻译已挪到 CloudSync.TranslateError(便签页快捷按钮与这里共用同一套人话)

    private async Task CloudTestAsync()
    {
        FlushCloudConfig();
        if (CloudBusy) return;
        CloudBusy = true;
        CloudStatus = "正在测试连接…";
        try
        {
            var msg = await CloudSync.TestAsync(_cloud);
            CloudStatus = HttpWarning + msg;
            Toast.Show(HttpWarning + msg, "☁️");
        }
        catch (Exception ex)
        {
            CloudStatus = "连接失败:" + CloudSync.TranslateError(ex);
            Toast.Show("连接失败:" + CloudSync.TranslateError(ex), "⚠️");
        }
        finally { CloudBusy = false; }
    }

    private async Task CloudPushAsync()
    {
        FlushCloudConfig();
        if (CloudBusy) return;
        CloudBusy = true;
        CloudStatus = "正在上传…";
        try
        {
            await CloudSync.PushAsync(_cloud);
            CloudStatus = "已上传到云端";
            OnPropertyChanged(nameof(CloudLastSync));
            Toast.Show(HttpWarning + "已上传到云端 ☁️", "☁️");
        }
        catch (Exception ex)
        {
            CloudStatus = "上传失败:" + CloudSync.TranslateError(ex);
            Toast.Show("上传失败:" + CloudSync.TranslateError(ex), "⚠️");
        }
        finally { CloudBusy = false; }
    }

    private async Task CloudRestoreAsync()
    {
        FlushCloudConfig();
        if (CloudBusy) return;
        if (!Dialog.Confirm("从云端恢复",
                (HttpWarning.Length > 0 ? HttpWarning + "\n\n" : "") +
                "将用云端数据覆盖本地数据库(便签/任务/待办以云端为准)。\n\n当前本地数据会先备份到云端 workbench.db.bak,恢复错了还能找回。\n恢复在重启应用后生效。继续?"))
            return;
        CloudBusy = true;
        CloudStatus = "正在从云端拉取…";
        try
        {
            await CloudSync.RestoreNowAsync(_cloud);
            // 顺利:重启生效——但不在旧实例里直接 Process.Start(run-3 加固:旧实例退出推送最长占
            // Mutex 12s,立即拉起新实例会撞"已在运行中"而退出)。改为请求重启,OnExit 释放 Mutex 后再拉起
            App.RequestRestart();
            Application.Current.Shutdown();
        }
        catch (Exception ex)
        {
            CloudStatus = "恢复失败:" + CloudSync.TranslateError(ex);
            Toast.Show("恢复失败:" + CloudSync.TranslateError(ex), "⚠️");
        }
        finally { CloudBusy = false; }
    }
}
