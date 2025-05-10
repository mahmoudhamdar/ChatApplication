using ChatApplication.Models;

namespace ChatApplication.Services;

public interface ITokenService
{
    public string CreateToken(User user);
}