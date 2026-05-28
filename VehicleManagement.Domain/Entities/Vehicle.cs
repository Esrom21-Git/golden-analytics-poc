using System;

namespace VehicleManagement.Domain.Entities;

public sealed class Vehicle
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public Guid UserId { get; init; }
    public string Vin { get; init; } = string.Empty;
    public string Plate { get; init; } = string.Empty;
    public string State { get; init; } = string.Empty;
    public string Make { get; init; } = string.Empty;
    public string Model { get; init; } = string.Empty;
    public int Year { get; init; }
    public int? Mileage { get; init; }
    public string Nickname { get; init; } = string.Empty;
    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
    public bool IsArchived { get; init; }
}
