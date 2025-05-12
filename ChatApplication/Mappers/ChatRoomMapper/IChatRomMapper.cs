using WebApplication1.DTOs.ChatRoomDTO;
using WebApplication1.Models;

namespace WebApplication1.Mappers.ChatRoomMapper;

public interface IChatRomMapper
{
    public IEnumerable<ChatRoomResponse> ChatRoomsToResponses(IEnumerable<ChatRoom> chatRooms);

    public ChatRoomResponse ChatRoomToResponse(ChatRoom chatRoom);


    public ChatRoom RequestToChatRoom(ChatRoomRequest chatRoom);
}