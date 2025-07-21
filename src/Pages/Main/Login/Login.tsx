import React, { useState } from "react";
import "./login.css";
import { faCartShopping, faMoon, faSun, faSearch, faBars, faTimes, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle login...
  };

  return (
    <div className={`login-bg${darkMode ? " dark" : ""}`}>
      <div className="login-card">
        <button
          type="button"
          className="darkmode-toggle"
          onClick={() => setDarkMode(d => !d)}
        >
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        </button>
        <div className="login-icon">
          <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><path fill={darkMode ? "#eee" : "#444"} d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.314 0-10 1.657-10 5v3h20v-3c0-3.343-6.686-5-10-5z"/></svg>
        </div>
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="login-field">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="login-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <a href="/forgot" className="forgot-link">Forgot password?</a>
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <div className="login-register">
          Don't have an account? <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;