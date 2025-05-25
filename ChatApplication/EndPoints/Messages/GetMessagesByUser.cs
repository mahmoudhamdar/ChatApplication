using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using WebApplication1.DTOs.MessageDTO;
using WebApplication1.Mappers.Mapping;
using WebApplication1.Repository.IRepository;

namespace WebApplication1.EndPoints.Messages;

    public class GetMessagesByUser : Ep.NoReq.Res<Results<Ok<IEnumerable<MessageResponse>>,NotFound,BadRequest>>
    {
        
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapping _messageMapper;
        public GetMessagesByUser(IUnitOfWork unitOfWork, IMapping messageMapper)
        {
            _unitOfWork = unitOfWork;
            _messageMapper = messageMapper;
        }
        public override void Configure()
        {
            Get("/api/messagesUser/{id}");
            AllowAnonymous();
        }

        public override async Task<Results<Ok<IEnumerable<MessageResponse>>,NotFound,BadRequest>> ExecuteAsync(CancellationToken ct)
        {
            var id = Route<string>("id");

            if (id is null or "")
            {
                return TypedResults.BadRequest();
            }
            
            var messages=  await _unitOfWork.MessageRepository
                .GetAsync(x=>x.senderId.Equals(id) || x.recieverId.Equals(id) );
            if (messages is null)
            {
                return TypedResults.NotFound();
            }            
            var res=_messageMapper.MessageMapper.MessagesToResponses(messages);
            
            return TypedResults.Ok(res);
            
            
        }
    }