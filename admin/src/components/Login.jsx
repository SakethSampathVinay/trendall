import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/user/admin`, {
        email: adminEmail,
        password: adminPassword,
      });

      if (response.data.success) {
        console.log("Login successful:", response.data.token);
        setToken(response.data.token);
        navigate("/add");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Admin Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Admin Email
            </label>
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-700 text-white font-semibold py-2 rounded-md transition"
          >
            Login as Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
