import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Toast from "../common/Toast";
import { useHR } from "../../context/HRContext";

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { toast, hideToast, theme } = useHR();

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "dark bg-slate-900" : "bg-slate-50"
      }`}
    >
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen lg:ml-64">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      <Toast toast={toast} onClose={hideToast} />
    </div>
  );
}

export default MainLayout; 