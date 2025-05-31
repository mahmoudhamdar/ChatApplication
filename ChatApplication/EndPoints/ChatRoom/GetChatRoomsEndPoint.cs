using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using WebApplication1.DTOs.ChatRoomDTO;
using WebApplication1.Mappers.Mapping;
using WebApplication1.Repository.IRepository;

namespace WebApplication1.EndPoints.ChatRoom;

public class GetChatRoomsEndPoint : 
EndpointWithoutRequest<Results<Ok<IEnumerable<ChatRoomResponse>>, NotFound>>
{
  private IMapping _chatRoomMapper;
    private IUnitOfWork _unitOfWork;

public GetChatRoomsEndPoint(IMapping chatRoomMapper, IUnitOfWork unitOfWork)
    {
        _chatRoomMapper = chatRoomMapper;
        _unitOfWork = unitOfWork;
    }
    public override void Configure()
    {
        Get("/api/chatroom");
        AllowAnonymous();
    }
    
    public override async Task<Results<Ok<IEnumerable<ChatRoomResponse>>, NotFound>> ExecuteAsync(CancellationToken ct)
    {
        var chatrooms = await _unitOfWork.ChatRoomRepository.GetallAsync();
        var response = _chatRoomMapper.ChatRomMapper.ChatRoomsToResponses(chatrooms);
        
       return TypedResults.Ok(response);
        
        
    }
}