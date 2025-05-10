using ChatApplication.Data;
using ChatApplication.Repository.IRepository;

namespace ChatApplication.Repository;

public class UnitOfWork : IUnitOfWork
{
    private readonly ChatAppContext _chatAppContext;

    public UnitOfWork(ChatAppContext chatAppContext)
    {
        _chatAppContext = chatAppContext;
        MessageRepository = new MessageRepository(_chatAppContext);
        UserRepository = new UserRepository(_chatAppContext);
        UserChatRoomRepository = new UserChatRoomRepository(_chatAppContext);
        ChatRoomRepository = new ChatRoomRepository(_chatAppContext);
    }

    public IMessageRepository MessageRepository { get; }
    public IUserChatRoomRepository UserChatRoomRepository { get; }
    public IUserRepository UserRepository { get; }
    public IChatRoomRepository ChatRoomRepository { get; }
}