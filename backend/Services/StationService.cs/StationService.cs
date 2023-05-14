namespace Backend.Services;

using Backend.Common;
using Backend.Db;
using Backend.DTOs;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

public class StationService : BaseService<Station, StationDTO>, IStationService
{
    public StationService(AppDbContext dbContext) : base(dbContext)
    {
    }

    public async Task<GetAllResultResponseDTO<Station>> GetAllAsync(FilterDTO filter)
    {
        var query = _dbContext.Stations.AsQueryable();

        if (!string.IsNullOrEmpty(filter.SearchKeyWord))
        {
            query = query.Where(s => s.Nimi.ToLower().StartsWith(filter.SearchKeyWord.ToLower()));
        }

        var result = await query
            .AsNoTracking()
            .OrderByDescending(s => s.FID)
            .Skip((filter.Page - 1) * filter.PageSize)
            .Take(filter.PageSize)
            .ToListAsync();

        if (result is null || result.Count < 1)
        {
            throw ServiceException.NotFound("Station is not found.");
        }

        return new GetAllResultResponseDTO<Station>
        {
            Result = result,
            TotalItems = await query.CountAsync()
        };
    }

    public async Task<StationViewResponseDTO> GetSingleStationAsync(int fid)
    {
        var station = await _dbContext.Stations.FindAsync(fid);

        if (station == null)
        {
            throw ServiceException.NotFound("Station not found. Please check and try again.");
        }

        var startingJourney = await _dbContext.Journeys.Where(j => j.DepartureStationId == station.ID).ToListAsync();
        var endingJourney = await _dbContext.Journeys.Where(j => j.ReturnStationId == station.ID).ToListAsync();

        return new StationViewResponseDTO
        {
            Name = station.Nimi,
            Address = $"{station.Osoite}, {station.Kaupunki}",
            NumOfStartingJourney = startingJourney.Count,
            NumOfEndingJourney = endingJourney.Count,
            X = station.X,
            Y = station.Y
        };
    }
}
