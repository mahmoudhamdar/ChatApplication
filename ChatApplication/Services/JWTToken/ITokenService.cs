using WebApplication1.Models;

namespace WebApplication1.Services;

public interface ITokenService
{
    public string CreateToken(User user);
}