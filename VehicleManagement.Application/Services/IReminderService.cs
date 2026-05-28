using System.Collections.Generic;
using VehicleManagement.Application.Contracts;

namespace VehicleManagement.Application.Services;

public interface IReminderService
{
    IEnumerable<ReminderDto> GetReminders();
    ReminderDto CreateReminder(CreateReminderRequest request);
}
