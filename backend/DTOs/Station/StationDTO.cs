namespace Backend.DTOs;

using System.ComponentModel.DataAnnotations;
using Backend.Common;
using Backend.Db;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

public class StationDTO : BaseDTO<Station>
{
    public int FID { get; set; }
    [Required]
    public string ID { get; set; } = null!;
    [Required]
    public string Nimi { get; set; } = null!;
    [Required]
    public string Namn { get; set; } = null!;
    [Required]
    public string Name { get; set; } = null!;
    [Required]
    public string Osoite { get; set; } = null!;
    [Required]
    public string Adress { get; set; } = null!;
    [Required]
    public string Kaupunki { get; set; } = null!;
    [Required]
    public string Stad { get; set; } = null!;
    [Required]
    public string Operaattor { get; set; } = null!;
    public int Kapasiteet { get; set; }
    public decimal X { get; set; }
    public decimal Y { get; set; }

    public override async Task<Station> UpdateModelAsync(Station model, AppDbContext dbContext)
    {
        var existingStation = await dbContext.Stations.FirstOrDefaultAsync(
          s => s.ID == ID
        );
        if (existingStation is not null)
        {
            throw ServiceException.BadRequest($"ID {ID} already exists");
        }

        model.FID = FID;
        model.ID = ID.Trim();
        model.Nimi = Nimi.Trim();
        model.Namn = Namn.Trim();
        model.Name = Name.Trim();
        model.Osoite = Osoite.Trim();
        model.Adress = Adress.Trim();
        model.Kaupunki = Kaupunki.Trim();
        model.Stad = Stad.Trim();
        model.Operaattor = Operaattor.Trim();
        model.Kapasiteet = Kapasiteet;
        model.X = X;
        model.Y = Y;
        return model;
    }
}
