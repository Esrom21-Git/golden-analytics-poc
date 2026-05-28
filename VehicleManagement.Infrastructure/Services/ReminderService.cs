using System.Collections.Concurrent;
using System.Linq;
using VehicleManagement.Application.Contracts;
using VehicleManagement.Application.Services;
using VehicleManagement.Domain.Entities;

namespace VehicleManagement.Infrastructure.Services;

public sealed class ReminderService : IReminderService
{
    private readonly ConcurrentDictionary<Guid, Reminder> _reminders = new();

    public IEnumerable<ReminderDto> GetReminders()
    {
        return _reminders.Values.Select(r => new ReminderDto
        {
            Id = r.Id,
            VehicleId = r.VehicleId,
            ReminderType = r.ReminderType,
            TriggerAt = r.TriggerAt,
            IsSent = r.IsSent,
            Notes = r.Notes
        });
    }

    public ReminderDto CreateReminder(CreateReminderRequest request)
    {
        var reminder = new Reminder
        {
            Id = Guid.NewGuid(),
            VehicleId = request.VehicleId,
            ReminderType = request.ReminderType,
            TriggerAt = request.TriggerAt,
            IsSent = false,
            Notes = request.Notes
        };

        _reminders[reminder.Id] = reminder;

        return new ReminderDto
        {
            Id = reminder.Id,
            VehicleId = reminder.VehicleId,
            ReminderType = reminder.ReminderType,
            TriggerAt = reminder.TriggerAt,
            IsSent = reminder.IsSent,
            Notes = reminder.Notes
        };
    }
}
