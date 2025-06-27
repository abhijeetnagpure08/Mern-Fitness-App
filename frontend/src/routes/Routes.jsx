import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import MemberLogin from "../pages/member/MemberLogin";
import MemberRegister from "../pages/member/MemberRegister";
import MemberDashboard from "../pages/member/MemberDashboard";

import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => (
  <Routes>
    {/* Admin */}
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route
      path="/admin/dashboard"
      element={
        <ProtectedRoute role="admin">
          <AdminDashboard />
        </ProtectedRoute>
      }
    />

    {/* Member */}
    <Route path="/login" element={<MemberLogin />} />
    <Route path="/register" element={<MemberRegister />} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute role="member">
          <MemberDashboard />
        </ProtectedRoute>
      }
    />

    {/* Default */}
    <Route path="*" element={<Navigate to="/login" />} />
  </Routes>
);

export default AppRoutes;
