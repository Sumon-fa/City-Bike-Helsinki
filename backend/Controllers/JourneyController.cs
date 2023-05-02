namespace Backend.Controllers;

using Backend.DTOs;
using Backend.Mapper;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

public class JourneyController : BaseController<Journey, JourneyDTO, JourneyCsvMap>
{
    private readonly IJourneyService _service;
    public JourneyController(IJourneyService service) : base(service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllAsync([FromQuery] FilterDTO filter)
    {
        return Ok(await _service.GetAllAsync(filter));
    }
}