import { useState } from "react";
import { useApi, useMutation } from "@/hooks/useApi";
import { vehicleApi, Vehicle, CreateVehicleRequest } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function VehicleDashboard() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState<CreateVehicleRequest>({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    licensePlate: "",
    owner: "",
  });

  // Fetch all vehicles
  const { data: vehicles, loading, error } = useApi(() => vehicleApi.getAllVehicles());

  // Create vehicle mutation
  const { mutate: createVehicle, loading: creating } = useMutation(
    (data: CreateVehicleRequest) => vehicleApi.createVehicle(data),
    {
      onSuccess: () => {
        setFormData({ make: "", model: "", year: new Date().getFullYear(), licensePlate: "", owner: "" });
        setShowCreateForm(false);
        // Refresh vehicles list
        window.location.reload();
      },
      onError: (error) => alert(`Error: ${error.message}`),
    }
  );

  // Delete vehicle mutation
  const { mutate: deleteVehicle } = useMutation(
    (id: string) => vehicleApi.deleteVehicle(id),
    {
      onSuccess: () => {
        alert("Vehicle deleted successfully");
        window.location.reload();
      },
      onError: (error) => alert(`Error: ${error.message}`),
    }
  );

  const handleCreateVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    await createVehicle(formData);
  };

  const handleDeleteVehicle = (id: string) => {
    if (confirm("Are you sure you want to delete this vehicle?")) {
      deleteVehicle(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Vehicle Management</h1>
            <p className="text-slate-600 mt-2">Manage your fleet of vehicles</p>
          </div>
          <Button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            + Add Vehicle
          </Button>
        </div>

        {/* Create Form */}
        {showCreateForm && (
          <Card className="mb-8 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle>Add New Vehicle</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateVehicle} className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Make (e.g., Toyota)"
                  value={formData.make}
                  onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                  required
                />
                <Input
                  placeholder="Model (e.g., Camry)"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  required
                />
                <Input
                  placeholder="Year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  required
                />
                <Input
                  placeholder="License Plate"
                  value={formData.licensePlate}
                  onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value })}
                  required
                />
                <Input
                  placeholder="Owner"
                  value={formData.owner}
                  onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                  required
                />
                <div className="flex gap-2">
                  <Button type="submit" disabled={creating} className="flex-1">
                    {creating ? "Creating..." : "Create Vehicle"}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="bg-gray-400 hover:bg-gray-500"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Error State */}
        {error && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="font-semibold text-red-900">Error Loading Vehicles</p>
              <p className="text-sm text-red-700">{error.message}</p>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <span className="text-slate-600">Loading vehicles...</span>
          </div>
        )}

        {/* Vehicles Grid */}
        {!loading && vehicles && vehicles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle: Vehicle) => (
              <Card key={vehicle.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </CardTitle>
                  <CardDescription>{vehicle.licensePlate}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-semibold">Owner:</span> {vehicle.owner}
                    </p>
                    <p>
                      <span className="font-semibold">Status:</span>
                      <span
                        className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                          vehicle.status === "active"
                            ? "bg-green-100 text-green-800"
                            : vehicle.status === "maintenance"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {vehicle.status}
                      </span>
                    </p>
                    <p>
                      <span className="font-semibold">Mileage:</span> {vehicle.mileage.toLocaleString()} km
                    </p>
                    <p>
                      <span className="font-semibold">Last Service:</span>{" "}
                      {new Date(vehicle.lastServiceDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      onClick={() => handleDeleteVehicle(vehicle.id)}
                      className="w-full bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && (!vehicles || vehicles.length === 0) && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-slate-600 mb-4">No vehicles found</p>
              <Button onClick={() => setShowCreateForm(true)}>Create First Vehicle</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
