import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Register: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
      <div className={`${darkMode ? "bg-[#181a20] text-white" : "bg-[#f6f7fb] text-gray-900"} min-h-screen w-full flex items-center justify-center transition-colors duration-300`}>
        <div className={`${darkMode ? "bg-[#23262f]" : "bg-white"} rounded-2xl shadow-2xl p-10 w-full max-w-md flex flex-col items-center transition-colors duration-300`}>
          <button
              type="button"
              onClick={() => setDarkMode((prev) => !prev)}
              className={`${darkMode ? "text-white" : "text-gray-800"} self-end mb-4 text-2xl hover:text-blue-500 transition`}
          >
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} size="2x" />
          </button>

          <h1 className="text-3xl font-semibold mb-6 transition-colors duration-300">Create Account</h1>

          <form className="w-full">
            <div className="mb-4">
              <input
                  type="text"
                  placeholder="Username"
                  required
                  className={`w-full px-4 py-3 rounded-md border text-base ${
                      darkMode
                          ? "bg-[#2b2e3c] text-white border-[#444857]"
                          : "bg-[#f6f7fb] text-gray-900 border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              />
            </div>

            <div className="mb-4">
              <input
                  type="email"
                  placeholder="Email"
                  required
                  className={`w-full px-4 py-3 rounded-md border text-base ${
                      darkMode
                          ? "bg-[#2b2e3c] text-white border-[#444857]"
                          : "bg-[#f6f7fb] text-gray-900 border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              />
            </div>

            <div className="mb-4">
              <input
                  type="password"
                  placeholder="Password"
                  required
                  className={`w-full px-4 py-3 rounded-md border text-base ${
                      darkMode
                          ? "bg-[#2b2e3c] text-white border-[#444857]"
                          : "bg-[#f6f7fb] text-gray-900 border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              />
            </div>

            <div className="mb-4">
              <input
                  type="password"
                  placeholder="Repeat your password"
                  required
                  className={`w-full px-4 py-3 rounded-md border text-base ${
                      darkMode
                          ? "bg-[#2b2e3c] text-white border-[#444857]"
                          : "bg-[#f6f7fb] text-gray-900 border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              />
            </div>

            <div className={`mb-4 text-sm ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
              <label className="flex items-center">
                <input type="checkbox" required className="mr-2 accent-blue-500" />
                I agree all statements in&nbsp;
                <a
                    href="https://policies.google.com/terms?hl=en-US"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                >
                  Terms of Service
                </a>
              </label>
            </div>

            <button
                type="submit"
                className="w-full py-3 rounded-md bg-blue-600 text-white font-semibold text-base hover:bg-blue-700 transition-colors mb-4"
            >
              Sign up
            </button>

            <div className={`text-sm text-center ${darkMode ? "text-gray-300" : "text-gray-800"}`}>
              Already have an account?{" "}
              <NavLink to="/login" className="text-blue-600 font-semibold hover:underline">
                Login here
              </NavLink>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Register;