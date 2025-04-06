import { NavLink } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
import {useEffect} from 'react';
import "./login.css"


const Login = () => {
    useEffect(() => {
        document.body.className = 'login-body'; 
        return () => {
          document.body.className = '';
        };
      }, []);
    return (
      <div className="login-container">
        <form>
          <h1>Login</h1>
          <div className="input-box">
            <input type="text" name='username' placeholder="Username" required/>
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required/>
            <i className="fa-solid fa-lock"></i>
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <NavLink to="#">Forgot password?</NavLink>
          </div>
          <button type="submit" className="btn">Login</button>
          <div className="register-link">
            <p>Don't have an account? <NavLink to="/register">Register</NavLink></p>
          </div>
        </form>
      </div>
    );
  };
  
  export default Login;

