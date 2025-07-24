import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", role: "jobseeker" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const { email, password, role } = form;

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const res = await API.post("/auth/login", { email, password, role });
      const { token } = res.data;

      localStorage.setItem("user", JSON.stringify({ email, role, token }));
      setMessage("Login successful!");

      setTimeout(() => {
        navigate(role === "employer" ? "/employer/manage-jobs" : "/jobs");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 text-center">Login</h2>

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
      />

      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        <option value="jobseeker">Job Seeker</option>
        <option value="employer">Employer</option>
      </select>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      {message && <p className="text-green-600 text-sm">{message}</p>}

      <button
        type="submit"
        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded shadow-md"
      >
        Login
      </button>
    </form>
  );
}
