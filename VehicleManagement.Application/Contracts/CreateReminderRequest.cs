using System;

namespace VehicleManagement.Application.Contracts;

public sealed class CreateReminderRequest
{
    public Guid VehicleId { get; init; }
    public string ReminderType { get; init; } = string.Empty;
    public DateTime TriggerAt { get; init; }
    public string Notes { get; init; } = string.Empty;
}
