import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from '../../../contexts/ThemeContext';

const Register: React.FC = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
      <div className={`${isDarkMode ? "bg-gray-900" : "bg-gray-100"} min-h-screen flex items-center justify-center transition-colors duration-300`}>
        <div className={`${isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"} rounded-3xl shadow-2xl p-16 w-full max-w-xl flex flex-col items-center transition-colors duration-300`}>
          <button
              type="button"
              className={`self-end mb-4 text-4xl ${isDarkMode ? "text-gray-100" : "text-gray-600"} hover:text-blue-500 transition-colors`}
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

          <form className="w-full">
            <div className="mb-8">
              <input
                  type="text"
                  placeholder="Username"
                  required
                  className={`w-full px-8 py-5 rounded-xl border text-2xl ${
                      isDarkMode
                          ? "bg-gray-700 border-gray-600 text-gray-100" 
                          : "bg-gray-100 border-gray-300 text-gray-900" 
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              />
            </div>

            <div className="mb-8">
              <input
                  type="email"
                  placeholder="Email"
                  required
                  className={`w-full px-8 py-5 rounded-xl border text-2xl ${
                      isDarkMode
                          ? "bg-gray-700 border-gray-600 text-gray-100"
                          : "bg-gray-100 border-gray-300 text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              />
            </div>

            <div className="mb-8">
              <input
                  type="password"
                  placeholder="Password"
                  required
                  className={`w-full px-8 py-5 rounded-xl border text-2xl ${
                      isDarkMode
                          ? "bg-gray-700 border-gray-600 text-gray-100"
                          : "bg-gray-100 border-gray-300 text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              />
            </div>

            <div className="mb-8">
              <input
                  type="password"
                  placeholder="Repeat your password"
                  required
                  className={`w-full px-8 py-5 rounded-xl border text-2xl ${
                      isDarkMode
                          ? "bg-gray-700 border-gray-600 text-gray-100"
                          : "bg-gray-100 border-gray-300 text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              />
            </div>

            <div className={`flex items-center justify-between mb-6 text-xl`}>
              <label className="flex items-center">
                <input type="checkbox" required className="mr-2 accent-blue-500" />
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

            <button
                type="submit"
                style={{ fontSize: '1.4em' }}
                className={`w-full py-5 rounded-xl font-bold transition-all duration-300
                            bg-gradient-to-r from-purple-700 to-purple-800
                            ${isDarkMode ? "text-white" : "text-white"} // Text white in both modes often works well with purple
                            hover:from-purple-700 hover:to-purple-800 hover:shadow-lg`}
            >
              Sign Up
            </button>

            <div className="mt-6 text-2xl">
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