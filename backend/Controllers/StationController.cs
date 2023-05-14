namespace Backend.Controllers;

using Backend.Models;
using Backend.Services;
using Backend.DTOs;
using Backend.Common;
using Microsoft.AspNetCore.Mvc;

public class StationController : BaseController<Station, StationDTO>
{
    private readonly IStationService _service;
    public StationController(IStationService service) : base(service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllAsync([FromQuery] FilterDTO filter)
    {
        return Ok(await _service.GetAllAsync(filter));
    }

    [HttpGet("/station/{fid}")]
    public async Task<ActionResult<StationViewResponseDTO>> GetSingleStation(int fid)
    {
        return Ok(await _service.GetSingleStationAsync(fid));
    }
}