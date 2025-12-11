import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 flex justify-between items-center shadow-lg">
      <h1 
        className="text-xl font-semibold cursor-pointer hover:text-amber-200 transition duration-300" 
        onClick={() => navigate("/")}
      >
        📚 Books Manager
      </h1>

      <div className="flex items-center gap-4">

        {user ? (
          <>
            <span className="font-medium bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-1 rounded-full text-sm shadow">
              Hi, {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 rounded-lg font-medium hover:from-red-600 hover:to-pink-600 transition duration-300 shadow-md hover:shadow-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/"
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:from-amber-600 hover:to-orange-600 transition duration-300 shadow-md hover:shadow-lg"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-600 transition duration-300 shadow-md hover:shadow-lg"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}