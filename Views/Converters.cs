using System.Globalization;
using System.Windows;
using System.Windows.Data;
using System.Windows.Media;
using Workbench.Models;

namespace Workbench.Views;

// 反向布尔→可见性:false/null 显示,true 隐藏(主页"空状态"提示用)
public class InverseBoolToVisConverter : IValueConverter
{
    public object Convert(object? value, Type targetType, object? parameter, CultureInfo culture)
        => value is true ? Visibility.Collapsed : Visibility.Visible;

    public object ConvertBack(object? value, Type targetType, object? parameter, CultureInfo culture)
        => throw new NotSupportedException();
}

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

// 热力图档位 → 颜色(0 灰,1-4 绿色渐深;灰底感知当前主题)
public class HeatLevelConverter : IValueConverter
{
    public object Convert(object? value, Type targetType, object? parameter, CultureInfo culture)
    {
        var level = value is int i ? i : 0;
        var dark = Wpf.Ui.Appearance.ApplicationThemeManager.GetAppTheme() == Wpf.Ui.Appearance.ApplicationTheme.Dark;
        var hex = level switch
        {
            1 => "#9BE9A8",
            2 => "#40C463",
            3 => "#2DA44E",
            4 => "#216E39",
            _ => dark ? "#2E2E2E" : "#E8E8E8",
        };
        var brush = new SolidColorBrush((System.Windows.Media.Color)System.Windows.Media.ColorConverter.ConvertFromString(hex));
        brush.Freeze();
        return brush;
    }

    public object ConvertBack(object? value, Type targetType, object? parameter, CultureInfo culture)
        => throw new NotSupportedException();
}
