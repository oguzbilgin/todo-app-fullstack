using TodoApp.Domain.Entities;

namespace TodoApp.Application.Interfaces;

public interface IUserService
{
  Task<User?> RegisterAsync(string email, string password);
  Task<User?> AuthenticateAsync(string email, string password);
  Task<User?> GetByIdAsync(Guid id);
}
