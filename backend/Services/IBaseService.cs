namespace Backend.Services;

using Backend.DTOs;
using CsvHelper.Configuration;

public interface IBaseService<TModel, TDto, TMap>
where TModel : new()
where TDto : BaseDTO<TModel>
where TMap : ClassMap<TModel>, new()

{
    Task<TModel?> CreateAsync(TDto request);
}
