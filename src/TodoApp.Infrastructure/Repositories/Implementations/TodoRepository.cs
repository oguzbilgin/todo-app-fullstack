using Microsoft.EntityFrameworkCore;
using TodoApp.Application.Interfaces;
using TodoApp.Domain.Entities;
using TodoApp.Infrastructure.Data;

namespace TodoApp.Infrastructure.Repositories.Implementations;

public class TodoRepository : ITodoRepository
{
  private readonly AppDbContext _context;

  public TodoRepository(AppDbContext context)
  {
    _context = context;
  }

  public async Task AddCompletedTodoAsync(CompletedTodo completedTodo)
  {
    await _context.CompletedTodos.AddAsync(completedTodo);
  }

  public async Task AddTodoAsync(Todo todo)
  {
    await _context.Todos.AddAsync(todo);
  }

  public async Task<Todo?> GetByIdAsync(Guid id)
  {
    return await _context.Todos.FindAsync(id);
  }

  public async Task<IEnumerable<CompletedTodo>> GetCompletedTodosByUserAsync(Guid userId)
  {
    return await _context.CompletedTodos
                  .Where(c => c.UserId == userId)
                  .ToListAsync();
  }

  public async Task<IEnumerable<Todo>> GetTodosByUserAsync(Guid userId)
  {
    return await _context.Todos
                  .Where(t => t.UserId == userId && !t.IsCompleted)
                  .ToListAsync();
  }

  public async Task SaveChangesAsync()
  {
    await _context.SaveChangesAsync();
  }
}
