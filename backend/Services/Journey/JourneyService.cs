namespace Backend.Services;

using Backend.Common;
using Backend.Db;
using Backend.DTOs;
using Backend.Mapper;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

public class JourneyService : BaseService<Journey, JourneyDTO, JourneyCsvMap>, IJourneyService
{
    public JourneyService(AppDbContext dbContext) : base(dbContext)
    {
    }

    public async Task<GetAllResultResponseDTO<Journey>> GetAllAsync(FilterDTO filter)

    {
        var query = _dbContext.Journeys.AsQueryable();
        if (!string.IsNullOrEmpty(filter.SearchKeyWord))
        {
            query = query.Where(j => j.DepartureStationName.ToLower().StartsWith(filter.SearchKeyWord.ToLower()));
        }

        query = query.Select(journey => new Journey
        {
            Id = journey.Id,
            Departure = journey.Departure,
            Return = journey.Return,
            DepartureStationId = journey.DepartureStationId,
            DepartureStationName = journey.DepartureStationName,
            ReturnStationId = journey.ReturnStationId,
            ReturnStationName = journey.ReturnStationName,
            CoveredDistance = journey.CoveredDistance / 1000,
            Duration = journey.Duration / 60
        });
        var result = await query.AsNoTracking().OrderByDescending(s => s.Departure)
                                .Skip((filter.Page - 1) * filter.PageSize)
                                .Take(filter.PageSize).ToListAsync();
        if (result is null || result.Count < 1)
        {
            throw ServiceException.NotFound("Journey is not found.");
        }

        return new GetAllResultResponseDTO<Journey>
        {
            Result = result,
            TotalItems = await query.CountAsync()
        };
    }

    public Task<ImportResponseDTO> ImportCsvDataAsync(ImportDTO request)
    {
        throw new NotImplementedException();
    }
}