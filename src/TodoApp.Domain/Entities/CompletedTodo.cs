namespace TodoApp.Domain.Entities;

public class CompletedTodo
{
  public Guid Id { get; set; }
  public string Title { get; set; } = null!;
  public DateTime CompletedAt { get; set; }
  public Guid UserId { get; set; }
  public User User { get; set; } = null!;
}