// General
import { Routes, Route, Navigate} from "react-router-dom";
import React from "react";

// Main Pages
import Home from "./Pages/Main/Home/Home";
import Login from "./Pages/Main/Login/Login";
import Register from "./Pages/Main/Register/Register";
import { ProductListPage } from "./Pages/Main/productList/ProductListPage.tsx";
import ProductsPage from "./Pages/Admin/ProductsPage.tsx";

// Layouts
import MainLayout from "./Layout/MainLayout.tsx";
import AdminLayout from "./Layout/AdminLayout.tsx";

// Admin Pages
import OverviewPage from "./Pages/Admin/OverviewPage.tsx";
import UsersPage from "./Pages/Admin/UsersPage.tsx";
import SettingsPage from "./Pages/Admin/SettingsPage.tsx";
import AccountAdmin from "./Pages/Admin/AccountAdmin.tsx";

const App: React.FC = () => {
    return (
        <Routes>

            <Route path="/" element={<Navigate to="/home" replace />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/admin" element={<AdminLayout />}>
                <Route path="" element={<OverviewPage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="account" element={<AccountAdmin />} />
                <Route path="settings" element={<SettingsPage />} />
            </Route>

            <Route element={<MainLayout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/products" element={<ProductListPage />} />
            </Route>

        </Routes>
    )
};

export default App;