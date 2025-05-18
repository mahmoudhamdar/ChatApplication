using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using WebApplication1.DTOs.UserDTO;
using WebApplication1.Mappers.Mapping;
using WebApplication1.Repository.IRepository;

namespace WebApplication1.EndPoints.User;

public class UserRegisterEndPoint:Endpoint< UserRequest , Results<Ok<UserResponse>,InternalServerError>>
{
    
    private readonly IMapping _mapping;

    private readonly UserManager<Models.User> _userManager;
   
    public UserRegisterEndPoint(IMapping mapping, IUnitOfWork unitOfWork,UserManager<Models.User> userManager)
    {
        _mapping = mapping;
        _userManager = userManager;
        
    }
    public override void Configure()
    {
        Post("/api/user/register");
        AllowAnonymous();
    }

    public override async Task<Results<Ok<UserResponse>,InternalServerError>> ExecuteAsync (UserRequest registerUser , CancellationToken ct)
    {
        
        try
        {
            if (ValidationFailed) return TypedResults.InternalServerError(); 

            var user = _mapping.UserMapper.RequestToUser(registerUser);
            var createUser = await _userManager.CreateAsync(user, registerUser.Password);

            if (!createUser.Succeeded) return TypedResults.InternalServerError(); 
            var roleResult = await _userManager.AddToRoleAsync(user, "User");
            if (!roleResult.Succeeded) return TypedResults.InternalServerError();
            return TypedResults.Ok(_mapping.UserMapper.UserToResponse(user));

        }
        catch (Exception e)
        {
            return TypedResults.InternalServerError(); 
        }

        
        
    }
    
    
}