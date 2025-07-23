import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api.js";

export default function RegisterForm({ role }) {
  const navigate = useNavigate(); 

  const [form, setForm] = useState({
    companyName: "",
    fullName: "",
    email: "",
    password: "",
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

    const isEmployer = role === "employer";
    const nameField = isEmployer ? "companyName" : "fullName";

    const url = isEmployer
      ? "/auth/register-employer"
      : "/auth/register-job-seeker";

    // Validation
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
      const dataToSend = {
        email: form.email,
        password: form.password,
        [nameField]: form[nameField],
      };

      const response = await API.post(url, dataToSend);

      if (response.data.success) {
        setMessage("Registration successful! Redirecting to login...");

        setForm({
          companyName: "",
          fullName: "",
          email: "",
          password: "",
        });

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(response.data.message || "Registration failed.");
      }

    } catch (err) {
        console.error("Registration error:", err.response || err);
        setError(
          err.response?.data?.message || "Registration failed. Please try again."
      );
}

  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <h3>Register as {role === "employer" ? "Employer" : "Job Seeker"}</h3>

      <input
        name={role === "employer" ? "companyName" : "fullName"}
        placeholder={role === "employer" ? "Company Name" : "Full Name"}
        value={role === "employer" ? form.companyName : form.fullName}
        onChange={handleChange}
        required
      />

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
        minLength={6}
      />

      {error && <div style={{ color: "red" }}>{error}</div>}
      {message && <div style={{ color: "green" }}>{message}</div>}

      <button type="submit">Register</button>
    </form>
  );
}
