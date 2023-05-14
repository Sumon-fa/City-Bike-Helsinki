namespace Backend.Services;

using Backend.DTOs;
using Backend.Models;

public interface IStationService : IBaseService<Station, StationDTO>
{
    Task<StationViewResponseDTO> GetSingleStationAsync(int fid);
    Task<GetAllResultResponseDTO<Station>> GetAllAsync(FilterDTO filter);
}
