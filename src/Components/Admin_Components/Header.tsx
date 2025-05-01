import React, { useEffect, useState } from 'react';
import ToggleTheme from './ToggleTheme';
import { useTheme } from 'next-themes';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const headerBg =
        theme === 'dark'
            ? 'bg-gray-800 bg-opacity-50 border-gray-700'
            : 'bg-white bg-opacity-80 border-gray-300';

    const titleColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';

    return (
        <header className={`backdrop-blur-md shadow-lg border-b ${headerBg}`}>
            <div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between'>
                <h1 className={`text-2xl font-semibold ${titleColor}`}>{title}</h1>
                <ToggleTheme />
            </div>
        </header>
    );
};

export default Header;
