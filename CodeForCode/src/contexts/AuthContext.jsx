import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check for existing authentication on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // In a real app, you'd validate the token with the backend
      setIsAuthenticated(true);
      // You could also fetch user data here
    }
  }, []);

  const login = (email, password) => {
    // Basic authentication - in a real app, this would call an API
    if (email && password) {
      // Simulate successful login
      const userData = { email, name: email.split('@')[0] };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('authToken', 'dummy-token'); // Store token
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('authToken');
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
