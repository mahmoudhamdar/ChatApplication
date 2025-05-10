using ChatApplication.Mappers.Mapping;
using ChatApplication.Repository.IRepository;
using ChatApplication.DTOs.ChatRoomDTO;
using FastEndpoints;

namespace ChatApplication.EndPoints.ChatRoom;

public class GetChatRoomsEndPoint : EndpointWithoutRequest<IEnumerable<ChatRoomResponse>>
{
    private readonly IMapping _chatRoomMapper;
    private readonly IUnitOfWork _unitOfWork;
   

    public GetChatRoomsEndPoint(IUnitOfWork unitOfWork, IMapping chatRoomMapper)
    {
        _unitOfWork = unitOfWork;
        _chatRoomMapper = chatRoomMapper;
    }


    public override void Configure()
    {
        Get("/api/chatroom");
        AllowAnonymous();
    }


    public override async Task HandleAsync(CancellationToken ct)
    {
    
        var chatrooms = _unitOfWork.ChatRoomRepository.GetallAsync().Result;
        var response = _chatRoomMapper.ChatRomMapper.ChatRoomsToResponses(chatrooms);
       
        
        
        await SendOkAsync(response, ct);
    }
}