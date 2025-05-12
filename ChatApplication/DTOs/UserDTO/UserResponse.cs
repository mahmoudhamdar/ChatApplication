namespace WebApplication1.DTOs.UserDTO;

public class UserResponse
{
    public string Id { get; set; }
    public string? Username { get; set; }
    public string Email { get; set; }
    public string Token { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? LastLogin { get; set; }
}