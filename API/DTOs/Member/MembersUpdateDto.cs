using System;

namespace API.DTOs.Member;

public class MembersUpdateDto
{
    public string? DisplayName { get; set; }
    public string? Description { get; set; }
    public string? City { get; set; }
    public string? Country { get; set; }
}
