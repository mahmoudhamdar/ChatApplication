

namespace ChatApplication.Models;

public class ChatRoom
{
    public ChatRoom()
    {
        RoomId = Guid.NewGuid().ToString();
        
    }
    public  string RoomId { get; set; }
    public string RoomName { get; set; }
    public string LastMessage { get; set; }
    public DateTime CreatedAt { get; set; }

    
    public IEnumerable<Message> Messages { get; set; }

    public IEnumerable<UserChatRoom> UserChatRoom { get; set; }
}