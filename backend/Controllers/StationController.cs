using Microsoft.AspNetCore.Mvc;
namespace Backend.Controllers;
using Backend.Models;
using Backend.Services;
using Backend.DTOs;
using Backend.Mapper;

public class StationController : BaseController<Station, StationDTO, StationCsvMap>
{
    private readonly IStationService _service;
    public StationController(IStationService service) : base(service)
    {
        _service = service;
    }

    [HttpGet("/api/v1/stations")]
    public async Task<IActionResult> GetAllAsync([FromQuery] FilterDTO filter)
    {
        return Ok(await _service.GetAllAsync(filter));
    }
}