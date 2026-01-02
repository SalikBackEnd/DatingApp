using System;

namespace API.DTOs.Accounts;

public class AuthResponseDto
{
    public required string Email { get; set; } = string.Empty;
    public required string DisplayName { get; set; } = string.Empty;
    public required string Token { get; set; } = string.Empty;
    public string? PhotoUrl { get; set; }
}
