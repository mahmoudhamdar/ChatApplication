using WebApplication1.Services;
using WebApplication1.Mappers.ChatRoomMapper;
using WebApplication1.Mappers.MessageMapper;
using WebApplication1.Mappers.UserMapper;

namespace WebApplication1.Mappers.Mapping;

public class Mapping : IMapping
{   
    public Mapping()
    {
        
        
        MessageMapper = new MessageMapper.MessageMapper();
        ChatRomMapper = new ChatRoomMapper.ChatRoomMapper();
       UserMapper = new UserMapper.UserMapper();
    }

    public IChatRomMapper ChatRomMapper { get; }
    public IUserMapper UserMapper { get; }
    public IMessageMapper MessageMapper { get; }
 
}