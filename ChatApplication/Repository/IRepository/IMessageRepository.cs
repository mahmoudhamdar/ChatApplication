using WebApplication1.Models;

namespace WebApplication1.Repository.IRepository;

public interface IMessageRepository : IRepository<Message>
{
    public Task UpdateAsync(string id, Message entity);
}