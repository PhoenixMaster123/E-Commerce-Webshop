import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";


const MainLayout = () => (
    <>
        <Navbar />
        {/* Hier rendert React Router die Kind‑Route */}
        <Outlet />
    </>
);

export default MainLayout;