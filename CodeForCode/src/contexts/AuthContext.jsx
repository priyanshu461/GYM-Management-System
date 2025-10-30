import React, { createContext, useContext, useState, useEffect } from "react";
import { BASE_API_URL } from "../Utils/data";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Optionally verify token with backend
      setIsAuthenticated(true);
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          if (user && user.name) {
            updateUser({
              name: user.name,
              email: user.email,
              phone: user.phone || "",
              address: user.address || "",
              roleId: user.roleId,
              role: "",
              membershipStatus: user.membershipStatus || false,
            });
          } else {
            // Invalid user data, clear it
            localStorage.removeItem("user");
            setIsAuthenticated(false);
          }
        } catch (error) {
          // Parsing error, clear invalid data
          localStorage.removeItem("user");
          setIsAuthenticated(false);
        }
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await fetch(`${BASE_API_URL}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setIsAuthenticated(true);
        return true;
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // Signup function
  const signup = async (name, email, password) => {
    try {
      const response = await fetch(`${BASE_API_URL}auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
        return true;
      } else {
        throw new Error(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  // Update user function
  const updateUser = (updatedData) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedData }));
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        signup,
        logout,
        updateUser,
        loading,
      }}
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
