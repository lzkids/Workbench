using System.Windows.Input;

namespace Workbench.ViewModels;

// ICommand 最小实现:把按钮点击接到 ViewModel 方法上。
// 用法:new RelayCommand(p => { ... }) ;XAML 里 Command="{Binding XxxCommand}" CommandParameter="{Binding}"
public class RelayCommand : ICommand
{
    private readonly Action<object?> _execute;
    private readonly Func<object?, bool>? _canExecute;

    public RelayCommand(Action<object?> execute, Func<object?, bool>? canExecute = null)
    {
        _execute = execute;
        _canExecute = canExecute;
    }

    // WPF 经典模式:借 CommandManager 让 CanExecute 定期重算,按钮自动可用/禁用
    public event EventHandler? CanExecuteChanged
    {
        add => CommandManager.RequerySuggested += value;
        remove => CommandManager.RequerySuggested -= value;
    }

    public bool CanExecute(object? parameter) => _canExecute?.Invoke(parameter) ?? true;
    public void Execute(object? parameter) => _execute(parameter);
}
