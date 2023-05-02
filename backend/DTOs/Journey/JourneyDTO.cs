namespace Backend.DTOs;

using Backend.Common;
using Backend.Db;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

public class JourneyDTO : BaseDTO<Journey>
{
    public Guid Id { get; set; }
    [DepartureTime]
    public DateTime Departure { get; set; }
    public string DepartureStationId { get; set; } = null!;
    public string DepartureStationName { get; set; } = null!;
    [ReturnGreaterThanDeparture]
    public DateTime Return { get; set; }
    public string ReturnStationId { get; set; } = null!;
    public string ReturnStationName { get; set; } = null!;
    [Range(10, double.MaxValue, ErrorMessage = "Covered distance must be at least 10 meters.")]
    public double CoveredDistance { get; set; }
    [Range(10, int.MaxValue, ErrorMessage = "Duration must be at least 10 seconds.")]
    public int Duration { get; set; }

    public override async Task<Journey> UpdateModelAsync(Journey model, AppDbContext dbContext)
    {
        var existingDepartureJourneys = await dbContext.Journeys
            .FirstOrDefaultAsync(j => j.Departure == Departure &&
            j.DepartureStationId == DepartureStationId &&
            j.DepartureStationName == DepartureStationName);
        if (existingDepartureJourneys is not null)
        {
            throw ServiceException.BadRequest("Duplicate entry.Please check the Departure, DepartureStationId & DepartureStationName ");
        }

        var existingReturnJourneys = await dbContext.Journeys
            .FirstOrDefaultAsync(j => j.Return == Return &&
            j.ReturnStationId == ReturnStationId &&
            j.ReturnStationName == ReturnStationName);
        if (existingReturnJourneys is not null)
        {
            throw ServiceException.BadRequest("Duplicate entry.Please check the Return, ReturnStationId & ReturnStationName ");
        }

        model.Id = Id;
        model.Departure = Departure;
        model.DepartureStationName = DepartureStationName;
        model.DepartureStationId = DepartureStationId;
        model.Return = Return;
        model.ReturnStationName = ReturnStationName;
        model.ReturnStationId = ReturnStationId;
        model.CoveredDistance = CoveredDistance;
        model.Duration = Duration;
        return model;
    }
}
