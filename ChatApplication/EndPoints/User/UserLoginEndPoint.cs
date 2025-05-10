using ChatApplication.DTOs.UserDTO;
using ChatApplication.Mappers.Mapping;
using ChatApplication.Repository.IRepository;
using ChatApplication.Services;
using FastEndpoints;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ChatApplication.EndPoints.User;

    public class UserLoginEndPoint : Endpoint<UserLogin, UserResponse>
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

        public override  async Task HandleAsync(UserLogin userlogin,CancellationToken ct)
        {
            
            if (ValidationFailed) await SendErrorsAsync(400,ct);
            var user = await _userManager.Users.
                FirstOrDefaultAsync(u => u.UserName.ToLower().Equals(userlogin.Username.ToLower()),ct);
            if (user is null) await SendUnauthorizedAsync(ct);
            var result = _signInManager.CheckPasswordSignInAsync(user, userlogin.Password, false).Result;

            if (!result.Succeeded) await SendErrorsAsync(401,ct);
            
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
            
            
            await SendAsync(userResponse,200,ct);
        }

       
    }
    


