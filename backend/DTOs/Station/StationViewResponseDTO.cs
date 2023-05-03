namespace Backend.DTOs;

public class StationViewResponseDTO
{
    public string Name { get; set; } = null!;
    public string Adress { get; set; } = null!;
    public int StartingJourney { get; set; }
    public int EndingJourney { get; set; }
}