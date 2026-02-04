using Microsoft.EntityFrameworkCore;
using TodoApp.Domain.Entities;
using TodoApp.Infrastructure.Data;
using TodoApp.Infrastructure.Repositories.Interfaces;

namespace TodoApp.Infrastructure.Repositories.Implementations;

public class UserRepository : IUserRepository
{
  private readonly AppDbContext _context;

  public UserRepository(AppDbContext context)
  {
    _context = context;
  }

  public async Task AddAsync(User user)
  {
    await _context.AddAsync(user);
  }

  public async Task<User?> GetByEmailAsync(string email)
  {
    return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
  }

  public async Task<User?> GetByIdAsync(Guid id)
  {
    return await _context.Users.FindAsync(id);
  }

  public async Task SaveChangesAsync()
  {
    await _context.SaveChangesAsync();
  }
}
