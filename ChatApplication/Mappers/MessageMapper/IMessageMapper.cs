using WebApplication1.DTOs.MessageDTO;
using WebApplication1.Models;

namespace WebApplication1.Mappers.MessageMapper;

public interface IMessageMapper
{
    public IEnumerable<MessageResponse> MessagesToResponses(IEnumerable<Message> messages);

    public Message MessageRequestToMessage(MessageRequest messageRequest);

    public MessageResponse MessageToResponse(Message message);
}