namespace ChatApplication.Repository.IRepository;
using ChatApplication.Models;
public interface IUserRepository:IRepository<User>
{
    public Task UpdateAsync(string id ,User entity);
}