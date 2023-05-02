namespace Backend.Db;

using Backend.Models;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    private readonly IConfiguration _config;
    static AppDbContext()
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    }

    public AppDbContext(IConfiguration config)
    {
        _config = config;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
        var connString = _config.GetConnectionString("DefaultConnection");
        optionsBuilder.UseNpgsql(connString).
        UseSnakeCaseNamingConvention();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Journey>()
                    .HasIndex(j => new
                    {
                        j.Departure,
                        j.DepartureStationId,
                        j.DepartureStationName,
                        j.Return,
                        j.ReturnStationId,
                        j.ReturnStationName
                    });
    }

    public DbSet<Journey> Journeys { get; set; } = null!;
}