namespace Backend.Services;

using Backend.DTOs;

public interface IBaseService<TModel, TDto>
where TModel : new()
where TDto : BaseDTO<TModel>

{
    Task<TModel?> CreateAsync(TDto request);
}
