import React, { useState } from "react";
import { registerUser } from "../servicess/api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validateForm = () => {
    if (!form.name.trim()) return setError("Name is required"), false;
    if (!form.email.trim()) return setError("Email is required"), false;
    if (!/\S+@\S+\.\S+/.test(form.email))
      return setError("Invalid email format"), false;
    if (!form.password) return setError("Password is required"), false;
    if (form.password.length < 6)
      return setError("Password must be at least 6 characters"), false;
    if (form.password !== form.confirmPassword)
      return setError("Passwords do not match"), false;

    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      alert("Signup successful! Please login.");
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gradient-to-br from-white to-amber-50 rounded-xl shadow-xl p-8 border border-amber-200">

        <h2 className="text-2xl font-semibold text-center mb-6 text-amber-900">
          Create an Account
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          
          <div>
            <label className="text-sm font-medium text-amber-800">Full Name</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={onChange}
              className="w-full border border-amber-300 bg-amber-50 p-3 rounded-lg mt-1 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-amber-800">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              className="w-full border border-amber-300 bg-amber-50 p-3 rounded-lg mt-1 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-amber-800">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              className="w-full border border-amber-300 bg-amber-50 p-3 rounded-lg mt-1 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
              placeholder="At least 6 characters"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-amber-800">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={onChange}
              className="w-full border border-amber-300 bg-amber-50 p-3 rounded-lg mt-1 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
              placeholder="Re-enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 transition duration-300 shadow-md hover:shadow-lg"
          >
            {loading ? "Creating Account..." : "Signup"}
          </button>

        </form>

        <p className="text-center mt-4 text-sm text-amber-700">
          Already have an account?{" "}
          <Link to="/" className="text-purple-600 font-medium hover:text-purple-700">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}