using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace WebApplication1.Models;

public sealed class User : IdentityUser
{
    public User()
    {
        Id = Guid.NewGuid().ToString();
    }

    public override string UserName { get; set; }=string.Empty;
    
    [MaxLength( 255, ErrorMessage = "Email must be less than 255 characters")]
    public new string  Email { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? LastLogin { get; set; }

    
    public ICollection<UserChatRoom> UserChatRooms { get; set; }
    public ICollection<Message> Messages { get; set; }
}