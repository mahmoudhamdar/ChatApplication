using ChatApplication.Mappers.UserMapper;
using ChatApplication.Mappers.MessageMapper;
using ChatApplication.Mappers.ChatRoomMapper;
namespace ChatApplication.Mappers.Mapping;

public interface IMapping
{
    public IMessageMapper MessageMapper { get; }
    public IChatRomMapper ChatRomMapper { get; }
    public IUserMapper UserMapper { get; }
  
    
}