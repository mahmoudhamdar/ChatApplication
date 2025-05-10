using ChatApplication.Models;
using ChatApplication.Data;
using ChatApplication.Repository.IRepository;

namespace ChatApplication.Repository;


public class UserChatRoomRepository : Repository<UserChatRoom>, IUserChatRoomRepository
{
    public UserChatRoomRepository(ChatAppContext chatAppContext) : base(chatAppContext)
    {
    }

    public async Task UpdateAsync(KeyValuePair<string,string> id, UserChatRoom entity)
    {
        var userChatRoom = GetAsync(p => new{p.RoomId,p.UserId}.Equals(id)).Result.FirstOrDefault();

        userChatRoom.RoomId = entity.RoomId;
        userChatRoom.User = entity.User;
        // userChatRoom.UserId=entity.UserId;
        userChatRoom.ChatRoom = entity.ChatRoom;

        await SaveAsync();
    }
}