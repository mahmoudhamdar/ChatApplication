using ChatApplication.DTOs.ChatRoomDTO;
using ChatApplication.Mappers.Mapping;
using ChatApplication.Models;
using ChatApplication.Repository.IRepository;
using FastEndpoints;

namespace ChatApplication.EndPoints;

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

            var messege = _unitOfWork.ChatRoomRepository.GetAsync(x => x.RoomId.Equals(id)).Result.FirstOrDefault();
            
            var response = _chatRoomMapper.ChatRomMapper.ChatRoomToResponse(messege);
            await SendOkAsync(response, ct);

        }
    }
    


