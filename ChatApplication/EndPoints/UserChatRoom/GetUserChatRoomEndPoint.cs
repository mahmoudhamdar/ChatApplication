using FastEndpoints;
using WebApplication1.Repository.IRepository;

namespace WebApplication1.EndPoints.UserChatRoom;

    public class GetUserChatRoomEndPoint : EndpointWithoutRequest<IEnumerable< Models.UserChatRoom>>
    {
        private readonly IUnitOfWork _unitOfWork;
        public GetUserChatRoomEndPoint(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        
        public override void Configure()
        {
            Get("/api/userChatRoom");
            AllowAnonymous();
        }

        public override async Task HandleAsync( CancellationToken ct)
        {
            var userChatroom = await _unitOfWork.UserChatRoomRepository.GetallAsync();
            
            await SendOkAsync(userChatroom, ct);
            
        }
    }