using System.IO;
using System.Text;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using Workbench.Models;

namespace Workbench.Services;

// 数据导出:Markdown / HTML / PDF。
// PDF 用 QuestPDF 进程内生成:最初用 Edge headless,实测本机防护按"祖先进程链"
// 连带限制未签名 exe 的子进程(Edge 挂死),改用进程内渲染,中文字体走系统字体。
public static class Exporter
{
    public static void ExportMarkdown(string path, WorkbenchData d)
    {
        var sb = new StringBuilder();
        sb.AppendLine($"# 工作台导出({DateTime.Now:yyyy-MM-dd HH:mm})");
        sb.AppendLine();

        sb.AppendLine($"## 📝 便签({d.Notes.Count})");
        foreach (var n in d.Notes)
        {
            sb.AppendLine($"### {n.CreatedAt:yyyy-MM-dd HH:mm}");
            sb.AppendLine(n.Content.Replace("\r\n", "\n"));
            sb.AppendLine();
        }

        sb.AppendLine($"## 🗂️ 任务记录({d.Tasks.Count})");
        sb.AppendLine();
        sb.AppendLine("| 标题 | 状态 | 更新时间 |");
        sb.AppendLine("|---|---|---|");
        foreach (var t in d.Tasks)
            sb.AppendLine($"| {Escape(t.Title)} | {t.Status} | {t.UpdatedAt:yyyy-MM-dd HH:mm} |");
        sb.AppendLine();

        sb.AppendLine($"## ✅ 待办({d.Todos.Count})");
        foreach (var t in d.Todos)
        {
            var mark = t.IsDone ? "x" : " ";
            var extra = new StringBuilder();
            if (t.Priority != "普通") extra.Append($"[{t.Priority}优先]");
            if (t.DueDate.HasValue) extra.Append($"[到期 {t.DueDate:MM-dd}]");
            sb.AppendLine($"- [{mark}] {Escape(t.Title)} {extra}");
        }

        File.WriteAllText(path, sb.ToString(), new UTF8Encoding(true));
    }

    public static void ExportHtml(string path, WorkbenchData d)
        => File.WriteAllText(path, BuildHtml(d), new UTF8Encoding(true));

    private static string Escape(string s)
        => s.Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;");

    public static string BuildHtml(WorkbenchData d)
    {
        var sb = new StringBuilder();
        sb.Append("""
<!DOCTYPE html><html lang="zh"><head><meta charset="utf-8"><title>工作台导出</title><style>
body{font-family:"Microsoft YaHei",sans-serif;max-width:860px;margin:32px auto;padding:0 16px;color:#1f2937;background:#f7f8fa}
h1{font-size:22px}h2{font-size:17px;margin-top:28px;border-bottom:2px solid #e5e7eb;padding-bottom:6px}
table{border-collapse:collapse;width:100%;background:#fff;font-size:13px}
td,th{border:1px solid #e5e7eb;padding:7px 10px;text-align:left}
th{background:#f3f4f6}
.note{background:#fef3a2;border-radius:8px;padding:10px 12px;margin:8px 0;white-space:pre-wrap;font-size:13px}
.meta{color:#9ca3af;font-size:11px}
.badge{display:inline-block;border-radius:10px;padding:1px 9px;font-size:11px;background:#ececec;margin-right:6px}
.done{text-decoration:line-through;color:#9ca3af}
ul{list-style:none;padding-left:4px}li{margin:6px 0;font-size:14px}
.overdue{color:#dc2626;font-weight:bold}
</style></head><body>
""");
        sb.Append($"<h1>工作台导出 <span class=meta>{DateTime.Now:yyyy-MM-dd HH:mm}</span></h1>");

        sb.Append($"<h2>📝 便签({d.Notes.Count})</h2>");
        foreach (var n in d.Notes)
        {
            sb.Append($"<div class=note><span class=meta>{n.CreatedAt:MM-dd HH:mm}</span><br>")
              .Append(Escape(n.Content)).Append("</div>");
        }

        sb.Append($"<h2>🗂️ 任务记录({d.Tasks.Count})</h2><table><tr><th>标题</th><th>状态</th><th>更新时间</th></tr>");
        foreach (var t in d.Tasks)
        {
            var done = t.Status == "已完成" ? " class=done" : "";
            sb.Append($"<tr><td{done}>{Escape(t.Title)}</td><td>{t.Status}</td><td>{t.UpdatedAt:MM-dd HH:mm}</td></tr>");
        }
        sb.Append("</table>");

        sb.Append($"<h2>✅ 待办({d.Todos.Count})</h2><ul>");
        foreach (var t in d.Todos)
        {
            var cls = t.IsDone ? " class=done" : "";
            var extra = "";
            if (t.Priority == "高") extra += "<span class='badge' style='color:#dc2626'>高优先</span>";
            else if (t.Priority == "低") extra += "<span class='badge' style='color:#2563eb'>低优先</span>";
            if (t.DueDate.HasValue)
                extra += t.IsOverdue
                    ? $"<span class=overdue>⏰ {t.DueDate:MM-dd} 逾期</span>"
                    : $"<span class=meta>⏰ {t.DueDate:MM-dd}</span>";
            sb.Append($"<li><input type=checkbox disabled {(t.IsDone ? "checked" : "")}><span{cls}>{Escape(t.Title)}</span> {extra}</li>");
        }
        sb.Append("</ul></body></html>");
        return sb.ToString();
    }

