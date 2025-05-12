namespace WebApplication1.Repository.IRepository;

public interface IUnitOfWork
{
    public IMessageRepository MessageRepository { get; }
    public IUserChatRoomRepository UserChatRoomRepository { get; }
    public IUserRepository UserRepository { get; }
    public IChatRoomRepository ChatRoomRepository { get; }
}