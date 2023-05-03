namespace Backend.Controllers;

using Backend.Models;
using Backend.Services;
using Backend.DTOs;
using Backend.Mapper;
using Backend.Common;
using Microsoft.AspNetCore.Mvc;

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

    [HttpGet("{fid}")]
    public async Task<ActionResult<StationViewResponseDTO>> GetSingleStation(int fid)
    {
        return Ok(await _service.GetSingleStationAsync(fid));
    }

    [HttpPost("import")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> ImportCsvDataAsync([FromForm] ImportDTO request)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();
            throw ServiceException.BadRequest(string.Join("; ", errors));
        }

        if (request.File == null || request.File.Length == 0)
        {
            return BadRequest("File is empty.");
        }

        var result = await _service.ImportStationCsvDataAsync(request);
        return Ok(result);
    }
}