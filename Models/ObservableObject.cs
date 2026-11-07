using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace Workbench.Models;

// INotifyPropertyChanged 基类:属性变化时通知 WPF 刷新界面。
// 以后上 CommunityToolkit.Mvvm 时,把继承换成 ObservableObject(Toolkit 同名类)即可,形状是对齐的。
public abstract class ObservableObject : INotifyPropertyChanged
{
    public event PropertyChangedEventHandler? PropertyChanged;

    protected void OnPropertyChanged([CallerMemberName] string? name = null)
        => PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));

    // 标准写法:值没变就返回 false(不触发刷新);变了就更新字段并通知
    protected bool SetProperty<T>(ref T field, T value, [CallerMemberName] string? name = null)
    {
        if (EqualityComparer<T>.Default.Equals(field, value)) return false;
        field = value;
        OnPropertyChanged(name);
        return true;
    }
}
