using System;

namespace VehicleManagement.Domain.Entities;

public sealed class Violation
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public Guid VehicleId { get; init; }
    public string Jurisdiction { get; init; } = string.Empty;
    public string CitationNumber { get; init; } = string.Empty;
    public decimal AmountDue { get; init; }
    public DateTime DueDate { get; init; }
    public string Status { get; init; } = string.Empty;
    public string Notes { get; init; } = string.Empty;
}
