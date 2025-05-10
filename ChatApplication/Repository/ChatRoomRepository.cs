using ChatApplication.Models;
using ChatApplication.Data;
using ChatApplication.Repository.IRepository;

namespace ChatApplication.Repository;

public class ChatRoomRepository : Repository<ChatRoom>, IChatRoomRepository
{
    public ChatRoomRepository(ChatAppContext chatAppContext) : base(chatAppContext)
    {
    }

    public async Task UpdateAsync(string id, ChatRoom entity)
    {
        var chatRoom = GetAsync(p => p.RoomId.Equals(id)).Result.FirstOrDefault();

        chatRoom.RoomName = entity.RoomName;
        chatRoom.Messages = entity.Messages;
        chatRoom.UserChatRoom = entity.UserChatRoom;
        chatRoom.CreatedAt = entity.CreatedAt;

        await SaveAsync();
    }
}