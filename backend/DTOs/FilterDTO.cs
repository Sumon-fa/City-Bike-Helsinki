namespace Backend.DTOs;

public class FilterDTO
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 8;
    public string? SearchKeyWord { get; set; } = string.Empty;
}
