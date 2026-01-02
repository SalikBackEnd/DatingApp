using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class TokenService(IConfiguration config) : ITokenService
{
    public string CreateToken(AppUser user)
    {
        var tokenKey = config["TokenKey"] ?? throw new ArgumentNullException("TokenKey not found in configuration");
        if(tokenKey.Length < 64)
        {
            throw new ArgumentException("TokenKey must be at least 64 characters long");
        }

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

        var claims = new List<Claim>
        {
          new Claim(ClaimTypes.Email, user.Email),
          new Claim(ClaimTypes.NameIdentifier, user.Id)  
        };

        var cred =  new SigningCredentials(key,SecurityAlgorithms.HmacSha512Signature);

        var tokenDescripter = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(7),
            SigningCredentials = cred
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token =tokenHandler.CreateToken(tokenDescripter);
        return tokenHandler.WriteToken(token);
    }
}
