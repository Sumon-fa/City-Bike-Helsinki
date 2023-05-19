namespace Backend.Controllers;

using Backend.Services;
using Backend.Common;
using Backend.DTOs;
using Microsoft.AspNetCore.Mvc;

public abstract class BaseController<TModel, TDto> : ApiControllerBase
where TModel : new()
where TDto : BaseDTO<TModel>

{
    private readonly IBaseService<TModel, TDto> _service;

    protected BaseController(IBaseService<TModel, TDto> service)
    {
        _service = service ?? throw new ArgumentNullException(nameof(service));
    }

    [HttpPost("/api/v1/dashboard/[controller]/new")]
    public virtual async Task<ActionResult<TModel>> CreateAsync(TDto request)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();

            throw ServiceException.BadRequest(string.Join("; ", errors));
        }

        var item = await _service.CreateAsync(request);
        if (item is null)
        {
            throw ServiceException.BadRequest($"{typeof(TModel).Name} data is not valid.");
        }

        return Ok(item);
    }
}
