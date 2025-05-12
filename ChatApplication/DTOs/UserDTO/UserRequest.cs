using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace WebApplication1.DTOs.UserDTO;

public class UserRequest
{
   
    
     
        public string? Username { get; set; }
       
        [EmailAddress]
        public string? Email { get; set; }
     
        
        public string Password { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastLogin { get; set; }
        
    

}
