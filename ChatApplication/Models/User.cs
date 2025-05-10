using Microsoft.AspNetCore.Identity;

namespace ChatApplication.Models;

public sealed class User : IdentityUser
{
    public User()
    {
        Id = Guid.NewGuid().ToString();
    }
    
    public string Email { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? LastLogin { get; set; }


    public IEnumerable<UserChatRoom> UserChatRooms { get; set; }
    public IEnumerable<Message> Messages { get; set; }
}