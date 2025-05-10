using ChatApplication.Models;

namespace ChatApplication.Repository.IRepository;

public interface IChatRoomRepository:IRepository<ChatRoom>
{
    public Task UpdateAsync(string id ,ChatRoom entity);
}