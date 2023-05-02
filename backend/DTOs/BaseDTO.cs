namespace Backend.DTOs;

using Backend.Db;

public abstract class BaseDTO<TModel>
{
    public abstract Task<TModel> UpdateModelAsync(TModel model, AppDbContext dbContext);
}
