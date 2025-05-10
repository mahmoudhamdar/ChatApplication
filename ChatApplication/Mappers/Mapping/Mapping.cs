using ChatApplication.Mappers.UserMapper;
using ChatApplication.Mappers.MessageMapper;
using ChatApplication.Mappers.ChatRoomMapper;
using ChatApplication.Services;

namespace ChatApplication.Mappers.Mapping;

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