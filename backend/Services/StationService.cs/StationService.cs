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

namespace Backend.Services;

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
            query = query.Where(s => s.Name.ToLower().StartsWith(filter.SearchKeyWord.ToLower()));
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

    public Task<StationViewResponseDTO> GetSingleStationAsync(int fid)
    {
        throw new NotImplementedException();
    }

    public Task<ImportResponseDTO> ImportStationCsvDataAsync(ImportDTO request)
    {
        throw new NotImplementedException();
    }
}
