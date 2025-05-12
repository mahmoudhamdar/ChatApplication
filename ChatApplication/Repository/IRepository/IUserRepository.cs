using WebApplication1.Models;

namespace WebApplication1.Repository.IRepository;
using WebApplication1.Models;
public interface IUserRepository:IRepository<User>
{
    public Task UpdateAsync(string id ,User entity);
}