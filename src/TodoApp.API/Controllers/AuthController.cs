using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using TodoApp.Application.DTOs.Auth;
using TodoApp.Application.Interfaces;

namespace TodoApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] SignUpRequest request)
        {
            try
            {
                var user = await _authService.RegisterAsync(request.Email, request.Password);
                return Ok(new { user.Id, user.Email });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] SignInRequest request)
        {
            try
            {
                var token = await _authService.AuthenticateAsync(request.Email, request.Password);
                return Ok(new { token });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
