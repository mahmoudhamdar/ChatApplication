
using ChatApplication.DTOs.MessageDTO;
using ChatApplication.Models;

namespace ChatApplication.Mappers.MessageMapper;

public class MessageMapper : IMessageMapper
{
    public IEnumerable<MessageResponse> MessagesToResponses(IEnumerable<Message> messages)
    {
        var responses = messages.Select(MessageToResponse);

        return responses;
    }

    public Message MessageRequestToMessage(MessageRequest messageRequest)
    {
        var message = new Message
        {
            content = messageRequest.Content,
            TimeStamp = DateTime.UtcNow,
            RoomId = messageRequest.RoomId,
            UserId = messageRequest.UserId,
            senderId = messageRequest.senderId,
            recieverId = messageRequest.recieverId
        };

        return message;
    }

    public MessageResponse MessageToResponse(Message message)
    {
        var messageResponse = new MessageResponse
        {
            Content = message.content,
            TimeStamp = message.TimeStamp,
            RoomId = message.RoomId,
            MessageId = message.MessageId,
            UserId = message.UserId,
            senderId = message.senderId,
            recieverId = message.recieverId
        };


        return messageResponse;
    }
}