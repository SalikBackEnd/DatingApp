using System.Security.Claims;
using API.Data;
using API.DTOs.Member;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class MembersController(IMemberRepository memberRepository) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Member>>> GetMembers()
        {
            var members = await memberRepository.GetMembersAsync();
            return Ok(members);
        }
       
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetMember(string id)
        {
            var member = await memberRepository.GetMemberByIdAsync(id);
            return Ok(member);
        }
        [HttpGet("{id}/photos")]
        public async Task<ActionResult<IReadOnlyList<Photo>>> GetMemberPhotos(string id)
        {
            return Ok(await memberRepository.GetPhotosForMemberAsync(id));
        }
        [HttpPut]
        public async Task<ActionResult> UpdateMember(MembersUpdateDto dto)
        {
            var memberId = User.GetMemberId();

            var member = await memberRepository.GetMemberForUpdates(memberId);
            if(member == null) return BadRequest("Could not get member.");

            member.DisplayName = dto.DisplayName ?? member.DisplayName;
            member.Description = dto.Description ?? member.Description;
            member.City = dto.City ?? member.City;
            member.Country = dto.Country ?? member.Country;

            member.User.DisplayName = dto.DisplayName ?? member.User.DisplayName;
            //memberRepository.Update(member);

            if (await memberRepository.SaveAllAsync()) return NoContent();
            
            return BadRequest("Failed to update user.");
        }
    }
}
