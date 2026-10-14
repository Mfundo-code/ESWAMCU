import React from "react";
import { Route, Routes } from "react-router-dom";
import "./admin.css";
import { AuthProvider } from "./context/AuthContext";
import AdminLayout from "./components/AdminLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ResourceList from "./pages/ResourceList";

function AdminRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path=":section" element={<ResourceList />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default AdminRoutes;
