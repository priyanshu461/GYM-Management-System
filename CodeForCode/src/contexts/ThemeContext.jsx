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
    const savedTheme = (() => {
      try {
        if (typeof Storage === "undefined" || typeof localStorage === "undefined") {
          return 'light';
        }
        return localStorage.getItem('theme') || 'light';
      } catch (error) {
        console.warn("Unable to access localStorage for theme:", error.message);
        return 'light';
      }
    })();

    const savedHighContrast = (() => {
      try {
        if (typeof Storage === "undefined" || typeof localStorage === "undefined") {
          return false;
        }
        return localStorage.getItem('highContrast') === 'true';
      } catch (error) {
        console.warn("Unable to access localStorage for highContrast:", error.message);
        return false;
      }
    })();
    setTheme(savedTheme);
    setHighContrast(savedHighContrast);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    document.documentElement.classList.toggle('high-contrast', savedHighContrast);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    try {
      if (typeof Storage !== "undefined" && typeof localStorage !== "undefined") {
        localStorage.setItem('theme', newTheme);
      }
    } catch (error) {
      console.warn("Unable to save theme to localStorage:", error.message);
    }
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const toggleHighContrast = () => {
    const newHighContrast = !highContrast;
    setHighContrast(newHighContrast);
    try {
      if (typeof Storage !== "undefined" && typeof localStorage !== "undefined") {
        localStorage.setItem('highContrast', newHighContrast);
      }
    } catch (error) {
      console.warn("Unable to save highContrast to localStorage:", error.message);
    }
    document.documentElement.classList.toggle('high-contrast', newHighContrast);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, highContrast, toggleHighContrast }}>
      {children}
    </ThemeContext.Provider>
  );
};
