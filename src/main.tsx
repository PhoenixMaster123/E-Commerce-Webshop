import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./App.jsx";
import './assets/css/main.css';
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
