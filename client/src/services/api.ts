// API Configuration
// Use `import.meta.env` for Vite and fallback to process.env when available (for portability).
const API_BASE_URL =
  (typeof process !== "undefined" && (process as any).env && (process as any).env.REACT_APP_API_URL) ||
  (import.meta && (import.meta as any).env && (import.meta as any).env.VITE_API_URL) ||
  "http://localhost:5000/api";

// Types for Vehicle Management
export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  status: "active" | "inactive" | "maintenance";
  mileage: number;
  lastServiceDate: string;
  owner: string;
}

export interface CreateVehicleRequest {
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  owner: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// API Error Handler
class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// API Client Class
class ApiClient {
  private baseUrl: string;
  private headers: HeadersInit;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  // Set Authorization Token
  setAuthToken(token: string) {
    this.headers = {
      ...this.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  // Generic GET Request
  async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers: this.headers,
      });

      if (!response.ok) {
        throw new ApiError(response.status, `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`GET ${endpoint} failed:`, error);
      throw error;
    }
  }

  // Generic POST Request
  async post<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new ApiError(response.status, `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`POST ${endpoint} failed:`, error);
      throw error;
    }
  }

  // Generic PUT Request
  async put<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "PUT",
        headers: this.headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new ApiError(response.status, `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`PUT ${endpoint} failed:`, error);
      throw error;
    }
  }

  // Generic DELETE Request
  async delete<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "DELETE",
        headers: this.headers,
      });

      if (!response.ok) {
        throw new ApiError(response.status, `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`DELETE ${endpoint} failed:`, error);
      throw error;
    }
  }
}

// Initialize API Client
const apiClient = new ApiClient(API_BASE_URL);

// ============================================
// VEHICLE ENDPOINTS
// ============================================

export const vehicleApi = {
  // Get all vehicles
  getAllVehicles: async (): Promise<Vehicle[]> => {
    const response = await apiClient.get<ApiResponse<Vehicle[]>>("/vehicles");
    return response.data || [];
  },

  // Get single vehicle by ID
  getVehicleById: async (id: string): Promise<Vehicle> => {
    const response = await apiClient.get<ApiResponse<Vehicle>>(`/vehicles/${id}`);
    if (!response.data) throw new Error("Vehicle not found");
    return response.data;
  },

  // Create new vehicle
  createVehicle: async (vehicle: CreateVehicleRequest): Promise<Vehicle> => {
    const response = await apiClient.post<ApiResponse<Vehicle>>("/vehicles", vehicle);
    if (!response.data) throw new Error("Failed to create vehicle");
    return response.data;
  },

  // Update vehicle
  updateVehicle: async (id: string, vehicle: Partial<Vehicle>): Promise<Vehicle> => {
    const response = await apiClient.put<ApiResponse<Vehicle>>(`/vehicles/${id}`, vehicle);
    if (!response.data) throw new Error("Failed to update vehicle");
    return response.data;
  },

  // Delete vehicle
  deleteVehicle: async (id: string): Promise<boolean> => {
    const response = await apiClient.delete<ApiResponse<{ success: boolean }>>(`/vehicles/${id}`);
    return response.data?.success || false;
  },

  // Get vehicle statistics
  getVehicleStats: async (): Promise<{
    total: number;
    active: number;
    inactive: number;
    maintenance: number;
  }> => {
    const response = await apiClient.get<ApiResponse<any>>("/vehicles/stats");
    return response.data || { total: 0, active: 0, inactive: 0, maintenance: 0 };
  },
};

// ============================================
// MAINTENANCE ENDPOINTS
// ============================================

export const maintenanceApi = {
  // Get maintenance records
  getMaintenanceRecords: async (vehicleId: string) => {
    const response = await apiClient.get<ApiResponse<any>>(`/vehicles/${vehicleId}/maintenance`);
    return response.data || [];
  },

  // Add maintenance record
  addMaintenanceRecord: async (vehicleId: string, record: any) => {
    const response = await apiClient.post<ApiResponse<any>>(
      `/vehicles/${vehicleId}/maintenance`,
      record
    );
    return response.data;
  },
};

// ============================================
// DRIVER ENDPOINTS
// ============================================

export const driverApi = {
  // Get all drivers
  getAllDrivers: async () => {
    const response = await apiClient.get<ApiResponse<any>>("/drivers");
    return response.data || [];
  },

  // Get driver by ID
  getDriverById: async (id: string) => {
    const response = await apiClient.get<ApiResponse<any>>(`/drivers/${id}`);
    return response.data;
  },

  // Create driver
  createDriver: async (driver: any) => {
    const response = await apiClient.post<ApiResponse<any>>("/drivers", driver);
    return response.data;
  },
};

// ============================================
// EXPORT API CLIENT
// ============================================

export default apiClient;
export { ApiClient, ApiError };
