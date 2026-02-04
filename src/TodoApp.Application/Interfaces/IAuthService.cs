using TodoApp.Domain.Entities;

namespace TodoApp.Application.Interfaces;

public interface IAuthService
{
  Task<string> AuthenticateAsync(string email, string password);
  Task<User> RegisterAsync(string email, string password);
}
