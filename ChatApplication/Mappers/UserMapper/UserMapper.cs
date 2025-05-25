using WebApplication1.Services;
using WebApplication1.DTOs.UserDTO;
using WebApplication1.Models;

namespace WebApplication1.Mappers.UserMapper;

public class UserMapper:IUserMapper
{
    
   
    
    public UserResponse UserToResponse(User user)
    {


        var userResponse = new UserResponse
        {
            Id = user.Id,
            Username = user.UserName,
            Email = user.Email,
            CreatedAt = user.CreatedAt,
            UpdatedAt = user.UpdatedAt,
            LastLogin = user.LastLogin
        };
    
    return userResponse;
        
    }

    public User RequestToUser(UserRequest userRequest)
    {
        var user = new User
        {
            UserName = userRequest.Username,
            Email = userRequest.Email,
            PasswordHash = userRequest.Password,
            CreatedAt = userRequest.CreatedAt,
            UpdatedAt = userRequest.UpdatedAt,
            LastLogin = userRequest.LastLogin
        };

        return user;
    }

    public IEnumerable<UserResponse> UserToResponses(IEnumerable<User> user)
    {
        var users = user.Select(UserToResponse);
        return users;
        
    }
}