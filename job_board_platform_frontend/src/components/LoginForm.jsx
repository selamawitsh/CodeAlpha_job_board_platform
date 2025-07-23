import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "jobseeker", // must send this
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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

      // Save user data (token + role)
      const user = { email, role, token };
      localStorage.setItem("user", JSON.stringify(user));

      setMessage("Login successful!");

      // Redirect based on role
      if (role === "employer") {
        navigate("/employer/manage-jobs");
      } else {
        navigate("/jobs");
      }

    } catch (err) {
      console.error("Login error:", err.response?.data || err);
      setError(
        err.response?.data?.message ||
        "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <h3>Login</h3>

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />

      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        required
      >
        <option value="jobseeker">Job Seeker</option>
        <option value="employer">Employer</option>
      </select>

      {error && <div style={{ color: "red" }}>{error}</div>}
      {message && <div style={{ color: "green" }}>{message}</div>}

      <button type="submit">Login</button>
    </form>
  );
}
