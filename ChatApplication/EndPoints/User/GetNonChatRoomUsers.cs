using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using WebApplication1.DTOs.UserDTO;
using WebApplication1.Mappers.Mapping;
using WebApplication1.Repository.IRepository;

namespace WebApplication1.EndPoints.User;


    
    public class GetNonChatRoomUsers : Ep.NoReq.Res<Results<Ok<IEnumerable<UserResponse>>,NotFound>>
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
            Get("/api/user/noChatRoomUsers/{id}");
            AllowAnonymous();
        }

        public override async Task<Results<Ok<IEnumerable<UserResponse>>, NotFound>> ExecuteAsync( CancellationToken ct)
        { 
            var id = Route<string>("id");
            
            var userChatRoomsRes = await _unitOfWork
                .UserChatRoomRepository
                .GetallAsync();
            var userChatRooms = userChatRoomsRes.Where(x=>x.UserId.Equals(id)).ToList();
            var ChatRoomsList = userChatRooms
                .Select(x=>x.RoomId).ToList();

            if (userChatRooms is null)
               return TypedResults.NotFound();

            var userList = userChatRoomsRes.Where(x =>ChatRoomsList.Contains(x.RoomId))
                .Select(x => x.UserId).ToList();
          
            var usersNotInChatRoom = await _unitOfWork.UserRepository
                .GetAsync(x => !userList.Contains(x.Id));
            if (usersNotInChatRoom is null)
               return TypedResults.NotFound();

            var response =_userMapper.UserMapper.UserToResponses(usersNotInChatRoom);
            
           return TypedResults.Ok(response);
           
        }

    }