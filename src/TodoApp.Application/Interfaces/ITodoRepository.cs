using TodoApp.Domain.Entities;

namespace TodoApp.Application.Interfaces;

public interface ITodoRepository
{
  Task<Todo?> GetByIdAsync(Guid id);
  Task<IEnumerable<Todo>> GetTodosByUserAsync(Guid userId);
  Task<IEnumerable<CompletedTodo>> GetCompletedTodosByUserAsync(Guid userId);
  Task AddTodoAsync(Todo todo);
  Task AddCompletedTodoAsync(CompletedTodo completedTodo);
  Task SaveChangesAsync();
}
