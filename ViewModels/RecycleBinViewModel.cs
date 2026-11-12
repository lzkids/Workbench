using System.Collections.ObjectModel;
using Workbench.Models;

namespace Workbench.ViewModels;

public class RecycleBinViewModel : ObservableObject
{
    public ObservableCollection<RecycleItem> Items => App.Data.RecycleBin;

    // 云同步快捷按钮:逻辑在 CloudSyncBar(与便签/归档页共用)
    public CloudSyncBar Cloud { get; } = new();

    public RelayCommand RestoreCommand { get; }
    public RelayCommand DeleteForeverCommand { get; }
    public RelayCommand ClearCommand { get; }

    public RecycleBinViewModel()
    {
        RestoreCommand = new RelayCommand(p =>
        {
            if (p is RecycleItem r) App.RestoreFromRecycle(r);
        });

        DeleteForeverCommand = new RelayCommand(p =>
        {
            if (p is RecycleItem r)
            {
                App.Data.RecycleBin.Remove(r);
                App.Persist();
            }
        });

        ClearCommand = new RelayCommand(_ =>
        {
            if (!Dialog.Confirm("清空回收站", "确定清空回收站?清空后无法恢复。")) return;
            App.Data.RecycleBin.Clear();
            App.Persist();
        });
    }
}
