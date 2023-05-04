using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Backend.Migrations
{
    public partial class InitialMigrations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "journeys",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    departure = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    departure_station_id = table.Column<string>(type: "text", nullable: false),
                    departure_station_name = table.Column<string>(type: "text", nullable: false),
                    @return = table.Column<DateTime>(name: "return", type: "timestamp without time zone", nullable: false),
                    return_station_id = table.Column<string>(type: "text", nullable: false),
                    return_station_name = table.Column<string>(type: "text", nullable: false),
                    covered_distance = table.Column<double>(type: "double precision", nullable: false),
                    duration = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_journeys", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "stations",
                columns: table => new
                {
                    fid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id = table.Column<string>(type: "text", nullable: false),
                    nimi = table.Column<string>(type: "text", nullable: false),
                    namn = table.Column<string>(type: "text", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    osoite = table.Column<string>(type: "text", nullable: false),
                    adress = table.Column<string>(type: "text", nullable: false),
                    kaupunki = table.Column<string>(type: "text", nullable: false),
                    stad = table.Column<string>(type: "text", nullable: false),
                    operaattor = table.Column<string>(type: "text", nullable: false),
                    kapasiteet = table.Column<int>(type: "integer", nullable: false),
                    x = table.Column<decimal>(type: "numeric", nullable: false),
                    y = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_stations", x => x.fid);
                });

            migrationBuilder.CreateIndex(
                name: "ix_journeys_departure_departure_station_id_departure_station_n",
                table: "journeys",
                columns: new[] { "departure", "departure_station_id", "departure_station_name", "return", "return_station_id", "return_station_name" });

            migrationBuilder.CreateIndex(
                name: "ix_stations_id",
                table: "stations",
                column: "id",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "journeys");

            migrationBuilder.DropTable(
                name: "stations");
        }
    }
}
