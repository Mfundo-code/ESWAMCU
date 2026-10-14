import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useAuth } from "../context/AuthContext";

function AdminLayout() {
  const { isAuthed } = useAuth();
  const [open, setOpen] = useState(false);

  if (!isAuthed) return <Navigate to="/admin/login" replace />;

  return (
    <div className="adm">
      <Sidebar open={open} onNavigate={() => setOpen(false)} />
      {open && <div className="adm-scrim" onClick={() => setOpen(false)} />}
      <div className="adm-main">
        <Topbar onMenu={() => setOpen(true)} />
        <main className="adm-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
