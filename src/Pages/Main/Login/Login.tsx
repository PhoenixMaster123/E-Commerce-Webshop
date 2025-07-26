import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { login as apiLogin } from "../../../services/api"; // <-- API function (username, password)

const LoginPage: React.FC = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  // ---------------- State ----------------
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ---------------- Submit Handler ----------------
  const handleSubmit = async (
      e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      // Use API login with username + password
      await apiLogin(username, password);

      // TODO: if you want token persistence only when rememberMe is checked,
      // you could conditionally map token to sessionStorage vs localStorage here.
      // Current apiLogin stores token in localStorage by default.

      // Redirect to the page user attempted to access or to home
      const from =
          (location.state as { from?: { pathname: string } } | null)?.from
              ?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
            (err.response?.data as { message?: string } | undefined)?.message ??
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

  // ---------------- Render ----------------
  return (
      <div
          className={`${isDarkMode ? "bg-gray-900" : "bg-gray-100"} min-h-screen flex items-center justify-center transition-colors duration-300`}
      >
        <div
            className={`${isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"} rounded-3xl shadow-2xl p-16 w-full max-w-xl flex flex-col items-center transition-colors duration-300`}
        >
          {/* Theme Toggle */}
          <button
              type="button"
              className={`self-end mb-4 text-4xl ${
                  isDarkMode ? "text-gray-100" : "text-gray-600"
              } hover:text-blue-500 transition-colors`}
              onClick={toggleTheme}
          >
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} size="2x" />
          </button>

          {/* Avatar Icon */}
          <div className="mb-8">
            <svg width="72" height="72" fill="none" viewBox="0 0 24 24">
              <path
                  fill={isDarkMode ? "#eee" : "#444"}
                  d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.314 0-10 1.657-10 5v3h20v-3c0-3.343-6.686-5-10-5z"
              />
            </svg>
          </div>

          <h2 className="text-4xl font-extrabold mb-10">Login</h2>

          {/* ---------------- FORM ---------------- */}
          <form onSubmit={handleSubmit} className="w-full">
            {/* Username */}
            <div className="mb-8">
              <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className={`w-full px-8 py-5 rounded-xl border text-2xl ${
                      isDarkMode
                          ? "bg-gray-700 border-gray-600 text-gray-100"
                          : "bg-gray-100 border-gray-300 text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              />
            </div>

            {/* Password */}
            <div className="mb-8">
              <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`w-full px-8 py-5 rounded-xl border text-2xl ${
                      isDarkMode
                          ? "bg-gray-700 border-gray-600 text-gray-100"
                          : "bg-gray-100 border-gray-300 text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              />
            </div>

            {/* Remember me & Forgot */}
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
              <Link to="/reset" className="text-blue-500 hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-8 text-red-500 text-xl text-center">{error}</div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                style={{ fontSize: "1.4em" }}
                className={`w-full py-5 rounded-xl font-bold transition-all duration-300 bg-gradient-to-r from-purple-700 to-purple-800 text-white hover:from-purple-700 hover:to-purple-800 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? "Logging in…" : "Login"}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-10 text-2xl">
            Don't have an account? {" "}
            <Link to="/register" className="text-blue-500 hover:underline font-bold">
              Register
            </Link>
          </div>
        </div>
      </div>
  );
};

export default LoginPage;
