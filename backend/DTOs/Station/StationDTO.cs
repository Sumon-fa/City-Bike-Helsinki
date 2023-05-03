namespace Backend.DTOs;

using Backend.Common;
using Backend.Db;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

public class StationDTO : BaseDTO<Station>
{
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

    public override async Task<Station> UpdateModelAsync(Station model, AppDbContext dbContext)
    {
        var existingStation = await dbContext.Stations.FirstOrDefaultAsync(
          s => s.ID == ID
        );
        if (existingStation is not null)
        {
            throw ServiceException.BadRequest($"ID {ID} already exists");
        }

        model.ID = ID;
        model.FID = FID;
        model.Nimi = Nimi;
        model.Namn = Namn;
        model.Name = Name;
        model.Osoite = Osoite;
        model.Adress = Adress;
        model.Kaupunki = Kaupunki;
        model.Stad = Stad;
        model.Operaattor = Operaattor;
        model.Kapasiteet = Kapasiteet;
        model.X = X;
        model.Y = Y;
        return model;
    }
}
