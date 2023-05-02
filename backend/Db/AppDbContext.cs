namespace Backend.Db;
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
    }
}