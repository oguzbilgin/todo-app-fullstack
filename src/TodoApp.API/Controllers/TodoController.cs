using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TodoApp.Application.DTOs.Todo;
using TodoApp.Application.Interfaces;

namespace TodoApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ITodoService _todoService;

        public TodoController(ITodoService todoService)
        {
            _todoService = todoService;
        }

        // Get UserId from Token
        private Guid GetUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier) ??
                              User.FindFirst(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Sub);

            if (userIdClaim == null)
                throw new Exception("UserId claim not found in token");

            return Guid.Parse(userIdClaim.Value);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddTodo([FromBody] AddTodoRequest request)
        {
            var userId = GetUserId();
            var todo = await _todoService.AddTodoAsync(userId, request.Title, request.DueDate);

            if(todo is null)
                return BadRequest(new { error = "Todo could not be created" });
            
            return Ok(new { todo.Id, todo.Title, todo.DueDate });
        }

        [HttpPost("{todoId}/complete")]
        public async Task<IActionResult> CompleteTodo([FromRoute] Guid todoId)
        {
            await _todoService.CompleteTodoAsync(todoId);

            return Ok(new { message = "Todo completed"});
        }

        [HttpGet("user")]
        public async Task<IActionResult> GetTodos()
        {
            var userId = GetUserId();
            var todo = await _todoService.GetTodosByUserAsync(userId);

            if (todo is null)
                return BadRequest(new {error = "Todo could not found"});

            return Ok(todo.Select(t => new {t.Id, t.Title, t.DueDate, t.IsCompleted}));
        }

        [HttpGet("user/completed")]
        public async Task<IActionResult> GetCompletedTodos()
        {
            var userId = GetUserId();
            var completedTodo = await _todoService.GetCompletedTodosByUserAsync(userId);

            if (completedTodo is null)
                return BadRequest(new {error = "Comlpeted todo could not found"});
            
            return Ok(completedTodo.Select(c => new {c.Id, c.Title, c.CompletedAt}));
        }
    }
}
