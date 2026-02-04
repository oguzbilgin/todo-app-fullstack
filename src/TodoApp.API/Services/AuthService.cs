using System;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using TodoApp.Domain.Entities;
using TodoApp.Infrastructure.Repositories.Interfaces;
using TodoApp.Application.Interfaces;
using System.Security.Claims;

namespace TodoApp.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public AuthService(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        public async Task<string> AuthenticateAsync(string email, string password)
        {
            var user = await _userRepository.GetByEmailAsync(email);
            if (user == null) throw new Exception("User not found");

            var hash = HashPassword(password);
            if (hash != user.PasswordHash) throw new Exception("Invalid email or Invalid password");

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]!);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email)
                }),
                Expires = DateTime.UtcNow.AddMinutes(double.Parse(_configuration["Jwt:DurationInMinutes"]!)),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public async Task<User> RegisterAsync(string email, string password)
        {
            var exists = await _userRepository.GetByEmailAsync(email);
            if (exists != null) throw new Exception("Email already registered");

            var user = new User
            {
                Id = Guid.NewGuid(),
                Email = email,
                PasswordHash = HashPassword(password)
            };

            await _userRepository.AddAsync(user);
            await _userRepository.SaveChangesAsync();
            return user;
        }

        private static string HashPassword(string password)
        {
            using var sha256 = System.Security.Cryptography.SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hashBytes = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hashBytes);
        }
    }
}
