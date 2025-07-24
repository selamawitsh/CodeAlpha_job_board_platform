import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api.js";

export default function RegisterForm({ role }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ companyName: "", fullName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const isEmployer = role === "employer";
    const nameField = isEmployer ? "companyName" : "fullName";
    const url = isEmployer ? "/auth/register-employer" : "/auth/register-job-seeker";

    if (!form[nameField] || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const response = await API.post(url, {
        email: form.email,
        password: form.password,
        [nameField]: form[nameField],
      });

      if (response.data.success) {
        setMessage("Registration successful! Redirecting to login...");
        setForm({ companyName: "", fullName: "", email: "", password: "" });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(response.data.message || "Registration failed.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 text-center">
        Register as {role === "employer" ? "Employer" : "Job Seeker"}
      </h2>

      <input
        name={role === "employer" ? "companyName" : "fullName"}
        placeholder={role === "employer" ? "Company Name" : "Full Name"}
        value={role === "employer" ? form.companyName : form.fullName}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
      />

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

      {error && <p className="text-red-600 text-sm">{error}</p>}
      {message && <p className="text-green-600 text-sm">{message}</p>}

      <button
        type="submit"
        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded shadow-md"
      >
        Register
      </button>
    </form>
  );
}
