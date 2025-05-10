using ChatApplication.DTOs.UserDTO;
using ChatApplication.Models;

namespace ChatApplication.Mappers.UserMapper;

public interface IUserMapper
{
    
    public UserResponse UserToResponse(User user);
    public User RequestToUser(UserRequest userRequest);
    public IEnumerable<UserResponse> UserToResponses(IEnumerable<User> user);
    
    
}