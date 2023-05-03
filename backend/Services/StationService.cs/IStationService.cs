namespace Backend.Services;

using Backend.DTOs;
using Backend.Mapper;
using Backend.Models;

public interface IStationService : IBaseService<Station, StationDTO, StationCsvMap>
{
    Task<StationViewResponseDTO> GetSingleStationAsync(int fid);
    Task<ImportResponseDTO> ImportStationCsvDataAsync(ImportDTO request);
    Task<GetAllResultResponseDTO<Station>> GetAllAsync(FilterDTO filter);
}
