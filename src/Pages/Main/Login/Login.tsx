import React, { useState } from "react";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={`${darkMode ? "bg-gray-900" : "bg-gray-100"} min-h-screen flex items-center justify-center transition-colors duration-300`}>
      <div className={`${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"} rounded-3xl shadow-2xl p-16 w-full max-w-xl flex flex-col items-center transition-colors duration-300`}>
        <button
          type="button"
          className={`self-end mb-4 text-4xl ${darkMode ? "text-gray-100" : "text-gray-600"} hover:text-blue-500 transition-colors`}
          onClick={() => setDarkMode((d) => !d)}
        >
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} size="2x" />
        </button>
        <div className="mb-8">
          <svg width="72" height="72" fill="none" viewBox="0 0 24 24">
            <path
              fill={darkMode ? "#eee" : "#444"}
              d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.314 0-10 1.657-10 5v3h20v-3c0-3.343-6.686-5-10-5z"
            />
          </svg>
        </div>
        <h2 className="text-4xl font-extrabold mb-10">Login</h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-8">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full px-8 py-5 rounded-xl border text-2xl ${darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-gray-100 border-gray-300 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
            />
          </div>
          <div className="mb-8">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full px-8 py-5 rounded-xl border text-2xl ${darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-gray-100 border-gray-300 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
            />
          </div>
          <div className="flex items-center justify-between mb-8 text-2xl">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-4 accent-blue-500 scale-150"
              />
              Remember me
            </label>
            <a href="/forgot" className="text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-5 rounded-xl bg-blue-600 text-2xl font-bold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-10 text-2xl">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline font-bold">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;