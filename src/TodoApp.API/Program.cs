using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using TodoApp.API.Middleware;
using TodoApp.Application.Interfaces;
using TodoApp.Application.Services;
using TodoApp.Infrastructure.Data;
using TodoApp.Infrastructure.Repositories.Implementations;
using TodoApp.Infrastructure.Repositories.Interfaces;
using TodoApp.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// CORS Policy
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            .AllowAnyOrigin()    // Herhangi bir frontend’den isteğe izin verir
            .AllowAnyMethod()    // GET, POST, PUT, DELETE vb. izin ver
            .AllowAnyHeader();   // Authorization, Content-Type gibi header’lara izin verir
    });
});

// JWT Middleware
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    var jwtSettings = builder.Configuration.GetSection("Jwt");
    var key = Encoding.ASCII.GetBytes(jwtSettings["Key"]!);

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidateAudience = true,
        ValidAudience = jwtSettings["Audience"],
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            // Sadece Authorization header'ı kullan, cookie'yi yok say
            var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();
            if (!string.IsNullOrEmpty(authHeader) && authHeader.StartsWith("Bearer "))
            {
                context.Token = authHeader["Bearer ".Length..].Trim();
            }
            else
            {
                context.Token = null; // Cookie varsa bile yok say
            }
            return Task.CompletedTask;
        }
    };
});

// DbContext
builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITodoService, TodoService>();

// Repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ITodoRepository, TodoRepository>();

// Controllers
builder.Services.AddControllers();

builder.Services.AddOpenApi();

var app = builder.Build();

app.UseCors();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware<ExceptionMiddleware>();

app.MapControllers();


app.Run();
