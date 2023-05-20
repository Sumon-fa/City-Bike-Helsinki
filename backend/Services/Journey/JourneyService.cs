namespace Backend.Services;

using Backend.Common;
using Backend.Db;
using Backend.DTOs;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

public class JourneyService : BaseService<Journey, JourneyDTO>, IJourneyService
{
    public JourneyService(AppDbContext dbContext) : base(dbContext)
    {
    }

    public async Task<GetAllResultResponseDTO<Journey>> GetAllAsync(FilterDTO filter)

    {
        var query = _dbContext.Journeys.AsNoTracking().AsQueryable();

        if (!string.IsNullOrWhiteSpace(filter.SearchKeyWord))
        {
            query = query.Where(j => j.DepartureStationName
                         .ToLower()
                         .StartsWith(filter.SearchKeyWord.Trim().ToLower()));
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

        var totalItems = await query.CountAsync();

        var result = await query
            .OrderByDescending(j => j.Departure)
            .Skip((filter.Page - 1) * filter.PageSize)
            .Take(filter.PageSize)
            .Select(journey => new Journey
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
            })
           .ToListAsync();

        switch (filter.Sort)
        {
            case FilterDTO.SortType.Asc:
                result = result.OrderBy(j => j.Departure).ToList();
                break;
            case FilterDTO.SortType.Desc:
                result = result.OrderByDescending(j => j.Departure).ToList();
                break;
        }

        if (result is null || result.Count < 1)
        {
            throw ServiceException.NotFound("Journey is not found.");
        }

        return new GetAllResultResponseDTO<Journey>
        {
            Result = result,
            TotalItems = totalItems
        };
    }
}