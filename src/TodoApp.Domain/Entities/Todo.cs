namespace TodoApp.Domain.Entities;

public class Todo
{
  public Guid Id { get; set; }
  public string Title { get; set; } = null!;
  public DateTime DueDate { get; set; }
  public bool IsCompleted { get; set; }
  public Guid UserId { get; set; }
  public User User { get; set; } = null!;
}