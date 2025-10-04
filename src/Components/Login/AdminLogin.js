import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ message: "", color: "", visible: false });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Email regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setStatus({
        message: "Invalid email format.",
        color: "bg-red-500",
        visible: true,
      });
      setTimeout(() => setStatus({ ...status, visible: false }), 4000);
      return;
    }

    // Password regex
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordPattern.test(password)) {
      setStatus({
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
        color: "bg-red-500",
        visible: true,
      });
      setTimeout(() => setStatus({ ...status, visible: false }), 4000);
      return;
    }

    // Success
    setStatus({
      message: "Login successful!",
      color: "bg-green-500",
      visible: true,
    });

    setTimeout(() => {
      navigate("/dashboard"); // 👈 Redirect to dashboard after login
    }, 1000);
  };

  return (
    <div className="bg-gray-100 dark:bg-[#020217] flex items-center justify-center h-screen relative">
      {/* Status message */}
      {status.visible && (
        <p
          className={`absolute top-[5rem] text-white rounded-lg font-bold px-6 py-2 ${status.color}`}
        >
          {status.message}
        </p>
      )}

      <div className="bg-white dark:bg-[#020221] dark:text-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="w-full dark:border-gray-900 border rounded px-3 py-2 mb-4 dark:bg-[transparent]"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="block mb-2 font-medium">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full border dark:border-gray-900 rounded px-3 py-2 mb-6 dark:bg-[transparent]"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          <a href="../register/index.html" className="text-blue-500 hover:underline">
            Register a Student
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
