using System.IO;
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
            }
            catch (Exception ex)
            {
                _autoStart = !value;                 // 失败回滚开关状态
                OnPropertyChanged(nameof(AutoStartEnabled));
                App.WriteCrashLog(ex);
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

            // 2) 复制数据库 + 偏好/岛状态随迁(审计修复:原来只迁 db,prefs/island 静默重置)
            Directory.CreateDirectory(target);
            File.Copy(Path.Combine(current, "workbench.db"), targetDb, overwrite: true);
            foreach (var f in new[] { "prefs.json", "island.json" })
            {
                var src = Path.Combine(current, f);
                if (File.Exists(src)) File.Copy(src, Path.Combine(target, f), overwrite: true);
            }

            // 3) 记住新位置
            AppSettings.SetDataDir(useDefault ? null : target);

            // 4) 重启生效(避免各页面的视图绑定残留旧集合)
            Dialog.Info("更改完成", "数据已复制,应用即将重启。\n\n旧目录的完整副本保留在:\n" + current + "\n(确认新位置一切正常后,可自行清理)");
            var exe = Environment.ProcessPath
                ?? throw new InvalidOperationException("无法确定 exe 路径");
            System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo
            {
                FileName = exe,
                UseShellExecute = true,
            });
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
            Dialog.Info("导出成功", $"文件:{System.IO.Path.GetFileName(dlg.FileName)}");
        }
        catch (Exception ex)
        {
            App.WriteCrashLog(ex);
            Dialog.Info("导出失败", $"{ex.Message}\n\n提示:部分文件夹(如桌面)受安全软件保护,可尝试保存到其他位置。");
        }
    }
}
