using FastEndpoints;
using WebApplication1.DTOs.ChatRoomDTO;
using WebApplication1.Mappers.Mapping;
using WebApplication1.Repository.IRepository;


namespace WebApplication1.EndPoints.ChatRoom
{
    public class PostChatRoomEndPoint : Endpoint<ChatRoomRequest, ChatRoomResponse>
    {
        private readonly IMapping _chatRoomMapper;
        private readonly IUnitOfWork _unitOfWork;

        public PostChatRoomEndPoint(IMapping chatRoomMapper, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _chatRoomMapper = chatRoomMapper;
        }


        public override void Configure()
        {
            Post("/api/chatroom");
            AllowAnonymous();
        }

        public override async Task HandleAsync(ChatRoomRequest req, CancellationToken ct)
        {
            var chatroom = _chatRoomMapper.ChatRomMapper.RequestToChatRoom(req);
            await _unitOfWork.ChatRoomRepository.AddAsync(chatroom);
            await SendAsync(_chatRoomMapper.ChatRomMapper.ChatRoomToResponse(chatroom), 201, ct);
        }
    }
}