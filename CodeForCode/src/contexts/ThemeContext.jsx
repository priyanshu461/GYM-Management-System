import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedHighContrast = localStorage.getItem('highContrast') === 'true';
    setTheme(savedTheme);
    setHighContrast(savedHighContrast);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    document.documentElement.classList.toggle('high-contrast', savedHighContrast);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const toggleHighContrast = () => {
    const newHighContrast = !highContrast;
    setHighContrast(newHighContrast);
    localStorage.setItem('highContrast', newHighContrast);
    document.documentElement.classList.toggle('high-contrast', newHighContrast);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, highContrast, toggleHighContrast }}>
      {children}
    </ThemeContext.Provider>
  );
};
