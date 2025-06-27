import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../api/axios";

const MemberLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { email, password });
      const token = res.data.token;

      const payload = JSON.parse(atob(token.split(".")[1]));
      const role = payload.role;

      if (role !== "member") {
        setError("This is not a member account.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Member Login</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            Sign in
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          New here?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default MemberLogin;
