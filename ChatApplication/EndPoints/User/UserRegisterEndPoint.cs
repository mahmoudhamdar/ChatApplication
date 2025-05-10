using ChatApplication.DTOs.UserDTO;
using ChatApplication.Mappers.Mapping;
using ChatApplication.Repository.IRepository;
using FastEndpoints;
using Microsoft.AspNetCore.Identity;

namespace ChatApplication.EndPoints.User;

public class UserRegisterEndPoint:Endpoint<UserRequest ,UserResponse >
{
    
    private readonly IMapping _mapping;
    private readonly IUnitOfWork _unitOfWork;
    private readonly UserManager<Models.User> _userManager;
   
    public UserRegisterEndPoint(IMapping mapping, IUnitOfWork unitOfWork,UserManager<Models.User> userManager)
    {
        _mapping = mapping;
        _unitOfWork = unitOfWork;
        _userManager = userManager;
        
    }
    public override void Configure()
    {
        Post("/api/user/register");
        AllowAnonymous();
    }

    public override async Task HandleAsync(UserRequest registerUser , CancellationToken ct)
    {
        
        try
        {
            if (ValidationFailed) await SendErrorsAsync(400,ct);

            var user = _mapping.UserMapper.RequestToUser(registerUser);

            var createUser = await _userManager.CreateAsync(user, registerUser.Password);
            if (!createUser.Succeeded) await SendErrorsAsync(500,ct);
            var roleResult = await _userManager.AddToRoleAsync(user, "User");
            if (roleResult.Succeeded) 
              
            
              await SendOkAsync(_mapping.UserMapper.UserToResponse(user),ct);

            await SendErrorsAsync(500,ct);
        }
        catch (Exception e)
        {
            await SendErrorsAsync(500,ct);
        }

        await _unitOfWork.UserRepository.AddAsync(_mapping.UserMapper.RequestToUser(registerUser));
        await SendAsync(new UserResponse(),201,ct);
    }
    
    
}