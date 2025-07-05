// src/Layout/MainLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Main_Components/Navbar/Navbar';

const MainLayout: React.FC = () => (
    <>
        <Navbar />
        <Outlet />
    </>
);

export default MainLayout;