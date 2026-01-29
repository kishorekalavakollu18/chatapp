import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('hanasu'); // 'hanasu' or 'cyberpunk'

    useEffect(() => {
        // Check local storage
        const saved = localStorage.getItem('theme') || 'hanasu';
        setTheme(saved);
    }, []);

    useEffect(() => {
        // Apply theme to document body
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'hanasu' ? 'dawn' : 'hanasu');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
