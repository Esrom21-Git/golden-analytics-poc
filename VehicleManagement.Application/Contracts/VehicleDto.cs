using System;

namespace VehicleManagement.Application.Contracts;

public sealed class VehicleDto
{
    public Guid Id { get; init; }
    public string Vin { get; init; } = string.Empty;
    public string Plate { get; init; } = string.Empty;
    public string State { get; init; } = string.Empty;
    public string Make { get; init; } = string.Empty;
    public string Model { get; init; } = string.Empty;
    public int Year { get; init; }
    public int? Mileage { get; init; }
    public string Nickname { get; init; } = string.Empty;
}
