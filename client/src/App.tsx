import React, { useState } from "react";
import Home from "./pages/Home";
import VehicleDashboard from "./pages/VehicleDashboard";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState<"insights" | "vehicles">(
    localStorage.getItem("currentPage") as "insights" | "vehicles" || "insights"
  );

  const handlePageChange = (page: "insights" | "vehicles") => {
    setCurrentPage(page);
    localStorage.setItem("currentPage", page);
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold text-blue-600">Dashboard</h1>
              <div className="flex gap-4">
                <button
                  onClick={() => handlePageChange("insights")}
                  className={`px-4 py-2 rounded-md transition ${
                    currentPage === "insights"
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  GoldenInsights
                </button>
                <button
                  onClick={() => handlePageChange("vehicles")}
                  className={`px-4 py-2 rounded-md transition ${
                    currentPage === "vehicles"
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Vehicle Management
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      {currentPage === "insights" ? <Home /> : <VehicleDashboard />}
    </div>
  );
}

export default App;
