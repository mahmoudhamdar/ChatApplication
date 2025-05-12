using WebApplication1.Models;
using FastEndpoints;
using WebApplication1.DTOs.ChatRoomDTO;
using WebApplication1.Mappers.Mapping;
using WebApplication1.Repository.IRepository;

namespace WebApplication1.EndPoints;

public class GetChatRoomEndPoint : EndpointWithoutRequest<ChatRoomResponse>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapping _chatRoomMapper ;

   public GetChatRoomEndPoint(IUnitOfWork unitOfWork,IMapping chatRoomMapper)
    {
        _chatRoomMapper = chatRoomMapper;
        _unitOfWork = unitOfWork;
    }


public override void Configure()
        {
            Get("/api/chatroom/{id}");
            AllowAnonymous();
        }

        public override async Task HandleAsync(CancellationToken ct)
        {
            var id = Route<string>("id");

            var messege = _unitOfWork.ChatRoomRepository
                .GetAsync(x => x.RoomId.Equals(id)).Result.FirstOrDefault();
            
            var response = _chatRoomMapper.ChatRomMapper.ChatRoomToResponse(messege);
            await SendOkAsync(response, ct);

        }
    }
    


