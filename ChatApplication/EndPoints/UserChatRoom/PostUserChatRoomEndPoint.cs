using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using WebApplication1.Repository.IRepository;

namespace WebApplication1.EndPoints.UserChatRoom;

    public class PostUserChatRoomEndPoint : Ep.Req<Models.UserChatRoom>.Res< Results<Ok<Models.UserChatRoom>,BadRequest<string>>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public PostUserChatRoomEndPoint(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        
        public override void Configure()
        {
            Post("/api/userChatRoom");
            AllowAnonymous();
        }

        public override async Task<Results<Ok< Models.UserChatRoom>,BadRequest<string>>> ExecuteAsync(Models.UserChatRoom req, CancellationToken ct)
        {
            
            
            var exists = await _unitOfWork.UserChatRoomRepository
                .GetAsync(x => x.UserId.Equals(req.UserId)&& x.RoomId.Equals(req.RoomId));


            if (exists.Any())
            {
                return TypedResults.BadRequest("already exists");
               
            }

            await _unitOfWork.UserChatRoomRepository.AddAsync(req);
            
           return TypedResults.Ok(req);
        }
        
      
    }

