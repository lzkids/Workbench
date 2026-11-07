using Workbench.Models;

namespace Workbench.Services;

// 存储层接口:UI/VM 只依赖这个抽象,换后端(JsonStore/SqliteStore)不动界面
public interface IDataStore
{
    WorkbenchData Load();
    void Save(WorkbenchData data);
}
