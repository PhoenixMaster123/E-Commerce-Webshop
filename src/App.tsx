import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import "./assets/css/_reset.css"
import {ProductListPage} from "./Pages/productList/ProductListPage.tsx";
import MainLayout from "./MainLayout.tsx";

const App= () => (
    <Routes>
        {}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Alle „normalen“ Seiten bekommen die Navbar automatisch */}
        <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<ProductListPage />} />
            {/* weitere Routen mit Navbar hier einhängen … */}
        </Route>

        {/* Auth‑Seiten OHNE Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
    </Routes>
);

export default App;