import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL } from "@/Utils/data";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
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
            setMember(data.user);
            setIsAuthenticated(true);
          } else {
            // Invalid token, clear localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setIsAuthenticated(false);
          }
        })
        .catch((error) => {
          console.error("Token verification error:", error);
          // Clear localStorage on error
          localStorage.removeItem("token");
          localStorage.removeItem("user");
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
        localStorage.setItem("token", data.token ?? "tryutuuytyutwre8tr8wtsdfuyguyxcgvcyuxtvyutewtrwe87f8cxvcvyuxtyutyutwytw87rt87txvuxgvyuxcgv");
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

  // Member login function
  const memberLogin = async (mobile, password) => {
    try {
      const response = await fetch(`${BASE_API_URL}auth/member/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMember(data.user);
        localStorage.setItem("token", data.token);
        localStorage.setItem("member", JSON.stringify(data.user));
        setIsAuthenticated(true);
        navigate("/member-dashboard");
        return true;
      } else {
        throw new Error(data.message || "Member login failed");
      }
    } catch (error) {
      console.error("Member login error:", error);
      return false;
    }
  };

// Inside AuthContext.jsx
const memberSignup = async (name, mobile, email, password) => {
  try {
    console.log("Signup data being sent:", { name, mobile, email, password });

    const response = await fetch(`${BASE_API_URL}auth/member/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, mobile, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Member signup failed:", data);
      throw new Error(data.message || "Member signup failed");
    }

    setMember(data.user);
    localStorage.setItem("token", data.token);
    localStorage.setItem("member", JSON.stringify(data.user));
    setIsAuthenticated(true);
    return true;
  } catch (error) {
    console.error("Member signup error:", error);
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
    setMember(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("member");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        member,
        login,
        memberLogin,
        memberSignup,
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
