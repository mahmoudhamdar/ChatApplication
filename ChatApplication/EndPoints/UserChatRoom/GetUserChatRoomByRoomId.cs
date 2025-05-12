using FastEndpoints;
using WebApplication1.Repository.IRepository;

namespace WebApplication1.EndPoints.UserChatRoom;


    public class GetUserChatRoomByRoomId : EndpointWithoutRequest<IEnumerable<Models.UserChatRoom>>
    {
        private readonly IUnitOfWork _unitOfWork;
       

        public GetUserChatRoomByRoomId(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
           
        }
        
        public override void Configure()
        {
            Get("/api/userChatRoom/${id}");
            AllowAnonymous();
        }

        public override async Task HandleAsync( CancellationToken ct)
        {
            var id = Route<string>("id");
            
            var users= await _unitOfWork.UserChatRoomRepository
                .GetAsync(x => x.RoomId.Equals(id));
            
            await SendOkAsync(users, ct);


        }
    }