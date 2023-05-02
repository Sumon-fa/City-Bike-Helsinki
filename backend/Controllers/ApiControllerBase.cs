namespace Backend.Controllers;

using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;

[ApiController]
[Produces(MediaTypeNames.Application.Json)]
[Consumes(MediaTypeNames.Application.Json)]
[Route("api/v1/[controller]")]

public abstract class ApiControllerBase : ControllerBase
{
}