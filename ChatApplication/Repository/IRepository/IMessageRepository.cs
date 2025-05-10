
using ChatApplication.Models;

namespace ChatApplication.Repository.IRepository;

public interface IMessageRepository : IRepository<Message>
{
    public Task UpdateAsync(string id, Message entity);
}