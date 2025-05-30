using FastEndpoints;
using WebApplication1.DTOs.MessageDTO;
using WebApplication1.Mappers.Mapping;
using WebApplication1.Repository.IRepository;

namespace WebApplication1.EndPoints.Messages;

public class GetMessageEndPoint : EndpointWithoutRequest<IEnumerable<MessageResponse>>


{
    private readonly IMapping _messageMapper;

    private readonly IUnitOfWork _unitOfWork;

    public GetMessageEndPoint(IUnitOfWork unitOfWork, IMapping messageMapper)
    {
        _messageMapper = messageMapper;
        _unitOfWork = unitOfWork;
    }


    public override void Configure()
    {
        Get("/api/message/{id}");
        AllowAnonymous();
    }


    public override async Task HandleAsync(CancellationToken ct)
    {
        var id = Route<string>("id");
        var messages = _unitOfWork.MessageRepository.GetAsync(p => p.RoomId.Equals(id)).Result;
        var messageresponse = _messageMapper.MessageMapper.MessagesToResponses(messages);


        await SendAsync(messageresponse, 200, ct);
    }
}