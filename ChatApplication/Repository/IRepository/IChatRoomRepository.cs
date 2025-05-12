using WebApplication1.Models;

namespace WebApplication1.Repository.IRepository;

public interface IChatRoomRepository:IRepository<ChatRoom>
{
    public Task UpdateAsync(string id ,ChatRoom entity);
}