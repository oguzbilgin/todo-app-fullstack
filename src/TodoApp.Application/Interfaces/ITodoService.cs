using TodoApp.Domain.Entities;

namespace TodoApp.Application.Interfaces;

public interface ITodoService
{
  Task<Todo> AddTodoAsync(Guid userId, string Title, DateTime dueDate);
  Task CompleteTodoAsync(Guid todoId);
  Task<IEnumerable<Todo>> GetTodosByUserAsync(Guid userId);
  Task<IEnumerable<CompletedTodo>> GetCompletedTodosByUserAsync(Guid userId);
}
