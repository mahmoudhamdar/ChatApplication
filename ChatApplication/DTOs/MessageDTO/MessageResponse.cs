namespace ChatApplication.DTOs.MessageDTO;

public class MessageResponse
{
    public string MessageId { get; set; }
    public string senderId { get; set; }
    public string recieverId { get; set; }

    public string Content { get; set; }
    public DateTime TimeStamp { get; set; }
    public string RoomId { get; set; }

    public string UserId { get; set; }
}