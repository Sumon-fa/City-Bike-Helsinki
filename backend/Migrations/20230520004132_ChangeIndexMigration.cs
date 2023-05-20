using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    public partial class ChangeIndexMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_journeys_departure_departure_station_id_departure_station_n",
                table: "journeys");

            migrationBuilder.CreateIndex(
                name: "ix_stations_nimi",
                table: "stations",
                column: "nimi");

            migrationBuilder.CreateIndex(
                name: "ix_journeys_departure_station_name_departure",
                table: "journeys",
                columns: new[] { "departure_station_name", "departure" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_stations_nimi",
                table: "stations");

            migrationBuilder.DropIndex(
                name: "ix_journeys_departure_station_name_departure",
                table: "journeys");

            migrationBuilder.CreateIndex(
                name: "ix_journeys_departure_departure_station_id_departure_station_n",
                table: "journeys",
                columns: new[] { "departure", "departure_station_id", "departure_station_name", "return", "return_station_id", "return_station_name" });
        }
    }
}
