using ChatApplication.Repository.IRepository;
using FastEndpoints;

namespace ChatApplication.EndPoints.UserChatRoom;

    public class PostUserChatRoomEndPoint : Endpoint<Models.UserChatRoom, Models.UserChatRoom>
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

        public override async Task HandleAsync(Models.UserChatRoom req, CancellationToken ct)
        {
            
            
            var exists = await _unitOfWork.UserChatRoomRepository
                .GetAsync(x => x.UserId == req.UserId && x.RoomId == req.RoomId);


            if (exists.Any())
            {
                await SendErrorsAsync(400, ct);
                return; // Important to return here
            }

            await _unitOfWork.UserChatRoomRepository.AddAsync(req);
            
            await SendAsync(req, 200, ct);
        }
        
      
    }

