using ChatApplication.DTOs.UserDTO;
using ChatApplication.Mappers.Mapping;
using ChatApplication.Repository.IRepository;
using FastEndpoints;

namespace ChatApplication.EndPoints.User;


    
    public class GetNonChatRoomUsers : EndpointWithoutRequest<IEnumerable<UserResponse>>
    {
        
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapping _userMapper;
        
        public GetNonChatRoomUsers(IUnitOfWork unitOfWork, IMapping userMapper)
        {
            _unitOfWork = unitOfWork;
            _userMapper = userMapper;
        }
        
        
        public override void Configure()
        {
            Get("/api/user/noChatRoomUsers/${id}");
            AllowAnonymous();
        }

        public override async Task HandleAsync( CancellationToken ct)
        {
            var id = Route<string>("id");
            
            var userChatRoomsRes = await _unitOfWork.UserChatRoomRepository
                .GetallAsync();
            var userChatRooms = userChatRoomsRes.Where(x=>x.UserId.Equals(id)).ToList();
            var ChatRoomsList = userChatRooms
                .Select(x=>x.RoomId).ToList();

            if (userChatRooms is null)
                await SendErrorsAsync(401, ct);

            var userList = userChatRooms.Where(x =>ChatRoomsList.Contains(x.RoomId)).Select(x => x.UserId).ToList();
          
            var usersNotInChatRoom = await _unitOfWork.UserRepository
                .GetAsync(x => !userList.Contains(x.Id));
            if (usersNotInChatRoom is null)
                await SendErrorsAsync( 400,ct);

            var response =_userMapper.UserMapper.UserToResponses(usersNotInChatRoom);
            
            await SendAsync(response, 200, ct);


        }
    }