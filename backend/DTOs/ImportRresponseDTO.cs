namespace Backend.DTOs;

public class ImportResponseDTO
{
    public string SuccessMessage { get; set; } = null!;
    public int StatusCode { get; set; }
    public string DeletedData { get; set; } = null!;
}
