import { useAuth } from "@/contexts/AuthContext";
import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { theme } = useTheme();
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [signupMessage, setSignupMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitSignup = async (e) => {
    e.preventDefault();
    if (formData.password != formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const success = await signup(
      formData.name,
      formData.email,
      formData.password
    );
    if (success) {
      setSignupMessage("You have signed up successfully. Please log in.");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } else {
      setErrorMessage("Signup failed. Please try again.");
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div
        className={`max-w-md w-full rounded-2xl shadow-2xl p-8 animate-fade-in backdrop-blur-sm ${
          theme === "dark" ? "bg-teal-800/90" : "bg-teal-50/90"
        }`}
      >
        <div className="relative z-10">
          <div className="text-center mb-4">
            <div className="flex justify-center mb-4">
              <div
                className={`p-4 rounded-full ${
                  theme === "dark" ? "bg-teal-700" : "bg-teal-100"
                }`}
              >
                <User
                  className={`text-teal-600 ${
                    theme === "dark" ? "text-teal-200" : ""
                  }`}
                  size={32}
                />
              </div>
            </div>
            <h2
              className={`text-3xl font-bold mb-2 ${
                theme === "dark" ? "text-teal-100" : "text-teal-800"
              }`}
            >
              Create Account
            </h2>
            <p
              className={`text-gray-600 ${
                theme === "dark" ? "text-teal-300" : ""
              }`}
            >
              Fill in the details to create your account.
            </p>
            {errorMessage && (
              <p className="text-red-600 mt-4">{errorMessage}</p>
            )}
            {signupMessage && (
              <p className="text-green-600 mt-4">{signupMessage}</p>
            )}
          </div>
          <form onSubmit={submitSignup} className="space-y-4">
            <div>
              <label
                htmlFor="signupName"
                className={`block text-sm font-medium mb-2 ${
                  theme === "dark" ? "text-teal-100" : "text-teal-800"
                }`}
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={(e) => changeHandler(e)}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 shadow-sm ${
                  theme === "dark"
                    ? "bg-teal-700 border-teal-600 text-teal-100"
                    : "bg-white border-teal-300"
                }`}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="signupEmail"
                className={`block text-sm font-medium mb-2 ${
                  theme === "dark" ? "text-teal-100" : "text-teal-800"
                }`}
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => changeHandler(e)}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 shadow-sm ${
                  theme === "dark"
                    ? "bg-teal-700 border-teal-600 text-teal-100"
                    : "bg-white border-teal-300"
                }`}
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="signupPassword"
                className={`block text-sm font-medium mb-2 ${
                  theme === "dark" ? "text-teal-100" : "text-teal-800"
                }`}
              >
                Create Password
              </label>
              <input
                type="password"
                id="signupPassword"
                name="password"
                onChange={(e) => changeHandler(e)}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 shadow-sm ${
                  theme === "dark"
                    ? "bg-teal-700 border-teal-600 text-teal-100"
                    : "bg-white border-teal-300"
                }`}
                placeholder="Create a password"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className={`block text-sm font-medium mb-2 ${
                  theme === "dark" ? "text-teal-100" : "text-teal-800"
                }`}
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={(e) => changeHandler(e)}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 shadow-sm ${
                  theme === "dark"
                    ? "bg-teal-700 border-teal-600 text-teal-100"
                    : "bg-white border-teal-300"
                }`}
                placeholder="Confirm your password"
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full bg-gradient-to-r hover:from-teal-600 hover:to-teal-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 shadow-lg transform hover:scale-105 ${
                theme === "dark"
                  ? "from-teal-700 to-teal-900"
                  : "from-teal-500 to-teal-700"
              }`}
            >
              Create Account
            </button>
          </form>
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowSignup(false)}
              className={`font-medium transition-colors ${
                theme === "dark"
                  ? "text-teal-300 hover:text-teal-100"
                  : "text-teal-600 hover:text-teal-800"
              }`}
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
