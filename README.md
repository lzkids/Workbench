# Workbench 工作台

一款 WPF 个人效率小工具:便签 + 任务记录(含子任务/标签)+ 待办 + 活动热力图,数据 SQLite 便携存储。

## 功能

- 🏠 **主页**:进行中任务 / 未完成待办双栏汇总,底部快速便签输入条,近 26 周活动热力图
- 📝 **便签**:卡片直接编辑,可弹出独立置顶小窗,卡片大小拖拽可调
- 🗂️ **任务记录**:状态流转、标签、子任务(行内折叠编辑)、按状态过滤
- ✅ **待办**:优先级、到期日(逾期红标),完成后次日自动归档
- 📦 **归档**:按类型 + 月份分组折叠,随时恢复
- 🗑️ **回收站**:删除内容可恢复
- ⚙️ **设置**:开机自启、深浅主题、数据位置、导出 Markdown/HTML/PDF、标签管理

## 构建

需要 Windows 10/11 + [.NET 10 SDK](https://dotnet.microsoft.com/download)(含桌面开发负载)。

```bash
dotnet run          # 开发运行
dotnet publish -c Release -r win-x64 --self-contained false -o publish
```

## 数据

数据默认保存在程序旁 `Data\workbench.db`(SQLite 单文件,整个文件夹拷贝即备份),
可在应用内"设置 → 数据位置"更改;导出的 Markdown/HTML/PDF 默认保存在 `Data\exports`。
