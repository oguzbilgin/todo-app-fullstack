using TodoApp.Application.Interfaces;
using TodoApp.Domain.Entities;
using TodoApp.Infrastructure.Repositories.Interfaces;
using System.Security.Cryptography;
using System.Text;
using TodoApp.Application.Common.Exceptions;

namespace TodoApp.Application.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<User?> RegisterAsync(string email, string password)
    {
        var existingUser = await _userRepository.GetByEmailAsync(email);
        if (existingUser != null)
            throw new ValidationException("Email already registered");

        var passwordHash = HashPassword(password);
        var user = new User
        {
            Email = email,
            PasswordHash = passwordHash
        };

        await _userRepository.AddAsync(user);
        await _userRepository.SaveChangesAsync();

        return user;
    }

    public async Task<User?> AuthenticateAsync(string email, string password)
    {
        var user = await _userRepository.GetByEmailAsync(email);
        if (user == null)
            throw new NotFoundException("User not found");

        var hash = HashPassword(password);
        if (hash != user.PasswordHash)
            throw new ValidationException("Invalid password");

        return user;
    }

    public async Task<User?> GetByIdAsync(Guid id)
    {
        var user = await _userRepository.GetByIdAsync(id);
        if (user == null)
            throw new NotFoundException("User not found");
        return user;
    }

    private static string HashPassword(string password)
    {
        using var sha256 = SHA256.Create();
        var bytes = Encoding.UTF8.GetBytes(password);
        var hashBytes = sha256.ComputeHash(bytes);
        return Convert.ToBase64String(hashBytes);
    }
}
