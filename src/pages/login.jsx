import React, { useState } from "react";
import { loginUser } from "../servicess/api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useAuth();

  const navigate = useNavigate();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validateForm = () => {
    if (!form.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Invalid email format");
      return false;
    }
    if (!form.password) {
      setError("Password is required");
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await loginUser(form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setUser(res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 p-4">
      <div className="max-w-md w-full bg-gradient-to-br from-white to-amber-50 p-8 rounded-xl shadow-xl border border-amber-200">
        <h2 className="text-2xl font-semibold mb-6 text-center text-amber-900">
          Login
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
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
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 transition duration-300 shadow-md hover:shadow-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-amber-700">
          Don't have an account?{" "}
          <Link className="text-purple-600 font-medium hover:text-purple-700" to="/signup">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}