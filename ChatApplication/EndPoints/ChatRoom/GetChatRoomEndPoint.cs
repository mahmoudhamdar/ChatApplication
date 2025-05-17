using WebApplication1.Models;
using FastEndpoints;
using WebApplication1.DTOs.ChatRoomDTO;
using WebApplication1.Mappers.Mapping;
using WebApplication1.Repository.IRepository;

namespace WebApplication1.EndPoints;

public class GetChatRoomEndPoint : Ep.NoReq.Res<IEnumerable<ChatRoomResponse>>
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

            var userChatRooms = await _unitOfWork.UserChatRoomRepository
                .GetAsync(x=>x.UserId.Equals(id));
            var chatroomIds = userChatRooms.Select(x => x.RoomId).ToList();

            var chatRooms= await _unitOfWork.ChatRoomRepository
                .GetAsync(x => chatroomIds.Contains(x.RoomId));
            
            
            var response = _chatRoomMapper.ChatRomMapper.ChatRoomsToResponses(chatRooms);
            await SendOkAsync(response, ct);

        }
    }
    


