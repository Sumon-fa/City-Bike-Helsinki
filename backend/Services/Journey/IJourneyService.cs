namespace Backend.Services;

using Backend.DTOs;
using Backend.Models;

public interface IJourneyService : IBaseService<Journey, JourneyDTO>
{
    Task<GetAllResultResponseDTO<Journey>> GetAllAsync(FilterDTO filter);
}