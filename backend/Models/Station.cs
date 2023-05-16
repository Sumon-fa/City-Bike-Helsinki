namespace Backend.Models;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Station
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

    public int FID { get; set; }
    public string ID { get; set; } = null!;
    public string Nimi { get; set; } = null!;
    public string Namn { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string Osoite { get; set; } = null!;
    public string Adress { get; set; } = null!;
    public string Kaupunki { get; set; } = null!;
    public string Stad { get; set; } = null!;
    public string Operaattor { get; set; } = null!;
    public int Kapasiteet { get; set; }
    public decimal X { get; set; }
    public decimal Y { get; set; }
}
