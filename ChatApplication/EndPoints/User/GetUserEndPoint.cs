using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using WebApplication1.DTOs.UserDTO;
using WebApplication1.Mappers.Mapping;
using WebApplication1.Repository.IRepository;

namespace WebApplication1.EndPoints.User;
   
    public class GetUserEndPoint :Ep.Req<UserRequest>.Res<Results<Ok<UserResponse>,NotFound>> 
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
        
        public override async Task<Results<Ok<UserResponse>, NotFound>> ExecuteAsync(UserRequest req, CancellationToken ct)
        {
            var id = Route<string>("id");

            var user = await _unitOfWork.UserRepository.GetAsync(user => user.Id.Equals(id));
            
            if (user is null) return TypedResults.NotFound();
            
            var res=_userMapper.UserMapper.UserToResponse(user.First());
           return TypedResults.Ok(res);
        }
    }