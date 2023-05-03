namespace Backend.Services;

using Backend.Common;
using Backend.Db;
using Backend.DTOs;
using Backend.Mapper;
using Backend.Models;
using System.Text;
using CsvHelper;
using CsvHelper.Configuration;
using EFCore.BulkExtensions;
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

        var result = await query
            .AsNoTracking()
            .OrderByDescending(s => s.Departure)
            .Skip((filter.Page - 1) * filter.PageSize)
            .Take(filter.PageSize)
            .ToListAsync();

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

    public async Task<ImportResponseDTO> ImportCsvDataAsync(ImportDTO request)
    {
        try
        {
            using var streamReader = new StreamReader(request.File.OpenReadStream());
            using var csvReader = new CsvReader(streamReader, true);

            csvReader.Configuration.Encoding = Encoding.UTF8;
            csvReader.Configuration.TrimOptions = TrimOptions.Trim;
            csvReader.Configuration.ShouldSkipRecord = record => record.Any(string.IsNullOrWhiteSpace);
            csvReader.Configuration.RegisterClassMap<JourneyCsvMap>();

            var records = csvReader.GetRecords<Journey>()
                .Where(j => j.Duration >= 10 && j.CoveredDistance >= 10)
                .ToList();

            records = records.Select(j => new Journey
            {
                Id = Guid.NewGuid(),
                Departure = j.Departure,
                Return = j.Return,
                DepartureStationId = j.DepartureStationId,
                DepartureStationName = j.DepartureStationName,
                ReturnStationId = j.ReturnStationId,
                ReturnStationName = j.ReturnStationName,
                CoveredDistance = j.CoveredDistance,
                Duration = j.Duration
            })
            .ToList();

            await _dbContext.BulkInsertAsync(records);

            var duplicates = await RemoveDuplicateJourneysAsync();

            return new ImportResponseDTO
            {
                SuccessMessage = $"{Math.Abs(records.Count - duplicates.Count)} data has been uploaded.",
                StatusCode = 200,
                DeletedData = $"{duplicates.Count} Duplicate data has been deleted Successfully!"
            };
        }
        catch (CsvHelper.TypeConversion.TypeConverterException ex)
        {
            var lineNumber = ex.ReadingContext.RawRow;
            var columnNumber = ex.ReadingContext.CurrentIndex + 1;
            var errorMessage = $"Error on line {lineNumber}, column {columnNumber}: {ex.Message}";

            throw ServiceException.BadRequest(errorMessage);
        }
    }

    private async Task<ICollection<Journey>> RemoveDuplicateJourneysAsync()
    {
        var duplicates = await _dbContext.Journeys.ToListAsync();

        var distinctJourney = duplicates
            .GroupBy(t => new
            {
                t.DepartureStationId,
                t.Departure,
                t.DepartureStationName,
                t.Return,
                t.ReturnStationName
            })
            .Select(g => g.OrderByDescending(t => t.Id)
            .First());

        var journeysToDelete = duplicates.Except(distinctJourney).ToList();

        await _dbContext.BulkDeleteAsync(journeysToDelete);

        return journeysToDelete;
    }
}