using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using WebApplication1.DTOs.UserDTO;
using WebApplication1.Mappers.Mapping;
using WebApplication1.Repository.IRepository;

namespace WebApplication1.EndPoints.User;

public class GetUsersEndPoint : EndpointWithoutRequest<Results<Ok<IEnumerable<UserResponse>>,NotFound>>
{
    
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapping _userMapper;

    public GetUsersEndPoint(IUnitOfWork unitOfWork, IMapping userMapper)
    {
        _unitOfWork = unitOfWork;
        _userMapper = userMapper;
    }
    public override void Configure()
    {
        Get("/api/user");
        AllowAnonymous();
    }

    public override async Task<Results<Ok<IEnumerable<UserResponse>>,NotFound>> ExecuteAsync(CancellationToken ct)
    {
        var users = _unitOfWork.UserRepository.GetallAsync().Result;
        if (users is null)
        {
            return TypedResults.NotFound();
        }
        var response =_userMapper.UserMapper.UserToResponses(users);
        
         return TypedResults.Ok(response);
    }
}