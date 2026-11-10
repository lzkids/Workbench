using Workbench.Models;

namespace Workbench.Services;

// 存储层接口:UI/VM 只依赖这个抽象,换后端(JsonStore/SqliteStore)不动界面
public interface IDataStore
{
    WorkbenchData Load();

    // 返回 true = 已成功落盘(调用方可据此决定后续动作,如迁移改名);失败仅记日志不上抛
    bool Save(WorkbenchData data);
}