    // PDF:QuestPDF 进程内生成,中文用系统字体(微软雅黑)
    public static void ExportPdf(string path, WorkbenchData d)
    {
        QuestPDF.Settings.License = QuestPDF.Infrastructure.LicenseType.Community;
        QuestPDF.Settings.UseEnvironmentFonts = true;

        QuestPDF.Fluent.Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Size(QuestPDF.Helpers.PageSizes.A4);
                page.Margin(40);
                page.DefaultTextStyle(x => x.FontFamily("Microsoft YaHei").FontSize(10.5f));

                page.Content().Column(col =>
                {
                    col.Spacing(8);
                    col.Item().Row(row =>
                    {
                        row.RelativeItem().Text("工作台导出").FontSize(20).Bold();
                        row.AutoItem().AlignRight().Text($"{DateTime.Now:yyyy-MM-dd HH:mm}")
                            .FontSize(9).FontColor("#9CA3AF");
                    });

                    // 便签
                    col.Item().PaddingTop(6).Text($"便签({d.Notes.Count})").FontSize(14).Bold();
                    if (d.Notes.Count == 0)
                        col.Item().Text("暂无").FontColor("#9CA3AF");
                    foreach (var n in d.Notes)
                    {
                        col.Item().PaddingTop(4).Background("#FEF3A2").Padding(8).Column(c =>
                        {
                            c.Spacing(2);
                            c.Item().Text($"{n.CreatedAt:yyyy-MM-dd HH:mm}").FontSize(8).FontColor("#8A7B2E");
                            c.Item().Text(string.IsNullOrWhiteSpace(n.Content) ? "(空便签)" : n.Content).FontSize(10);
                        });
                    }

                    // 任务记录
                    col.Item().PaddingTop(10).Text($"任务记录({d.Tasks.Count})").FontSize(14).Bold();
                    if (d.Tasks.Count == 0)
                        col.Item().Text("暂无").FontColor("#9CA3AF");
                    else
                    {
                        col.Item().Table(table =>
                        {
                            table.ColumnsDefinition(c =>
                            {
                                c.RelativeColumn(3);
                                c.ConstantColumn(56);
                                c.ConstantColumn(88);
                            });
                            table.Header(h =>
                            {
                                h.Cell().Background("#F3F4F6").Padding(4).Text("标题").Bold();
                                h.Cell().Background("#F3F4F6").Padding(4).Text("状态").Bold();
                                h.Cell().Background("#F3F4F6").Padding(4).Text("更新时间").Bold();
                            });
                            foreach (var t in d.Tasks)
                            {
                                table.Cell().Padding(4).Text(t.Title);
                                table.Cell().Padding(4).Text(t.Status).FontColor(
                                    t.Status == "已完成" ? "#2E7D32" :
                                    t.Status == "进行中" ? "#D97706" : "#666666");
                                table.Cell().Padding(4).Text($"{t.UpdatedAt:MM-dd HH:mm}").FontColor("#9CA3AF");
                            }
                        });
                    }

                    // 待办
                    col.Item().PaddingTop(10).Text($"待办({d.Todos.Count})").FontSize(14).Bold();
                    if (d.Todos.Count == 0)
                        col.Item().Text("暂无").FontColor("#9CA3AF");
                    foreach (var t in d.Todos)
                    {
                        col.Item().PaddingTop(3).Text(txt =>
                        {
                            txt.Span(t.IsDone ? "☑ " : "☐ ");
                            var title = txt.Span(t.Title);
                            if (t.IsDone)
                                title.FontColor("#9CA3AF");
                            if (t.Priority == "高")
                                txt.Span("  [高优先]").FontSize(9).FontColor("#DC2626");
                            else if (t.Priority == "低")
                                txt.Span("  [低优先]").FontSize(9).FontColor("#2563EB");
                            if (t.DueDate.HasValue)
                            {
                                if (t.IsOverdue)
                                    txt.Span($"  ⏰ {t.DueDate:MM-dd} 逾期").FontSize(9).FontColor("#DC2626").Bold();
                                else
                                    txt.Span($"  ⏰ {t.DueDate:MM-dd}").FontSize(9).FontColor("#9CA3AF");
                            }
                        });
                    }
                });
            });
        }).GeneratePdf(path);
    }
}
