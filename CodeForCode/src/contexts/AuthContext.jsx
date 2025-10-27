import React, { createContext, useContext, useState } from "react";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Login function
  const login = async (email, password) => {
    if (email && password) {
      const statsResponse = await fetch(`${BASE_API_URL}auth/login`, {
        email,
        password,
      });
      if (!statsResponse.ok) throw new Error("Failed to fetch stats");
      const res = await statsResponse.json();
      console.log(res);
      
      setUser();
      localStorage.setItem('token', res.token);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  // Signup function
  const signup = (name, email, password) => {
    if (name && email && password) {
      setUser({ name, email });
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  // Update user function
  const updateUser = (updatedData) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedData }));
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, signup, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
