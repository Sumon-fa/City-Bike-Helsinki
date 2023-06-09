namespace Backend.Controllers;

using Backend.DTOs;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

public class JourneyController : BaseController<Journey, JourneyDTO>
{
    private readonly IJourneyService _service;
    public JourneyController(IJourneyService service) : base(service)
    {
        _service = service;
    }

    [HttpGet("/api/v1/journeys")]
    public async Task<IActionResult> GetAllAsync([FromQuery] FilterDTO filter)
    {
        return Ok(await _service.GetAllAsync(filter));
    }
}