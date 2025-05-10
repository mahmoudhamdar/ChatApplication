using System.ComponentModel.DataAnnotations;

namespace ChatApplication.DTOs.UserDTO;

public class UserLogin
{
     [Required( ErrorMessage = "Username is required")]
     public string Username { get; set; }
     [Required( ErrorMessage = "Password is required")]
     [MinLength( 6, ErrorMessage = "Password must be at least 6 characters long")]
     public string Password { get; set; }
}