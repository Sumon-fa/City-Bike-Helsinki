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

        optionsBuilder.UseNpgsql(connString)
                      .UseSnakeCaseNamingConvention();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Journey>()
              .HasIndex(j => new
              {
                  j.DepartureStationName,
                  j.Departure
              });

        modelBuilder.Entity<Journey>()
              .Property(j => j.Id)
              .HasDefaultValueSql("gen_random_uuid()");

        modelBuilder.Entity<Station>()
              .HasIndex(s => s.ID).IsUnique();

        modelBuilder.Entity<Station>()
              .HasIndex(s => s.Nimi);
    }

    public DbSet<Journey> Journeys { get; set; } = null!;
    public DbSet<Station> Stations { get; set; } = null!;
}