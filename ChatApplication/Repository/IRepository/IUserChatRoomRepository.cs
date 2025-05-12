using WebApplication1.Models;

namespace WebApplication1.Repository.IRepository;

public interface IUserChatRoomRepository:IRepository<UserChatRoom>
{
    public Task UpdateAsync(KeyValuePair<string,string> id ,UserChatRoom entity);
}