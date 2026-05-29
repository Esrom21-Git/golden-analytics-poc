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
      <nav className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border-b border-slate-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14">
            <div className="flex items-center gap-8">
              <span className="text-xl font-bold text-amber-400">Golden Analytics</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange("insights")}
                  className={`px-4 py-2 rounded-md text-sm transition ${
                    currentPage === "insights"
                      ? "bg-amber-500 text-slate-900 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-slate-700"
                  }`}
                >
                  Spending Dashboard
                </button>
                <button
                  onClick={() => handlePageChange("vehicles")}
                  className={`px-4 py-2 rounded-md text-sm transition ${
                    currentPage === "vehicles"
                      ? "bg-amber-500 text-slate-900 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-slate-700"
                  }`}
                >
                  Admin
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
