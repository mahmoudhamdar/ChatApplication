namespace ChatApplication.DTOs.MessageDTO;

public class MessageRequest
{
    public string RoomId { get; set; }
    public string Content { get; set; }
    public string UserId { get; set; }
    public string senderId { get; set; }
    public string recieverId { get; set; }

}