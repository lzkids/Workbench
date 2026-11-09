using System.Globalization;
using System.Windows;
using System.Windows.Data;
using System.Windows.Media;
using Workbench.Models;

namespace Workbench.Views;

// 标签 → 文字色(Error 红/Warning 黄/Done 绿/紧急 红,其他紫)
public class TagForeConverter : IValueConverter
{
    public object Convert(object? value, Type targetType, object? parameter, CultureInfo culture)
        => new SolidColorBrush((System.Windows.Media.Color)System.Windows.Media.ColorConverter.ConvertFromString(TagOptions.ForeColorOf(value as string)));

    public object ConvertBack(object? value, Type targetType, object? parameter, CultureInfo culture)
        => throw new NotSupportedException();
}

// 标签 → 浅底色(与文字色配对)
public class TagBgConverter : IValueConverter
{
    public object Convert(object? value, Type targetType, object? parameter, CultureInfo culture)
        => new SolidColorBrush((System.Windows.Media.Color)System.Windows.Media.ColorConverter.ConvertFromString(TagOptions.BgColorOf(value as string)));

    public object ConvertBack(object? value, Type targetType, object? parameter, CultureInfo culture)
        => throw new NotSupportedException();
}
