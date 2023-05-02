namespace Backend.Models;

public class Journey
{
    public Guid Id { get; set; }
    public DateTime Departure { get; set; }
    public string DepartureStationId { get; set; } = null!;
    public string DepartureStationName { get; set; } = null!;
    public DateTime Return { get; set; }
    public string ReturnStationId { get; set; } = null!;
    public string ReturnStationName { get; set; } = null!;
    public double CoveredDistance { get; set; }
    public int Duration { get; set; }
}
