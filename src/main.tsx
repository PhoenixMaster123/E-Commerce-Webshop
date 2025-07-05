import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import App from "./App.tsx";
import './assets/css/main.css'
import './index.css'

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { CartProvider } from './contexts/CartContext.tsx';
import { AuthProvider } from './auth/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider attribute="class">
                <CartProvider>
                    <AuthProvider>
                         <App />
                    </AuthProvider>
                </CartProvider>
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>
)
