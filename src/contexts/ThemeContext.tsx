import React, { createContext, useState, useEffect } from 'react';

interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    isDarkMode: false,
    toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        const saved = localStorage.getItem('theme');
        if (saved) return saved === 'dark';
        return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    });

    const toggleTheme = () => setIsDarkMode((m) => !m);

    // side‐effect: update body class & localStorage
    useEffect(() => {
        document.body.classList.toggle('dark', isDarkMode);
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
