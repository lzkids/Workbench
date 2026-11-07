using System.Collections.ObjectModel;
using Workbench.Models;

namespace Workbench.ViewModels;

// 主页:汇总"进行中任务"和"未完成待办",待办可以直接在这里勾选完成;
// 底部有近 26 周的活动热力图(完成待办 + 完成任务 + 新建便签)。
public class DashboardViewModel : ObservableObject
{
    private readonly MainViewModel _main;

    public ObservableCollection<TaskItem> ActiveTasks { get; } = new();
    public ObservableCollection<TodoItem> PendingTodos { get; } = new();
    public ObservableCollection<HeatWeek> HeatWeeks { get; } = new();

    private int _heatTotal;
    public int HeatTotal { get => _heatTotal; private set => SetProperty(ref _heatTotal, value); }

    public DashboardViewModel(MainViewModel main)
    {
        _main = main;
    }

    // 主页点任务条目:跳到任务页并高亮那条
    public void JumpToTask(TaskItem task)
    {
        _main.HighlightTask(task.Id);
        _main.SelectIndex(2);
    }

    // 每次导航到主页时重建汇总与热力图
    public void Rebuild()
    {
        ActiveTasks.Clear();
        foreach (var t in App.Data.Tasks.Where(t => !t.Archived && t.Status == "进行中"))
            ActiveTasks.Add(t);

        // 未完成待办:高优先在前,到期近的在前
        PendingTodos.Clear();
        foreach (var t in App.Data.Todos
                     .Where(t => !t.Archived && !t.IsDone)
                     .OrderBy(t => t.Priority switch { "高" => 0, "普通" => 1, _ => 2 })
                     .ThenBy(t => t.DueDate ?? DateTime.MaxValue))
            PendingTodos.Add(t);

        OnPropertyChanged(nameof(AnyTasks));
        OnPropertyChanged(nameof(AnyTodos));

        RebuildHeat();
    }

    public bool AnyTasks => ActiveTasks.Count > 0;
    public bool AnyTodos => PendingTodos.Count > 0;

    // ===== 活动热力图 =====
    // 每日活动 = 当天完成待办 + 完成任务 + 新建便签,5 档绿色
    private void RebuildHeat()
    {
        HeatWeeks.Clear();

        var today = DateTime.Today;
        var mondayOffset = ((int)today.DayOfWeek + 6) % 7; // 周一=0
        var start = today.AddDays(-mondayOffset).AddDays(-25 * 7); // 26 周前那一周的周一

        var counts = new Dictionary<DateTime, int>();
        void Count(DateTime? d)
        {
            if (!d.HasValue) return;
            var k = d.Value.Date;
            counts.TryGetValue(k, out var c);
            counts[k] = c + 1;
        }
        foreach (var t in App.Data.Todos.Where(t => t.IsDone)) Count(t.CompletedAt);
        foreach (var t in App.Data.Tasks.Where(t => !t.Archived && t.Status == "已完成")) Count(t.UpdatedAt);
        foreach (var n in App.Data.Notes.Where(n => !n.Archived)) Count(n.CreatedAt);

        var total = 0;
        var week = new HeatWeek();
        var day = start;
        while (day <= today)
        {
            counts.TryGetValue(day, out var c);
            total += c;
            week.Days.Add(new HeatDay
            {
                Date = day,
                Level = c switch { 0 => 0, 1 => 1, 2 => 2, <= 4 => 3, _ => 4 },
                Tip = $"{day:MM-dd}:{(c == 0 ? "无活动" : $"{c} 项活动")}",
            });
            if (week.Days.Count == 7)
            {
                HeatWeeks.Add(week);
                week = new HeatWeek();
            }
            day = day.AddDays(1);
        }
        if (week.Days.Count > 0)
            HeatWeeks.Add(week);

        HeatTotal = total;
    }
}

// 热力图:一周一列,列里 7 天
public class HeatWeek
{
    public ObservableCollection<HeatDay> Days { get; } = new();
}

public class HeatDay
{
    public DateTime Date { get; set; }
    public int Level { get; set; }
    public string Tip { get; set; } = "";
}
