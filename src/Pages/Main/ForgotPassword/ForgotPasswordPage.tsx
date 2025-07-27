import React, { useState, useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { faSun, faMoon, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Password reset requested for:", email);
        alert("If an account with that email exists, a password reset link has been sent.");
        navigate('/login');
    };

    const bgMain = isDarkMode ? 'bg-gray-900' : 'bg-gray-100';
    const cardBgText = isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900';
    const inputBgBorderText = isDarkMode
        ? "bg-gray-700 border-gray-600 text-gray-100"
        : "bg-gray-100 border-gray-300 text-gray-900";
    const iconColor = isDarkMode ? "text-gray-100" : "text-gray-600";
    const btnBgHover = "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800";

    return (
        <div className={`${bgMain} min-h-screen flex items-center justify-center transition-colors duration-300 px-4`}>
            <div className={`${cardBgText} relative overflow-hidden rounded-3xl shadow-2xl p-12 sm:p-16 w-full max-w-xl flex flex-col items-center transition-colors duration-300`}>

                {/* Glows */}
                <div className="absolute -top-24 -left-20 w-96 h-96 bg-purple-500 opacity-20 blur-3xl rounded-full pointer-events-none"></div>
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500 opacity-20 blur-3xl rounded-full pointer-events-none"></div>

                {/* Header Icons */}
                <div className="flex justify-between items-center w-full mb-6">
                    <button
                        type="button"
                        className={`text-2xl ${iconColor} hover:text-blue-500 transition-colors`}
                        onClick={() => navigate('/login')}
                        title="Back to login"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <button
                        type="button"
                        className={`${iconColor} hover:text-yellow-400 transition-colors`}
                        onClick={toggleTheme}
                        title="Toggle theme"
                    >
                        <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} size="xl" />
                    </button>
                </div>

                {/* Avatar */}
                <div className="mb-8">
                    <svg width="72" height="72" fill="none" viewBox="0 0 24 24">
                        <path
                            fill={isDarkMode ? "#eee" : "#444"}
                            d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.314 0-10 1.657-10 5v3h20v-3c0-3.343-6.686-5-10-5z"
                        />
                    </svg>
                </div>

                {/* Instructions */}
                <p className="mb-8 text-lg sm:text-xl text-center">
                    Enter your email and we’ll send you a link to reset your password.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-8">
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={`w-full px-6 py-4 sm:px-8 sm:py-5 rounded-xl border text-lg sm:text-2xl ${inputBgBorderText} focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-4 sm:py-5 rounded-xl ${btnBgHover} text-white text-xl sm:text-2xl font-bold transition-all hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-400`}
                    >
                        Reset Password
                    </button>
                </form>

                {/* Back to Login */}
                <div className="mt-10 text-lg sm:text-xl">
                    Remembered your password?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline font-bold">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;