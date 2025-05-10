using System.Text;
using ChatApplication.Services;
using ChatApplication.Data;
using ChatApplication.Mappers.Mapping;
using ChatApplication.Repository;
using ChatApplication.Repository.IRepository;
using ChatApplication.Models;
using FastEndpoints;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

const string myAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ChatAppContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);


builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme =
        options.DefaultChallengeScheme =
            options.DefaultForbidScheme =
                options.DefaultScheme =
                    options.DefaultSignInScheme =
                        options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(
    options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["JWT:Issuer"],
            ValidateAudience = true,
            ValidAudience = builder.Configuration["JWT:Audience"],
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    builder.Configuration["JWT:SigningKey"]))
        };
    }
);
builder.Services.AddCors(options =>
{
    options.AddPolicy(myAllowSpecificOrigins,
        builder =>
        {
            builder.WithOrigins("https://localhost:7268",
                    "http://localhost:3000"
                    , "http://localhost:3001")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});




builder.Services.AddEndpointsApiExplorer();

builder.Services.AddAuthorization();
builder.Services.AddScoped<IMapping,Mapping>();
builder.Services.AddScoped<IUnitOfWork,UnitOfWork>();
builder.Services.AddIdentity<User,IdentityRole>().AddEntityFrameworkStores<ChatAppContext>();
builder.Services.AddScoped<ITokenService,TokenService>();

var app = builder.Build();




app.UseHttpsRedirection();
app.UseRouting();
app.UseCors(myAllowSpecificOrigins);

app.UseFastEndpoints();

app.UseDefaultFiles();

app.UseAuthentication();
app.UseAuthorization();

app.Run();

