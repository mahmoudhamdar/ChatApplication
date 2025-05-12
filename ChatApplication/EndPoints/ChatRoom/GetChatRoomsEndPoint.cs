using FastEndpoints;
using WebApplication1.DTOs.ChatRoomDTO;
using WebApplication1.Mappers.Mapping;
using WebApplication1.Repository.IRepository;

namespace WebApplication1.EndPoints.ChatRoom;

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