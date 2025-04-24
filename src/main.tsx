import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import App from "./App.tsx";
import './assets/css/main.css'
import './index.css'

import { BrowserRouter} from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
)
