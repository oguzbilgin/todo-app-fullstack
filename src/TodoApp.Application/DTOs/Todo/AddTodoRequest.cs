namespace TodoApp.Application.DTOs.Todo;

public class AddTodoRequest
{
  public Guid UserId { get; set; }
  public string Title { get; set; } = null!;
  public DateTime DueDate { get; set; }
}
