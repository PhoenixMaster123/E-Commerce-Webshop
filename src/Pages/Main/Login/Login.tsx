import { useState, useEffect, FormEvent } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../auth/useAuth.ts';
import 'boxicons/css/boxicons.min.css';
import './login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/home';

    useEffect(() => {
        document.body.className = 'login-body';
        return () => {
            document.body.className = '';
        };
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault(); // Prevent page refresh
        setError(null); // Clear previous errors

        try {
            console.log('Attempting login for user:', username);

            let userRole: 'admin' | 'user' = 'user';

            if (username === 'admin' && password === 'admin123') {
                userRole = 'admin';
            } else if (username === 'user' && password === 'user123') {
                userRole = 'user';
            } else {
                throw new Error('Invalid username or password');
            }

            const user = { id: '1', name: username, role: userRole };
            const token = 'fake-jwt-token';

            // Call the login function from our AuthContext
            auth.login(user, token);

            // Navigate the user to the page they were trying to access
            navigate(from, { replace: true });

        } catch (err) {
            console.error('Login failed:', err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>

                {error && <div className="error-box">{error}</div>}

                <div className="input-box">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <i className="fa-solid fa-user"></i>
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
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