using ChatApplication.Models;
using ChatApplication.DTOs.ChatRoomDTO;
using ChatApplication.Models;

namespace ChatApplication.Mappers.ChatRoomMapper;

public interface IChatRomMapper
{
    public IEnumerable<ChatRoomResponse> ChatRoomsToResponses(IEnumerable<ChatRoom> chatRooms);

    public ChatRoomResponse ChatRoomToResponse(ChatRoom chatRoom);


    public ChatRoom RequestToChatRoom(ChatRoomRequest chatRoom);
}