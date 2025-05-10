using ChatApplication.DTOs.MessageDTO;
using ChatApplication.Models;

namespace ChatApplication.Mappers.MessageMapper;

public interface IMessageMapper
{
    public IEnumerable<MessageResponse> MessagesToResponses(IEnumerable<Message> messages);

    public Message MessageRequestToMessage(MessageRequest messageRequest);

    public MessageResponse MessageToResponse(Message message);
}