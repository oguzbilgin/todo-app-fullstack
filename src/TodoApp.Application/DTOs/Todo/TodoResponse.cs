namespace TodoApp.Application.DTOs.Todo;

public class TodoResponse
{
    public Guid Id { get; set; }
    public string Title { get; set; } = null!;
    public DateTime DueDate { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime? CompletedAt { get; set; }
}
