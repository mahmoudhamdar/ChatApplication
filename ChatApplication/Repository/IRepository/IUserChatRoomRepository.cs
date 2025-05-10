using ChatApplication.Models;

namespace ChatApplication.Repository.IRepository;

public interface IUserChatRoomRepository:IRepository<UserChatRoom>
{
    public Task UpdateAsync(KeyValuePair<string,string> id ,UserChatRoom entity);
}