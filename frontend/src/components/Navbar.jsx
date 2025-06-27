import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">FitnessApp</Link>
      <div className="space-x-4">
        {!token ? (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        ) : (
          <>
            {role === "member" && <Link to="/member">Dashboard</Link>}
            {role === "admin" && <Link to="/admin">Admin</Link>}
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
