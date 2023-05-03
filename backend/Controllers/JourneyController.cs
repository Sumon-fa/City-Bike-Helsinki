namespace Backend.Controllers;

using Backend.Common;
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

    [HttpGet("/api/v1/journeys")]
    public async Task<IActionResult> GetAllAsync([FromQuery] FilterDTO filter)
    {
        return Ok(await _service.GetAllAsync(filter));
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
            throw ServiceException.BadRequest("File is empty.");
        }

        var result = await _service.ImportCsvDataAsync(request);

        return Ok(result);
    }
}