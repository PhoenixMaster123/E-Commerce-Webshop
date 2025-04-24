import { Outlet } from "react-router-dom";
import Navbar from "../Components/Main_Components/Navbar/Navbar";


const MainLayout = () => (
    <>
        <Navbar />
        <Outlet />
    </>
);

export default MainLayout;