namespace Backend.DTOs;

public class StationViewResponseDTO
{
    public string Name { get; set; } = null!;
    public string Address { get; set; } = null!;
    public int NumOfStartingJourney { get; set; }
    public int NumOfEndingJourney { get; set; }
    public decimal X { get; set; }
    public decimal Y { get; set; }
}