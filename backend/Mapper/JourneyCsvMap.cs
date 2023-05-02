namespace Backend.Mapper;

using Backend.Models;
using CsvHelper.Configuration;

public class JourneyCsvMap : ClassMap<Journey>
{
    public JourneyCsvMap()
    {
        Map(j => j.Departure).Name("Departure");
        Map(j => j.Return).Name("Return");
        Map(j => j.DepartureStationId).Name("Departure station id");
        Map(j => j.DepartureStationName).Name("Departure station name");
        Map(j => j.ReturnStationId).Name("Return station id");
        Map(j => j.ReturnStationName).Name("Return station name");
        Map(j => j.CoveredDistance).Name("Covered distance (m)");
        Map(j => j.Duration).Name("Duration (sec.)");
    }
}
