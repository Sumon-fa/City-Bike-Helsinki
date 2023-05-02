namespace Backend.Services;

using Backend.Db;
using Backend.DTOs;
using Backend.Mapper;
using Backend.Models;

public class JourneyService : BaseService<Journey, JourneyDTO, JourneyCsvMap>, IJourneyService
{
    public JourneyService(AppDbContext dbContext) : base(dbContext)
    {
    }

    public Task<GetAllResultResponseDTO<Journey>> GetAllAsync(FilterDTO filter)
    {
        throw new NotImplementedException();
    }

    public Task<ImportResponseDTO> ImportCsvDataAsync(ImportDTO request)
    {
        throw new NotImplementedException();
    }
}