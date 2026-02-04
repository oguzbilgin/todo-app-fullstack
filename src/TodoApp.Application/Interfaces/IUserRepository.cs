using TodoApp.Domain.Entities;

namespace TodoApp.Infrastructure.Repositories.Interfaces;

public interface IUserRepository
{
  Task<User?> GetByIdAsync(Guid id);
  Task<User?> GetByEmailAsync(string email);
  Task AddAsync(User user);
  Task SaveChangesAsync();
}
