using Backend.Db;
using Backend.Middlware;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Core;

var builder = WebApplication.CreateBuilder(args);
var host = builder.Configuration.GetValue<string>("Host");

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>();

builder.Services.Configure<ApiBehaviorOptions>(options =>
options.SuppressModelStateInvalidFilter = true);

builder.Services.Configure<KestrelServerOptions>(options => options.Limits.MaxRequestBodySize = 167772160);
builder.Services.Configure<IISServerOptions>(options => options.MaxRequestBodySize = 167772160);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(p => p.AddPolicy("corsPolicy", build =>
{
    build.WithOrigins(host).AllowAnyMethod().AllowAnyHeader();
})
);

// Register the Services for Dependency i
builder.Services.AddScoped<IJourneyService, JourneyService>();
builder.Services.AddScoped<IStationService, StationService>();

builder.Services.AddTransient<ErrorHandlerMiddleware>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    using var scope = app.Services.CreateScope();
    var dbContext = scope.ServiceProvider.GetService<AppDbContext>();
    var config = scope.ServiceProvider.GetService<IConfiguration>();

    if (dbContext is not null && config.GetValue<bool>("CreateDbStart", false))
    {
        dbContext.Database.EnsureDeleted();
        dbContext.Database.EnsureCreated();
    }
}
else
{
    app.UseHttpsRedirection();
}

app.UseCors("corsPolicy");

app.UseMiddleware<ErrorHandlerMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();
