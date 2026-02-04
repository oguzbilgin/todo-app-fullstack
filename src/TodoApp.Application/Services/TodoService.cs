using TodoApp.Application.Common.Exceptions;
using TodoApp.Application.Interfaces;
using TodoApp.Domain.Entities;

namespace TodoApp.Application.Services;

public class TodoService : ITodoService
{
    private readonly ITodoRepository _todoRepository;

    public TodoService(ITodoRepository todoRepository)
    {
        _todoRepository = todoRepository;
    }

    public async Task<Todo> AddTodoAsync(Guid userId, string title, DateTime dueDate)
    {
        var todo = new Todo
        {
            Title = title,
            DueDate = dueDate,
            UserId = userId,
            IsCompleted = false
        };

        await _todoRepository.AddTodoAsync(todo);
        await _todoRepository.SaveChangesAsync();

        return todo;
    }

    public async Task CompleteTodoAsync(Guid todoId)
    {
        var todo = await _todoRepository.GetByIdAsync(todoId);
        if (todo == null)
            throw new NotFoundException("Todo not found");

        if (todo.IsCompleted)
            throw new ValidationException("Todo is already completed");

        todo.IsCompleted = true;

        var completedTodo = new CompletedTodo
        {
            Title = todo.Title,
            CompletedAt = DateTime.UtcNow,
            UserId = todo.UserId
        };

        await _todoRepository.AddCompletedTodoAsync(completedTodo);
        await _todoRepository.SaveChangesAsync();
    }

    public async Task<IEnumerable<Todo>> GetTodosByUserAsync(Guid userId)
    {
        var todos = await _todoRepository.GetTodosByUserAsync(userId);
        if (!todos.Any())
            throw new NotFoundException("No todos found for this user");
        return todos;
    }

    public async Task<IEnumerable<CompletedTodo>> GetCompletedTodosByUserAsync(Guid userId)
    {
        var completed = await _todoRepository.GetCompletedTodosByUserAsync(userId);
        if (!completed.Any())
            throw new NotFoundException("No completed todos found for this user");
        return completed;
    }
}
