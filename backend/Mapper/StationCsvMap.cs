namespace Backend.Mapper;

using Backend.Models;
using CsvHelper.Configuration;
public class StationCsvMap : ClassMap<Station>
{
    public StationCsvMap()
    {
        Map(s => s.ID).Name("ID");
        Map(s => s.FID).Name("FID");
        Map(s => s.Nimi).Name("Nimi");
        Map(s => s.Namn).Name("Namn");
        Map(s => s.Name).Name("Name");
        Map(s => s.Osoite).Name("Osoite");
        Map(s => s.Adress).Name("Adress");
        Map(s => s.Kaupunki).Name("Kaupunki");
        Map(s => s.Stad).Name("Stad");
        Map(s => s.Operaattor).Name("Operaattor");
        Map(s => s.Kapasiteet).Name("Kapasiteet");
        Map(s => s.X).Name("x");
        Map(s => s.Y).Name("y");
    }
}
