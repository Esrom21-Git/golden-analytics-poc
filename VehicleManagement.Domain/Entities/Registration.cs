using System;

namespace VehicleManagement.Domain.Entities;

public sealed class Registration
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public Guid VehicleId { get; init; }
    public string Plate { get; init; } = string.Empty;
    public string State { get; init; } = string.Empty;
    public DateTime ExpirationDate { get; init; }
    public string RenewalStatus { get; init; } = string.Empty;
    public string Notes { get; init; } = string.Empty;
}
