using ChatApplication.DTOs.UserDTO;
using ChatApplication.Mappers.Mapping;
using ChatApplication.Repository.IRepository;
using FastEndpoints;
using Microsoft.AspNetCore.Authorization;

namespace ChatApplication.EndPoints.User;
   
    public class GetUserEndPoint : Endpoint<UserRequest, UserResponse>
    {
        
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapping _userMapper;

        public GetUserEndPoint(IUnitOfWork unitOfWork, IMapping userMapper)
        {
            _unitOfWork = unitOfWork;
            _userMapper = userMapper;
        }
        public override void Configure()
        {
            Get("/api/user/{id}");
            AllowAnonymous();
        }

        public override async Task HandleAsync(UserRequest req, CancellationToken ct)
        {
            var id = Route<string>("id");

            var user = _unitOfWork.UserRepository.GetAsync(user=>user.Id.Equals(id)).Result.FirstOrDefault();
            
            var res=_userMapper.UserMapper.UserToResponse(user);
            await SendOkAsync(res, ct);
        }
    }