using System.Collections.Concurrent;
using System.Linq;
using VehicleManagement.Application.Contracts;
using VehicleManagement.Application.Services;
using VehicleManagement.Domain.Entities;

namespace VehicleManagement.Infrastructure.Services;

public sealed class VehicleService : IVehicleService
{
    private readonly ConcurrentDictionary<Guid, Vehicle> _vehicles = new();

    // Seed some sample vehicles for demo/testing
    public VehicleService()
    {
        var samples = new[]
        {
            new Vehicle
            {
                Id = Guid.NewGuid(),
                Vin = "1HGCM82633A004352",
                Plate = "ABC123",
                State = "WA",
                Make = "Toyota",
                Model = "Camry",
                Year = 2023,
                Mileage = 5200,
                Nickname = "Fleet-01"
            },
            new Vehicle
            {
                Id = Guid.NewGuid(),
                Vin = "2FTRX18W1XCA12345",
                Plate = "XYZ789",
                State = "WA",
                Make = "Ford",
                Model = "F-150",
                Year = 2021,
                Mileage = 15000,
                Nickname = "Truck-Alpha"
            },
            new Vehicle
            {
                Id = Guid.NewGuid(),
                Vin = "3FAHP0HA6AR123456",
                Plate = "JKL456",
                State = "WA",
                Make = "Honda",
                Model = "Civic",
                Year = 2022,
                Mileage = 8200,
                Nickname = "Fleet-02"
            }
        };

        foreach (var v in samples)
        {
            _vehicles[v.Id] = v;
        }
    }

    public IEnumerable<VehicleDto> GetVehicles()
    {
        return _vehicles.Values.Select(v => new VehicleDto
        {
            Id = v.Id,
            Vin = v.Vin,
            Plate = v.Plate,
            State = v.State,
            Make = v.Make,
            Model = v.Model,
            Year = v.Year,
            Mileage = v.Mileage,
            Nickname = v.Nickname
        });
    }

    public VehicleDto CreateVehicle(CreateVehicleRequest request)
    {
        var vehicle = new Vehicle
        {
            Id = Guid.NewGuid(),
            Vin = request.Vin,
            Plate = request.Plate,
            State = request.State,
            Make = request.Make,
            Model = request.Model,
            Year = request.Year,
            Mileage = request.Mileage,
            Nickname = request.Nickname,
        };

        _vehicles[vehicle.Id] = vehicle;

        return new VehicleDto
        {
            Id = vehicle.Id,
            Vin = vehicle.Vin,
            Plate = vehicle.Plate,
            State = vehicle.State,
            Make = vehicle.Make,
            Model = vehicle.Model,
            Year = vehicle.Year,
            Mileage = vehicle.Mileage,
            Nickname = vehicle.Nickname
        };
    }
}
