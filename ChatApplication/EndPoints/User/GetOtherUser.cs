using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using WebApplication1.DTOs.UserDTO;
using WebApplication1.Mappers.Mapping;
using WebApplication1.Repository.IRepository;

namespace WebApplication1.EndPoints.User;

    public class GetOtherUser : Ep.NoReq.Res<Results<Ok<IEnumerable<UserResponse>>,NotFound>>
    {
        
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapping _userMapper;
        
        public GetOtherUser(IUnitOfWork unitOfWork, IMapping userMapper)
        {
            _unitOfWork = unitOfWork;
            _userMapper = userMapper;
        }
        
        public override void Configure()
        {
            Get("/api/user/otherUser/{id}");
            AllowAnonymous();
        }

        public override async Task<Results<Ok<IEnumerable<UserResponse>>,NotFound>> ExecuteAsync (CancellationToken ct)
        {
            var id =Route<string>("id");
            
            var userchatRoom= await  _unitOfWork.UserChatRoomRepository
                .GetAsync(x=>x.RoomId.Equals(id));
            if (userchatRoom is null)
            {
                return TypedResults.NotFound();
            }
            var userIds = userchatRoom.Select(x => x.UserId).ToList();
            
            var userList =  await _unitOfWork.UserRepository
                .GetAsync(x => userIds.Contains(x.Id));

            return TypedResults.Ok(_userMapper.UserMapper.UserToResponses(userList));
        }
    }
  