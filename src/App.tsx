//import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate} from "react-router-dom";

// Pages & Layouts
import Home from "./Pages/Main/Home/Home";
import Login from "./Pages/Main/Login/Login";
import Register from "./Pages/Main/Register/Register";
import { ProductListPage } from "./Pages/Main/productList/ProductListPage.tsx";
import MainLayout from "./Layout/MainLayout.tsx";
import OverviewPage from "./Pages/Admin/OverviewPage.tsx";
import AdminLayout from "./Layout/AdminLayout.tsx";

// CSS
import React from "react";
import ProductsPage from "./Pages/Admin/ProductsPage.tsx";

// --- App Component ---

const App: React.FC = () => {
    return (
        <Routes>

            <Route path="/" element={<Navigate to="/home" replace />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<OverviewPage />} />
                <Route path="products" element={<ProductsPage />} />
            </Route>

            <Route element={<MainLayout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/products" element={<ProductListPage />} />
            </Route>

        </Routes>
    )
};

export default App;