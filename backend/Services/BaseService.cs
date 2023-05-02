namespace Backend.Services;

using Backend.Db;
using Backend.DTOs;
using CsvHelper.Configuration;

public class BaseService<TModel, TDto, TMap> : IBaseService<TModel, TDto, TMap>
where TModel : class, new()
where TDto : BaseDTO<TModel>
where TMap : ClassMap<TModel>, new()

{
 protected readonly AppDbContext _dbContext;
 public BaseService(AppDbContext dbContext)
 {
  _dbContext = dbContext;
 }

 public async Task<TModel?> CreateAsync(TDto request)
 {
  var item = new TModel();
  await request.UpdateModelAsync(item, _dbContext);
  _dbContext.Add(item);
  await _dbContext.SaveChangesAsync();
  return item;
 }
}
