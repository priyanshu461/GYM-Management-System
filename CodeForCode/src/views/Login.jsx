import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Home, X, Key, Mail, Lock, User, Sun, Moon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Sidebar from '../components/layout/Sidebar';
import Register from './authComponent/Register';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showDemo, setShowDemo] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [showSignup, setShowSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogin = async (e) => {
    e.preventDefault();
     // Basic validation - you can add more complex validation here
    if (email && password) {
      // Use the login function from AuthContext
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setErrorMessage('Invalid credentials');
      }
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    // Simulate sending reset email
    setResetMessage(`Reset email sent to ${resetEmail}`);
    setTimeout(() => setResetMessage(''), 10000);
    setResetEmail('');
    setShowForgotPassword(false);
  };



  return (
    <div className={`min-h-screen flex flex-col relative ${theme === 'dark' ? 'bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900' : 'bg-gradient-to-br from-teal-200 via-teal-200 to-teal-100'}`}>
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center p-4">
        <div className={`text-3xl font-extrabold drop-shadow-lg ${theme === 'dark' ? 'text-white' : 'text-white'}`}>GMS</div>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors shadow-lg ${theme === 'dark' ? 'bg-teal-700 text-teal-100 hover:bg-teal-600 hover:text-teal-200' : 'bg-teal-500 text-white hover:bg-teal-200 hover:text-teal-800'}`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button
            onClick={() => setShowDemo(true)}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-lg ${theme === 'dark' ? 'bg-teal-700 text-teal-100 hover:bg-teal-600 hover:text-teal-200' : 'bg-teal-500 text-white hover:bg-teal-200 hover:text-teal-800'}`}
          >
            <Eye size={20} /> View Demo
          </button>
          <button
            onClick={() => navigate('/')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-lg ${theme === 'dark' ? 'bg-teal-700 text-teal-100 hover:bg-teal-600 hover:text-teal-200' : 'bg-teal-500 text-white hover:bg-teal-200 hover:text-teal-800'}`}
          >
            <Home size={20} /> Home
          </button>
        </div>
      </header>

      {/* Centered Login Form */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className={`max-w-md w-full rounded-2xl shadow-2xl p-8 animate-fade-in backdrop-blur-sm ${theme === 'dark' ? 'bg-teal-800/90' : 'bg-teal-50/90'}`}>
          {/* Form Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className={`p-4 rounded-full shadow-lg ${theme === 'dark' ? 'bg-teal-700' : 'bg-teal-100'}`}>
                <Lock className={`text-teal-600 ${theme === 'dark' ? 'text-teal-200' : ''}`} size={32} />
              </div>
            </div>
            <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-teal-800'}`}>Welcome Back</h1>
            <p className={`text-gray-600 ${theme === 'dark' ? 'text-teal-200' : ''}`}>Sign in to your account</p>
            {resetMessage && (
              <p className="text-green-600 mt-4">{resetMessage}</p>
            )}
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-teal-100' : 'text-teal-800'}`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500 ${theme === 'dark' ? 'text-teal-300' : ''}`} size={20} />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMessage('');
                  }}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 shadow-sm ${theme === 'dark' ? 'bg-teal-700 border-teal-600 text-teal-100' : 'bg-white border-teal-300'}`}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-teal-100' : 'text-teal-800'}`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500 ${theme === 'dark' ? 'text-teal-300' : ''}`} size={20} />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 shadow-sm ${theme === 'dark' ? 'bg-teal-700 border-teal-600 text-teal-100' : 'bg-white border-teal-300'}`}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-4">
              <button
                type="submit"
                className={`w-full bg-gradient-to-r from-teal-400 via-teal-800 to-teal-400 hover:from-teal-200 hover:to-teal-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-lg ${theme === 'dark' ? 'from-teal-600 via-teal-900 to-teal-600 hover:from-teal-500 hover:to-teal-700' : ''}`}
              >
                Login
              </button>

              <button
                type="button"
                onClick={handleForgotPassword}
                className={`w-full font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${theme === 'dark' ? 'bg-teal-700 hover:bg-teal-600 text-teal-100' : 'bg-teal-50 hover:bg-gray-200 text-gray-700'}`}
              >
                Forgot Password?
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className={`text-sm ${theme === 'dark' ? 'text-teal-300' : 'text-gray-600'}`}>
              Don't have an account?{' '}
          <button
            onClick={() => setShowSignup(true)}
            className={`font-medium focus:outline-none ${theme === 'dark' ? 'text-teal-300 hover:text-teal-100' : 'text-teal-500 hover:text-teal-300'}`}
          >
            Sign up
          </button>
            </p>
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      {showDemo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onContextMenu={(e) => e.preventDefault()}
        >
          <div className="bg-white rounded-lg shadow-2xl w-11/12 h-5/6 flex overflow-hidden relative">
            <Sidebar demo={true} />
            <div className="flex-1 p-6 bg-gray-50">
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </button>
                <h2 className="text-2xl font-bold text-teal-800">Dashboard Preview</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div onClick={() => alert('This is a demo. Please login to access.')} className="bg-blue-100 p-6 rounded-lg shadow-md cursor-pointer">
                  <h3 className="font-semibold text-blue-800">Total Members</h3>
                  <p className="text-2xl font-bold text-blue-600">1,250</p>
                </div>
                <div onClick={() => alert('This is a demo. Please login to access.')} className="bg-green-100 p-6 rounded-lg shadow-md cursor-pointer">
                  <h3 className="font-semibold text-green-800">Active Trainers</h3>
                  <p className="text-2xl font-bold text-green-600">15</p>
                </div>
                <div onClick={() => alert('This is a demo. Please login to access.')} className="bg-yellow-100 p-6 rounded-lg shadow-md cursor-pointer">
                  <h3 className="font-semibold text-yellow-800">Revenue This Month</h3>
                  <p className="text-2xl font-bold text-yellow-600">$45,000</p>
                </div>
                <div onClick={() => alert('This is a demo. Please login to access.')} className="bg-purple-100 p-6 rounded-lg shadow-md cursor-pointer">
                  <h3 className="font-semibold text-purple-800">Classes Today</h3>
                  <p className="text-2xl font-bold text-purple-600">8</p>
                </div>
                <div onClick={() => alert('This is a demo. Please login to access.')} className="bg-pink-100 p-6 rounded-lg shadow-md cursor-pointer">
                  <h3 className="font-semibold text-pink-800">Products Sold</h3>
                  <p className="text-2xl font-bold text-pink-600">320</p>
                </div>
                <div onClick={() => alert('This is a demo. Please login to access.')} className="bg-indigo-100 p-6 rounded-lg shadow-md cursor-pointer">
                  <h3 className="font-semibold text-indigo-800">Support Tickets</h3>
                  <p className="text-2xl font-bold text-indigo-600">5</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowDemo(false)}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
      {/* Signup Modal */}
      {showSignup && (
        <Register />
      )}

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className={`max-w-md w-full rounded-2xl shadow-2xl p-8 animate-fade-in backdrop-blur-sm ${theme === 'dark' ? 'bg-teal-800/90' : 'bg-teal-50/90'}`}>
            <div className="relative z-10">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <div className={`p-4 rounded-full ${theme === 'dark' ? 'bg-teal-700' : 'bg-teal-100'}`}>
                  <Key className={`text-teal-600 ${theme === 'dark' ? 'text-teal-200' : ''}`} size={32} />
                </div>
              </div>
              <h2 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-teal-100' : 'text-teal-800'}`}>Forgot Your Password?</h2>
              <p className={`text-gray-600 ${theme === 'dark' ? 'text-teal-300' : ''}`}>No worries! Enter your email and we'll send you a reset link.</p>
            </div>
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <label htmlFor="resetEmail" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-teal-100' : 'text-teal-800'}`}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="resetEmail"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 shadow-sm ${theme === 'dark' ? 'bg-teal-700 border-teal-600 text-teal-100' : 'bg-white border-teal-300'}`}
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <button
                type="submit"
                className={`w-full bg-gradient-to-r hover:from-teal-600 hover:to-teal-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 shadow-lg transform hover:scale-105 ${theme === 'dark' ? 'from-teal-700 to-teal-900' : 'from-teal-500 to-teal-700'}`}
              >
                Send Reset Email
              </button>
            </form>
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowForgotPassword(false)}
                className={`font-medium transition-colors ${theme === 'dark' ? 'text-teal-300 hover:text-teal-100' : 'text-teal-600 hover:text-teal-800'}`}
              >
                Back to Login
              </button>
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;