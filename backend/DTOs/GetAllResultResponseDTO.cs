namespace Backend.DTOs;

public class GetAllResultResponseDTO<Tmodel>
{
    public ICollection<Tmodel> Result { get; set; } = null!;
    public int TotalItems { get; set; }
}