import Sidebar from '../Components/Admin_Components/Sidebar.tsx'
import { Outlet } from "react-router-dom";
import { useTheme } from 'next-themes';

const AdminLayout = () => {
    const { theme } = useTheme();

    const backgroundGradient =
        theme === 'dark'
            ? 'from-gray-900 via-gray-800 to-gray-900'
            : 'from-white via-gray-100 to-white';

    const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';
    const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-white';

    return (
        <div className={`flex h-screen ${bgColor} ${textColor} overflow-hidden`}>
            <div className='fixed inset-0 z-0'>
                <div className={`absolute inset-0 bg-gradient-to-br ${backgroundGradient} opacity-80`} />
                <div className='absolute inset-0 backdrop-blur-sm' />
            </div>

            <Sidebar />
            <Outlet />
        </div>
    );
};

export default AdminLayout;
