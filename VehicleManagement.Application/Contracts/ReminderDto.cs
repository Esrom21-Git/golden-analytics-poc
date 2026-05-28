using System;

namespace VehicleManagement.Application.Contracts;

public sealed class ReminderDto
{
    public Guid Id { get; init; }
    public Guid VehicleId { get; init; }
    public string ReminderType { get; init; } = string.Empty;
    public DateTime TriggerAt { get; init; }
    public bool IsSent { get; init; }
    public string Notes { get; init; } = string.Empty;
}
