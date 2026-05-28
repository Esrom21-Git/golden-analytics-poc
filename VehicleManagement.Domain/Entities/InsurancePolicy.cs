using System;

namespace VehicleManagement.Domain.Entities;

public sealed class InsurancePolicy
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public Guid VehicleId { get; init; }
    public string CarrierName { get; init; } = string.Empty;
    public string PolicyNumber { get; init; } = string.Empty;
    public DateTime EffectiveDate { get; init; }
    public DateTime ExpirationDate { get; init; }
    public decimal? PremiumAmount { get; init; }
    public decimal? DeductibleAmount { get; init; }
    public string Notes { get; init; } = string.Empty;
}
