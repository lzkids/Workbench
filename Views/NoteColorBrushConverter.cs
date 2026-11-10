using System.Globalization;
using System.Windows.Data;
using System.Windows.Media;
using Workbench.Models;

namespace Workbench.Views;

// 把 NoteItem.ColorKey 变成画刷:ConverterParameter = bg(默认) / fg / accent / border
public sealed class NoteColorBrushConverter : IValueConverter
{
    public object Convert(object? value, Type targetType, object? parameter, CultureInfo culture)
    {
        var color = NoteColors.Of(value as string);
        var hex = (parameter as string) switch
        {
            "fg" => color.Foreground,
            "accent" => color.Accent,
            "border" => color.Border,
            _ => color.Background,
        };
        var brush = (SolidColorBrush)new BrushConverter().ConvertFromString(hex)!;
        brush.Freeze();
        return brush;
    }

    public object ConvertBack(object? value, Type targetType, object? parameter, CultureInfo culture)
        => throw new NotSupportedException();
}
