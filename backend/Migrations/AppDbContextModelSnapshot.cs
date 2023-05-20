﻿// <auto-generated />
using System;
using Backend.Db;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.16")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Backend.Models.Journey", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id")
                        .HasDefaultValueSql("gen_random_uuid()");

                    b.Property<double>("CoveredDistance")
                        .HasColumnType("double precision")
                        .HasColumnName("covered_distance");

                    b.Property<DateTime>("Departure")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("departure");

                    b.Property<string>("DepartureStationId")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("departure_station_id");

                    b.Property<string>("DepartureStationName")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("departure_station_name");

                    b.Property<int>("Duration")
                        .HasColumnType("integer")
                        .HasColumnName("duration");

                    b.Property<DateTime>("Return")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("return");

                    b.Property<string>("ReturnStationId")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("return_station_id");

                    b.Property<string>("ReturnStationName")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("return_station_name");

                    b.HasKey("Id")
                        .HasName("pk_journeys");

                    b.HasIndex("DepartureStationName", "Departure")
                        .HasDatabaseName("ix_journeys_departure_station_name_departure");

                    b.ToTable("journeys", (string)null);
                });

            modelBuilder.Entity("Backend.Models.Station", b =>
                {
                    b.Property<int>("FID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("fid");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("FID"));

                    b.Property<string>("Adress")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("adress");

                    b.Property<string>("ID")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("id");

                    b.Property<int>("Kapasiteet")
                        .HasColumnType("integer")
                        .HasColumnName("kapasiteet");

                    b.Property<string>("Kaupunki")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("kaupunki");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.Property<string>("Namn")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("namn");

                    b.Property<string>("Nimi")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("nimi");

                    b.Property<string>("Operaattor")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("operaattor");

                    b.Property<string>("Osoite")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("osoite");

                    b.Property<string>("Stad")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("stad");

                    b.Property<decimal>("X")
                        .HasColumnType("numeric")
                        .HasColumnName("x");

                    b.Property<decimal>("Y")
                        .HasColumnType("numeric")
                        .HasColumnName("y");

                    b.HasKey("FID")
                        .HasName("pk_stations");

                    b.HasIndex("ID")
                        .IsUnique()
                        .HasDatabaseName("ix_stations_id");

                    b.HasIndex("Nimi")
                        .HasDatabaseName("ix_stations_nimi");

                    b.ToTable("stations", (string)null);
                });
#pragma warning restore 612, 618
        }
    }
}
