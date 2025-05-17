using FastEndpoints;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebApplication1.DTOs.UserDTO;
using WebApplication1.Services;

namespace WebApplication1.EndPoints.User;

    public class UserLoginEndPoint : Ep.Req<UserLogin>.Res<Results<Ok<UserResponse>,BadRequest,UnauthorizedHttpResult>>
    {
       
        private readonly SignInManager<Models.User> _signInManager;
        private readonly UserManager<Models.User> _userManager;
        private readonly ITokenService _tokenService;

        public UserLoginEndPoint(ITokenService tokenService,  UserManager<Models.User> userManager,  SignInManager<Models.User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }
        
        public override void Configure()
        {
            Post("/api/user/login");
            AllowAnonymous();
        }

        public override  async Task<Results<Ok<UserResponse>,BadRequest,UnauthorizedHttpResult>> ExecuteAsync(UserLogin userlogin,CancellationToken ct)
        {
            
            if (ValidationFailed) return TypedResults.BadRequest();
            var user = await _userManager.Users.
                FirstOrDefaultAsync(u => u.UserName.ToLower().Equals(userlogin.Username.ToLower()),ct);
            if (user is null) return TypedResults.Unauthorized();
            var result = _signInManager.CheckPasswordSignInAsync(user, userlogin.Password, false).Result;

            if (!result.Succeeded) return TypedResults.Unauthorized();
            
            var userResponse = new UserResponse
            {
                Id = user.Id,
                Username = user.UserName,
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt,
                LastLogin = user.LastLogin
            };
            
            
           return TypedResults.Ok(userResponse);
        }

       
    }
    


