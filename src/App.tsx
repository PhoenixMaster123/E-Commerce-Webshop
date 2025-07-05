// General
import { Routes, Route, Navigate} from "react-router-dom";
import React from "react";

// Main Pages
import Home from "./Pages/Main/Home/Home";
import Login from "./Pages/Main/Login/Login";
import Register from "./Pages/Main/Register/Register";
import { ProductListPage } from "./Pages/Main/productList/ProductListPage.tsx";
import ProductsPage from "./Pages/Admin/ProductsPage.tsx";
import CartPage from "./Pages/Main/Cart/cart";

// Layouts
import MainLayout from "./Layout/MainLayout.tsx";
import AdminLayout from "./Layout/AdminLayout.tsx";

// Admin Pages
import OverviewPage from "./Pages/Admin/OverviewPage.tsx";
import CustomersPage from "./Pages/Admin/CustomersPage.tsx";
import SettingsPage from "./Pages/Admin/SettingsPage.tsx";
import AdminAccountLayout from "./Layout/AdminAccountLayout.tsx";
import ProfileSettingsPage from "./Pages/Admin/Account/ProfileSettingsPage.tsx";
import PasswordPage from "./Pages/Admin/Account/PasswordPage.tsx";
import NotificationsPage from "./Pages/Admin/Account/NotificationsPage.tsx";
import SocialPage from "./Pages/Admin/Account/SocialPage.tsx";
import DeletePage from "./Pages/Admin/Account/DeleteAccountPage.tsx";
import AccountPage from "./Pages/Admin/Account/AccountPage.tsx";
import ProductDetailPage from "./Pages/Main/ProductDetails.tsx";

// Page Not Found
import NoPage from "./Components/NoPage.tsx";

// Authentication
import ProtectedRoute from "./Components/Auth/ProtectedRoute.tsx";

const App: React.FC = () => {
    return (
        <Routes>

            {/* Redirect root to home, assuming home is publicly accessible initially */}
            <Route path="/" element={<Navigate to="/home" replace />} />

            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Main Layout routes - these are generally public or accessible to any logged-in user */}
            <Route element={<MainLayout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/products" element={<ProductListPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="" element={<OverviewPage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="customers" element={<CustomersPage />} />
                    <Route path="account" element={<AdminAccountLayout />}>
                        <Route index element={<AccountPage />} />
                        <Route path="settings" element={<ProfileSettingsPage />} />
                        <Route path="password" element={<PasswordPage />} />
                        <Route path="notifications" element={<NotificationsPage />} />
                        <Route path="social" element={<SocialPage />} />
                        <Route path="delete" element={<DeletePage />} />
                    </Route>
                    <Route path="settings" element={<SettingsPage />} />
                </Route>
            </Route>

            {/* Catch-all for undefined routes */}
            <Route path="*" element={<NoPage />} />
        </Routes>
    );
};

export default App;
