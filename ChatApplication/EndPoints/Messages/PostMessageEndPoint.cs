using ChatApplication.Mappers.Mapping;
using ChatApplication.Models;
using ChatApplication.Repository.IRepository;
using ChatApplication.DTOs.MessageDTO;
using ChatApplication.Repository.IRepository;
using FastEndpoints;

namespace ChatApplication.EndPoints.Messages;

public class PostMessageEndPoint : Endpoint<MessageRequest, MessageResponse>
{
    private readonly IMapping _messageMapper;
    private readonly IUnitOfWork _unitOfWork;

    public PostMessageEndPoint(IUnitOfWork unitOfWork, IMapping mapper)
    {
        _unitOfWork = unitOfWork;
        _messageMapper = mapper;
    }

    public override void Configure()
    {
        Post("/api/message");
        AllowAnonymous();
    }


    public override async Task HandleAsync(MessageRequest req, CancellationToken ct)
    {
        if (req is null) await SendNotFoundAsync(ct);
        var msg = _messageMapper.MessageMapper.MessageRequestToMessage(req);
        var res = _messageMapper.MessageMapper.MessageToResponse(msg);
        await _unitOfWork.MessageRepository.AddAsync(msg);
        await SendAsync(res, 201, ct);
    }
}