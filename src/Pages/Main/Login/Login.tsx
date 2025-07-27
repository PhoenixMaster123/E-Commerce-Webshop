import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { login as apiLogin } from "../../../services/api";
import {useAuth} from "../../../auth/useAuth.ts";

const LoginPage: React.FC = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userFromApi = await apiLogin(username, password);

      login(
          {
            id: userFromApi.id.toString(),
            name: userFromApi.username,
            role: userFromApi.role as 'user' | 'admin',
          },
          userFromApi.token!
      );

      if (userFromApi.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname || '/';
        navigate(from, { replace: true });
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
            (err.response?.data as { message?: string })?.message ??
            "Invalid credentials. Please try again."
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const backgroundClass = isDarkMode ? "bg-gray-900" : "bg-gray-100";
  const cardClass = isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900";
  const inputClass = isDarkMode
      ? "bg-gray-700 border-gray-600 text-gray-100"
      : "bg-gray-100 border-gray-300 text-gray-900";
  const iconColor = isDarkMode ? "text-gray-100" : "text-gray-600";

  // ---------------- Render ----------------
  return (
      <div className={`${backgroundClass} min-h-screen flex items-center justify-center transition-colors duration-300 px-4`}>
        {/* Background glow */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 opacity-20 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 opacity-20 blur-3xl rounded-full pointer-events-none"></div>

        <div className={`relative ${cardClass} rounded-3xl shadow-2xl p-12 sm:p-16 w-full max-w-xl flex flex-col items-center transition-all backdrop-blur-xl border border-white/10`}>
          {/* Theme toggle */}
          <button
              type="button"
              className={`self-end mb-6 text-3xl ${iconColor} hover:text-yellow-400 transition-colors`}
              onClick={toggleTheme}
              title="Toggle theme"
          >
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} size="2xl" />
          </button>

          {/* Avatar icon */}
          <div className="mb-8">
            <svg width="72" height="72" fill="none" viewBox="0 0 24 24">
              <path
                  fill={isDarkMode ? "#eee" : "#444"}
                  d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.314 0-10 1.657-10 5v3h20v-3c0-3.343-6.686-5-10-5z"
              />
            </svg>
          </div>

          <h2 className="text-4xl font-extrabold mb-8 tracking-wide">Login</h2>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-6">
              <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className={`w-full px-6 py-4 rounded-xl border text-lg sm:text-2xl ${inputClass} focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
              />
            </div>

            <div className="mb-6">
              <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`w-full px-6 py-4 rounded-xl border text-lg sm:text-2xl ${inputClass} focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
              />
            </div>

            <div className="flex items-center justify-between mb-6 text-base sm:text-xl">
              <label className="flex items-center">
                <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-3 accent-blue-500 scale-125"
                />
                Remember me
              </label>
              <Link to="/reset" className="text-blue-500 hover:underline font-semibold">
                Forgot password?
              </Link>
            </div>

            {error && (
                <div className="mb-6 text-red-500 text-lg text-center">{error}</div>
            )}

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-lg sm:text-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? "Logging in…" : "Login"}
            </button>
          </form>

          <div className="mt-10 text-base sm:text-xl">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline font-bold">
              Register
            </Link>
          </div>
        </div>
      </div>
  );
};

export default LoginPage;
