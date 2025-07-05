import React, { useContext } from 'react';
import { Moon, Sun } from 'lucide-react';
import { ThemeContext } from '../../contexts/ThemeContext.tsx';

const ToggleTheme: React.FC = () => {
    // --- Theme Management ---
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="text-gray-800 dark:text-white hover:text-black dark:hover:text-gray-300 transition-colors"
        >
            {isDarkMode ? <Sun className="h-5 w-5 text-white" /> : <Moon className="h-5 w-5 text-gray-900" />}
        </button>
    );
};

export default ToggleTheme;
