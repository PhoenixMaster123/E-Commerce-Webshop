import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { registerUser } from "../../../services/api";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  // ---------------- Form State ----------------
  const [form, setForm] = useState<RegisterForm>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // ---------------- Handlers ----------------
  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (
      e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await registerUser({
        username: form.username,
        email: form.email,
        password: form.password,
      });
      setSuccess(true);
      // Redirect to login after a short delay so the user sees the message
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: unknown) {
      // Narrow error type with axios helper
      if (axios.isAxiosError(err)) {
        setError(
            (err.response?.data as { message?: string } | undefined)?.message ??
            "Registration failed. Please try again."
        );
      } else {
        setError("Registration failed. Please try again.");
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
          <button
              type="button"
              className={`self-end mb-4 text-4xl ${
                  isDarkMode ? "text-gray-100" : "text-gray-600"
              } hover:text-blue-500 transition-colors`}
              onClick={toggleTheme}
          >
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} size="2x" />
          </button>

          <div className="mb-8">
            <svg width="72" height="72" fill="none" viewBox="0 0 24 24">
              <path
                  fill={isDarkMode ? "#eee" : "#444"}
                  d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.314 0-10 1.657-10 5v3h20v-3c0-3.343-6.686-5-10-5z"
              />
            </svg>
          </div>

          <h1 className="text-4xl font-extrabold mb-10">Create Account</h1>

          {/* -------------- FORM -------------- */}
          <form className="w-full" onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-8">
              <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  className={`w-full px-8 py-5 rounded-xl border text-2xl ${
                      isDarkMode
                          ? "bg-gray-700 border-gray-600 text-gray-100"
                          : "bg-gray-100 border-gray-300 text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              />
            </div>

            {/* Email */}
            <div className="mb-8">
              <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
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
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className={`w-full px-8 py-5 rounded-xl border text-2xl ${
                      isDarkMode
                          ? "bg-gray-700 border-gray-600 text-gray-100"
                          : "bg-gray-100 border-gray-300 text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-8">
              <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Repeat your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className={`w-full px-8 py-5 rounded-xl border text-2xl ${
                      isDarkMode
                          ? "bg-gray-700 border-gray-600 text-gray-100"
                          : "bg-gray-100 border-gray-300 text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              />
            </div>

            {/* Terms of Service */}
            <div className="flex items-center justify-between mb-6 text-xl">
              <label className="flex items-center">
                <input
                    type="checkbox"
                    required
                    className="mr-2 accent-blue-500"
                    name="tos"
                />
                I agree all statements in&nbsp;
                <Link
                    to="https://policies.google.com/terms?hl=en-US"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                >
                  Terms of Service
                </Link>
              </label>
            </div>

            {/* Error / Success messages */}
            {error && (
                <div className="mb-6 text-red-500 text-xl text-center">{error}</div>
            )}
            {success && (
                <div className="mb-6 text-green-500 text-xl text-center">
                  Registration successful! Redirecting…
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                style={{ fontSize: "1.4em" }}
                className={`w-full py-5 rounded-xl font-bold transition-all duration-300 bg-gradient-to-r from-purple-700 to-purple-800 text-white hover:from-purple-700 hover:to-purple-800 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? "Signing Up…" : "Sign Up"}
            </button>

            {/* Link to Login */}
            <div className="mt-6 text-2xl">
              Already have an account? {" "}
              <Link
                  to="/login"
                  className="text-blue-500 hover:underline font-bold"
              >
                Login here
              </Link>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Register;
