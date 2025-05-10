namespace ChatApplication.Models;

public class UserChatRoom
{
   

    public string UserId { get; set; }
    public User User { get; set; }
    public string RoomId { get; set; }
    
    public ChatRoom ChatRoom { get; set; }
}