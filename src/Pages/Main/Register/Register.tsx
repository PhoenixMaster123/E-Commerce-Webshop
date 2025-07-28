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

interface PasswordValidationStatus {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

const Register: React.FC = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterForm>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [passwordValidationStatus, setPasswordValidationStatus] = useState<PasswordValidationStatus>({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const [showPasswordValidation, setShowPasswordValidation] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      validatePassword(value);
      if (!showPasswordValidation) {
        setShowPasswordValidation(true);
      }
    }
  };

  const validatePassword = (password: string): boolean => {
    const newStatus: PasswordValidationStatus = {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setPasswordValidationStatus(newStatus);

    return Object.values(newStatus).every(status => status === true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setShowPasswordValidation(true);

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const isPasswordValid = validatePassword(form.password);
    if (!isPasswordValid) {
      setError("Please ensure your password meets all requirements.");
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
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
            (err.response?.data as { message?: string })?.message ??
            "Registration failed. Please try again."
        );
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const bg = isDarkMode ? "bg-gray-900" : "bg-gray-100";
  const card = isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900";
  const inputStyle = isDarkMode
      ? "bg-gray-700 border-gray-600 text-gray-100"
      : "bg-gray-100 border-gray-300 text-gray-900";

  const hasValidationErrors = !Object.values(passwordValidationStatus).every(status => status === true);

  return (
      <div className={`${bg} min-h-screen flex items-center justify-center relative px-4`}>
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 opacity-20 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 opacity-20 blur-3xl rounded-full pointer-events-none" />

        <div
            className={`relative ${card} backdrop-blur-xl rounded-3xl shadow-2xl p-12 sm:p-16 w-full max-w-xl transition-all border border-white/10 flex flex-col items-center`}
        >
          {/* Theme toggle */}
          <button
              type="button"
              className={`self-end mb-6 text-3xl ${
                  isDarkMode ? "text-gray-100" : "text-gray-600"
              } hover:text-yellow-400 transition-colors`}
              onClick={toggleTheme}
          >
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} size="2xl"/>
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

          <h1 className="text-4xl font-extrabold mb-10 tracking-wide">Create Account</h1>

          <form className="w-full" onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-6">
              <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  className={`w-full px-6 py-4 rounded-xl border text-lg sm:text-2xl ${inputStyle} focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-6 py-4 rounded-xl border text-lg sm:text-2xl ${inputStyle} focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => setShowPasswordValidation(true)}
                  onBlur={() => setShowPasswordValidation(false)}
                  required
                  className={`w-full px-6 py-4 rounded-xl border text-lg sm:text-2xl ${inputStyle} focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
              />
            </div>
            {showPasswordValidation && form.password.length > 0 && (
                <ul className="mb-4 text-sm list-disc pl-5">
                  <li className={passwordValidationStatus.minLength ? "text-green-500" : "text-red-400"}>
                    Password must be at least 8 characters long.
                  </li>
                  <li className={passwordValidationStatus.hasUppercase ? "text-green-500" : "text-red-400"}>
                    Password must contain at least one uppercase letter.
                  </li>
                  <li className={passwordValidationStatus.hasLowercase ? "text-green-500" : "text-red-400"}>
                    Password must contain at least one lowercase letter.
                  </li>
                  <li className={passwordValidationStatus.hasNumber ? "text-green-500" : "text-red-400"}>
                    Password must contain at least one number.
                  </li>
                  <li className={passwordValidationStatus.hasSpecialChar ? "text-green-500" : "text-red-400"}>
                    Password must contain at least one special character.
                  </li>
                </ul>
            )}

            {/* Confirm Password */}
            <div className="mb-6">
              <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Repeat your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className={`w-full px-6 py-4 rounded-xl border text-lg sm:text-2xl ${inputStyle} focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
              />
            </div>

            {/* Terms of Service */}
            <div className="flex items-center mb-6 text-base sm:text-lg">
              <input
                  type="checkbox"
                  required
                  className="mr-2 accent-blue-500 scale-125"
                  name="tos"
              />
              <span>
              I agree to&nbsp;
                <Link
                    to="https://policies.google.com/terms?hl=en-US"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                >
                Terms of Service
              </Link>
            </span>
            </div>

            {/* Error / Success messages */}
            {error && <div className="mb-4 text-red-500 text-lg text-center">{error}</div>}
            {success && (
                <div className="mb-4 text-green-500 text-lg text-center">
                  Registration successful! Redirecting…
                </div>
            )}

            {/* Submit button */}
            <button
                type="submit"
                disabled={loading || hasValidationErrors}
                className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-lg sm:text-xl hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing Up…" : "Sign Up"}
            </button>

            <div className="mt-8 text-base sm:text-xl text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline font-bold">
                Login here
              </Link>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Register;