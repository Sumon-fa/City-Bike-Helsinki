namespace Backend.Services;

using System.Text;
using Backend.Common;
using Backend.Db;
using Backend.DTOs;
using Backend.Mapper;
using Backend.Models;
using CsvHelper;
using CsvHelper.Configuration;
using EFCore.BulkExtensions;
using Microsoft.EntityFrameworkCore;

public class StationService : BaseService<Station, StationDTO, StationCsvMap>, IStationService
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

        var result = await query.AsNoTracking().OrderByDescending(s => s.FID)
                                .Skip((filter.Page - 1) * filter.PageSize)
                                .Take(filter.PageSize).ToListAsync();
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
            NumOfEndingJourney = endingJourney.Count
        };
    }

    public async Task<ImportResponseDTO> ImportStationCsvDataAsync(ImportDTO request)
    {
        try
        {
            using var streamReader = new StreamReader(request.File.OpenReadStream());
            using var csvReader = new CsvReader(streamReader, true);
            csvReader.Configuration.Encoding = Encoding.UTF8;
            csvReader.Configuration.TrimOptions = TrimOptions.Trim;
            csvReader.Configuration.ShouldSkipRecord = record =>
           {
               return record.Any(string.IsNullOrWhiteSpace);
           };

            csvReader.Configuration.RegisterClassMap<StationCsvMap>();
            var records = csvReader.GetRecords<Station>().ToList();
            await _dbContext.BulkInsertAsync(records);
            var duplicates = await RemoveDuplicateStationsAsync();
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

    private async Task<ICollection<Station>> RemoveDuplicateStationsAsync()
    {
        var duplicates = await _dbContext.Stations.ToListAsync();
        var distinctStation = duplicates
            .GroupBy(t => new { t.ID })
            .Select(g => g.OrderBy(t => t.FID).First());
        var stationsToDelete = duplicates.Except(distinctStation).ToList();
        await _dbContext.BulkDeleteAsync(stationsToDelete);
        return stationsToDelete;
    }
}
