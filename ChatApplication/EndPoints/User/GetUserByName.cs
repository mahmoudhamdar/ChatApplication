using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using WebApplication1.DTOs.UserDTO;
using WebApplication1.Mappers.Mapping;
using WebApplication1.Repository.IRepository;


namespace WebApplication1.EndPoints.User;

    public class GetUserByName :Ep.NoReq.Res<Results<Ok<UserResponse>,NotFound,BadRequest>>
    {
        
        
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapping _userMapper;
        
        public GetUserByName(IUnitOfWork unitOfWork, IMapping userMapper)
        {
            _unitOfWork = unitOfWork;
            _userMapper = userMapper;
        }
        
        public override void Configure()
        {
            Get("/api/username/{name}");
            AllowAnonymous();
        }

        public override async Task<Results<Ok<UserResponse>,NotFound,BadRequest>> ExecuteAsync(CancellationToken ct)
        {
            
            var name = Route<string>("name");

            if (name is null)
            {
                return TypedResults.BadRequest();
            }
            
            
            var userList = await _unitOfWork.UserRepository.GetAsync(x=>x.UserName.Equals(name));
            var user = userList.First();
            if (user is null)
            {
                return TypedResults.NotFound();
            }
            var res=_userMapper.UserMapper.UserToResponse(user);
            return TypedResults.Ok(res);;

           
           
        }
    }