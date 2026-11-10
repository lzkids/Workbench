using System.Windows;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Media;
using Workbench.Models;

namespace Workbench.Views;

// 便签换色菜单:卡片和置顶小窗共用;选中即写入 ColorKey,自动保存由 App 的属性钩子兜底
public static class NoteColorMenu
{
    public static void Show(FrameworkElement anchor, NoteItem note)
    {
        var menu = new ContextMenu
        {
            PlacementTarget = anchor,
            Placement = PlacementMode.Bottom,
        };

        foreach (var color in NoteColors.All)
        {
            var item = new MenuItem
            {
                Header = color.Name,
                Tag = color.Key,
                FontWeight = color.Key == note.ColorKey ? FontWeights.SemiBold : FontWeights.Normal,
                Icon = new Border
                {
                    Width = 14,
                    Height = 14,
                    CornerRadius = new CornerRadius(4),
                    Background = Brush(color.Background),
                    BorderBrush = Brush(color.Border),
                    BorderThickness = new Thickness(1),
                },
            };
            item.Click += (_, _) =>
            {
                note.ColorKey = color.Key;
                App.Persist();
            };
            menu.Items.Add(item);
        }

        menu.IsOpen = true;
    }

    private static System.Windows.Media.Brush Brush(string hex)
    {
        var brush = (SolidColorBrush)new BrushConverter().ConvertFromString(hex)!;
        brush.Freeze();
        return brush;
    }
}
