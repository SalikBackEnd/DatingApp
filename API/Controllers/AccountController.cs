using System;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs.Accounts;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(AppDbContext context,ITokenService tokenService):BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register(RegisterDto registerDto)
    {
        if(await UserExists(registerDto.Email))
        {
            return BadRequest("Email is already taken");
        }

        using var hmac = new HMACSHA512();
        var user = new AppUser
        {
            DisplayName = registerDto.DisplayName,
            Email = registerDto.Email,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key 
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();

        return user.ToDto(tokenService);
    }
    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login(LoginDto loginDto)
    {
        var user = await context.Users.SingleOrDefaultAsync(x=>x.Email.ToLower() == loginDto.Email.ToLower());
        if(user == null) return Unauthorized("Invalid email");

        using var hmac = new HMACSHA512(user.PasswordSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
        for (int i = 0;i < computedHash.Length;i++)
        {
            if(user.PasswordHash[i] != computedHash[i]) return Unauthorized("Invalid password");
        }
        
        return user.ToDto(tokenService);
    }
    private async Task<bool> UserExists(string email)
    {
        return await context.Users.AnyAsync(u => u.Email.ToLower() == email.ToLower());
    }
}
