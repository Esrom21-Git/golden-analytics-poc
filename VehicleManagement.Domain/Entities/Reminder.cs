using System;

namespace VehicleManagement.Domain.Entities;

public sealed class Reminder
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public Guid UserId { get; init; }
    public Guid RelatedEntityId { get; init; }
    public string RelatedEntityType { get; init; } = string.Empty;
    public Guid VehicleId { get; init; }
    public string ReminderType { get; init; } = string.Empty;
    public DateTime TriggerAt { get; init; }
    public bool IsSent { get; init; }
    public string Notes { get; init; } = string.Empty;
    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
}
