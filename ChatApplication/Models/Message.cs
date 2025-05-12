namespace WebApplication1.Models;

public class Message
{
    public Message()
    {
        MessageId = Guid.NewGuid().ToString();
    }

    public string MessageId { get; set; }
    public string senderId { get; set; }
    public string recieverId { get; set; }
    public string content { get; set; }

    public DateTime TimeStamp { get; set; }

    public string UserId { get; set; }
    public User User { get; set; }
    public string RoomId { get; set; }
    public ChatRoom ChatRoom { get; set; }
}