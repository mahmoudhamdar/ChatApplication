using ChatApplication.DTOs.UserDTO;
using ChatApplication.Mappers.Mapping;
using ChatApplication.Repository.IRepository;
using FastEndpoints;

namespace ChatApplication.EndPoints.User;

public class GetUsersEndPoint : EndpointWithoutRequest< IEnumerable<UserResponse>>
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

    public override async Task HandleAsync(CancellationToken ct)
    {
        var users = _unitOfWork.UserRepository.GetallAsync().Result;
        if (users is null)
        {
            await SendAsync(new UserResponse[]
            {
                
            },400, ct);
        }
        var response =_userMapper.UserMapper.UserToResponses(users);
        
        await SendOkAsync(response, ct);
    }
}