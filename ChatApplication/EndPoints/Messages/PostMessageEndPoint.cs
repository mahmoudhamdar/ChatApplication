using WebApplication1.Models;
using FastEndpoints;
using WebApplication1.DTOs.MessageDTO;
using WebApplication1.Mappers.Mapping;
using WebApplication1.Repository.IRepository;

namespace WebApplication1.EndPoints.Messages;

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
        
        var msg = _messageMapper.MessageMapper.MessageRequestToMessage(req);
        var res = _messageMapper.MessageMapper.MessageToResponse(msg);
        await _unitOfWork.MessageRepository.AddAsync(msg);
        await SendAsync(res, 201, ct);
    }
}