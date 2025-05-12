using WebApplication1.Data;
using WebApplication1.Models;
using IMessageRepository = WebApplication1.Repository.IRepository.IMessageRepository;


namespace WebApplication1.Repository;

using IMessageRepository = IRepository.IMessageRepository;

public class MessageRepository : Repository<Message>, IMessageRepository
{
    public MessageRepository(ChatAppContext chatAppContext) : base(chatAppContext)
    {
    }

    public async Task UpdateAsync(string id, Message entity)
    {
        var message = GetAsync(p => p.MessageId.Equals(id)).Result.FirstOrDefault();

        message.ChatRoom = entity.ChatRoom;
        message.content = entity.content;
        message.TimeStamp = entity.TimeStamp;
        message.User = entity.User;
        message.RoomId = entity.RoomId;
        message.UserId = entity.UserId;

        await SaveAsync();
    }
}