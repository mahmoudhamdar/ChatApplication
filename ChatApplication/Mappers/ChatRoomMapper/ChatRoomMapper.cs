using WebApplication1.DTOs.ChatRoomDTO;
using WebApplication1.Models;

namespace WebApplication1.Mappers.ChatRoomMapper;

public class ChatRoomMapper : IChatRomMapper
{
    public IEnumerable<ChatRoomResponse> ChatRoomsToResponses(IEnumerable<ChatRoom> chatRooms)
    {
        var responses = chatRooms.Select(ChatRoomToResponse);

        return responses;
    }

    public ChatRoomResponse ChatRoomToResponse(ChatRoom chatRoom)
    {
        
        
        var chatrooms = new ChatRoomResponse
        {
            RoomId = chatRoom.RoomId,
            RoomName = chatRoom.RoomName,
            CreatedAt = chatRoom.CreatedAt,
            LastMessage = chatRoom.LastMessage
        };
        return chatrooms;
    }

    public ChatRoom RequestToChatRoom(ChatRoomRequest chatRoomRequest)
    {
        var chatRoom = new ChatRoom
        {
            RoomName = chatRoomRequest.RoomName,
            CreatedAt = DateTime.Now,
            LastMessage = string.Empty
        };
        return chatRoom;
    }
}