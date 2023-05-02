namespace Backend.Services;

using Backend.DTOs;
using Backend.Mapper;
using Backend.Models;

public interface IJourneyService : IBaseService<Journey, JourneyDTO, JourneyCsvMap>
{
    Task<ImportResponseDTO> ImportCsvDataAsync(ImportDTO request);
    Task<GetAllResultResponseDTO<Journey>> GetAllAsync(FilterDTO filter);
}