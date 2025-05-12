using WebApplication1.Mappers.ChatRoomMapper;
using WebApplication1.Mappers.MessageMapper;
using WebApplication1.Mappers.UserMapper;

namespace WebApplication1.Mappers.Mapping;

public interface IMapping
{
    public IMessageMapper MessageMapper { get; }
    public IChatRomMapper ChatRomMapper { get; }
    public IUserMapper UserMapper { get; }
  
    
}