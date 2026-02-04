using Microsoft.EntityFrameworkCore;
using TodoApp.Domain.Entities;

namespace TodoApp.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Todo> Todos => Set<Todo>();
        public DbSet<CompletedTodo> CompletedTodos => Set<CompletedTodo>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.Id);
                entity.HasIndex(u => u.Email).IsUnique();
                entity.Property(u => u.Email).IsRequired();
                entity.Property(u => u.PasswordHash).IsRequired();
            });

            modelBuilder.Entity<Todo>(entity =>
            {
                entity.HasKey(t => t.Id);
                entity.Property(t => t.Title).IsRequired();
                entity.HasOne(t => t.User)
                      .WithMany(u => u.Todos)
                      .HasForeignKey(t => t.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<CompletedTodo>(entity =>
            {
                entity.HasKey(c => c.Id);
                entity.Property(c => c.Title).IsRequired();
                entity.HasOne(c => c.User)
                      .WithMany()
                      .HasForeignKey(c => c.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
