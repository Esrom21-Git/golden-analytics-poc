using System.Collections.Generic;
using VehicleManagement.Application.Contracts;

namespace VehicleManagement.Application.Services;

public interface IVehicleService
{
    IEnumerable<VehicleDto> GetVehicles();
    VehicleDto CreateVehicle(CreateVehicleRequest request);
}
