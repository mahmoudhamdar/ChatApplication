using ChatApplication.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ChatApplication.Data;

public class ChatAppContext : IdentityDbContext<User>
{
    public ChatAppContext(DbContextOptions<ChatAppContext> options) : base(options)
    {
    }

    public new DbSet<User> Users { get; set; }
    public DbSet<ChatRoom> ChatRooms { get; set; }
    public DbSet<UserChatRoom> UserChatRooms { get; set; }
    public DbSet<Message> Messages { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        var roles = new List<IdentityRole>
        {
            new()
            {
                Name = "Admin",
                NormalizedName = "ADMIN"
            },
            new()
            {
                Name = "User",
                NormalizedName = "USER"
            }
        };

        modelBuilder.Entity<IdentityRole>().HasData(roles);

        //Users
        modelBuilder.Entity<User>()
            .HasKey(u => u.Id);

        modelBuilder.Entity<User>()
            .HasMany(u => u.Messages)
            .WithOne(u => u.User);
        modelBuilder.Entity<User>()
            .HasMany(u => u.UserChatRooms)
            .WithOne(u => u.User);

        //Messages
        modelBuilder.Entity<Message>()
            .HasKey(m => m.MessageId);
        modelBuilder.Entity<Message>()
            .HasOne(m => m.User)
            .WithMany(m => m.Messages)
            .HasForeignKey(m => m.UserId);
        modelBuilder.Entity<Message>()
            .HasOne(m => m.ChatRoom)
            .WithMany(m => m.Messages)
            .HasForeignKey(m => m.RoomId);
        //ChatRoom    
        modelBuilder.Entity<ChatRoom>()
            .HasKey(cr => cr.RoomId);
        modelBuilder.Entity<ChatRoom>()
            .HasMany(cr => cr.UserChatRoom)
            .WithOne(cr => cr.ChatRoom)
            .HasForeignKey(cr => cr.RoomId);
        //UserChatRooms
        modelBuilder.Entity<UserChatRoom>()
            .HasKey(ucr => new{ucr.UserId,ucr.RoomId});
        modelBuilder.Entity<UserChatRoom>()
            .HasOne(ucr => ucr.User)
            .WithMany(ucr => ucr.UserChatRooms)
            .HasForeignKey(ucr => ucr.UserId);
        modelBuilder.Entity<UserChatRoom>()
            .HasOne(ucr => ucr.ChatRoom)
            .WithMany(ucr => ucr.UserChatRoom)
            .HasForeignKey(ucr => ucr.RoomId);
    }
}