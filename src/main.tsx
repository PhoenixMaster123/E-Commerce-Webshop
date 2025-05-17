import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import App from "./App.tsx";
import './assets/css/main.css'
import './index.css'

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { CartProvider } from './contexts/CartContext.tsx'; // <-- Add this

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider attribute="class">
                <CartProvider>
                    <App />
                </CartProvider>
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>
)
