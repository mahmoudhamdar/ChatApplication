using WebApplication1.DTOs.UserDTO;
using WebApplication1.Models;

namespace WebApplication1.Mappers.UserMapper;

public interface IUserMapper
{
    
    public UserResponse UserToResponse(User user);
    public User RequestToUser(UserRequest userRequest);
    public IEnumerable<UserResponse> UserToResponses(IEnumerable<User> user);
    
    
}