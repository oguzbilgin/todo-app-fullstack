namespace TodoApp.Application.DTOs.Auth;
public class SignInRequest
{
  public string Email { get; set; } = null!;
  public string Password { get; set; } = null!;
}
