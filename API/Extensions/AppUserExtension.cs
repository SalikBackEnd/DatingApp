using System;
using API.DTOs.Accounts;
using API.Entities;
using API.Interfaces;

namespace API.Extensions;

public static class AppUserExtension
{
    public static AuthResponseDto ToDto(this AppUser user, ITokenService tokenService)
    {
        return new AuthResponseDto
        {
            Email = user.Email,
            DisplayName = user.DisplayName,
            Token = tokenService.CreateToken(user)   
        };
    }
}
