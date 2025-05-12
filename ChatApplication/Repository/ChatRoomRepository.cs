using WebApplication1.Data;
using WebApplication1.Models;
using WebApplication1.Repository.IRepository;

namespace WebApplication1.Repository;

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