import React, { createContext, useContext, useState, useEffect } from "react";
import { BASE_API_URL } from "@/Utils/data";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on app load
  useEffect(() => {
    const token = (() => {
      try {
        if (typeof Storage === "undefined" || typeof localStorage === "undefined") {
          return null;
        }
        return localStorage.getItem("token");
      } catch (error) {
        console.warn("Unable to access localStorage:", error.message);
        return null;
      }
    })();
    if (token) {
      // Verify token with backend
      fetch(`${BASE_API_URL}auth/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.user) {
          setUser(data.user);
          setIsAuthenticated(true);
          } else {
            // Invalid token, clear localStorage
            try {
              if (typeof Storage !== "undefined" && typeof localStorage !== "undefined") {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
              }
            } catch (error) {
              console.warn("Unable to clear localStorage:", error.message);
            }
            setIsAuthenticated(false);
          }
        })
        .catch((error) => {
          console.error("Token verification error:", error);
          // Clear localStorage on error
          try {
            if (typeof Storage !== "undefined" && typeof localStorage !== "undefined") {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
            }
          } catch (error) {
            console.warn("Unable to clear localStorage:", error.message);
          }
          setIsAuthenticated(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
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
        try {
          if (typeof Storage !== "undefined" && typeof localStorage !== "undefined") {
            localStorage.setItem("token", data.token ?? "tryutuuytyutwre8tr8wtsdfuyguyxcgvcyuxtvyutewtrwe87f8cxvcvyuxtyutyutwytw87rt87txvuxgvyuxcgv");
            localStorage.setItem("user", JSON.stringify(data.user));
          }
        } catch (error) {
          console.warn("Unable to save to localStorage:", error.message);
        }
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
        try {
          if (typeof Storage !== "undefined" && typeof localStorage !== "undefined") {
            localStorage.setItem("token", data.token);
          }
        } catch (error) {
          console.warn("Unable to save to localStorage:", error.message);
        }
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
    try {
      if (typeof Storage !== "undefined" && typeof localStorage !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.warn("Unable to clear localStorage:", error.message);
    }
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
