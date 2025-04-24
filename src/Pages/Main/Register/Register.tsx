import { NavLink } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
import { useEffect } from 'react';
import "./register.css"

const Register = () => {
    useEffect(() => {
        document.body.className = 'register-body';
        return () => {
          document.body.className = '';
        };
      }, []);
      return (
        <div className="register-container">
          <form>
            <h1>Create Account</h1>
            <div className="input-box">
              <input type="text" name="username" placeholder="Username" required />
              <i className="fa-solid fa-user"></i>
            </div>
            <div className="input-box">
              <input type="email" placeholder="Email" required />
              <i className="fa-solid fa-envelope"></i>
            </div>
            <div className="input-box">
              <input type="password" placeholder="Password" required />
              <i className="fa-solid fa-lock"></i>
            </div>
            <div className="input-box">
              <input type="password" placeholder="Repeat your password" required />
              <i className="fa-solid fa-rotate-right"></i>
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" /> I agree all statements in <a href="https://policies.google.com/terms?hl=en-US">Terms of Service</a>
              </label>
            </div>
            <button type="submit" className="btn">Sign up</button>
            <div className="register-link">
              <p>Have already an account? <NavLink to="/login">Login here</NavLink></p>
            </div>
          </form>
        </div>
      );
}

export default Register;