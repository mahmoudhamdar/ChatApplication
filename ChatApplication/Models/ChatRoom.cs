

namespace WebApplication1.Models;

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

    
    public ICollection<Message> Messages { get; set; }

    public ICollection<UserChatRoom> UserChatRoom { get; set; }
}