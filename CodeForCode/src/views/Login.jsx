import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Home, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/layout/Sidebar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showDemo, setShowDemo] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    // Basic validation - you can add more complex validation here
    if (email && password) {
      // Use the login function from AuthContext
      const success = login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        alert('Invalid credentials');
      }
    }
  };

  const handleForgotPassword = () => {
    // You can implement forgot password functionality here
    alert('Forgot Password functionality to be implemented');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-200 via-teal-200 to-teal-100 flex flex-col relative">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 flex  items-center p-4">
        <div className="text-3xl font-extrabold text-white drop-shadow-lg">GMS</div>
        <button
          onClick={() => setShowDemo(true)}
          className="bg-teal-500 justify-end text-white px-4 py-2 rounded-lg hover:bg-teal-200  hover:text-teal-800 transition-colors flex items-center gap-2 shadow-lg justify-self-end ml-auto mr-4"
        >
          <Eye size={20} /> View Demo
        </button>

        <button 
        
          onClick={() => navigate('/')}
          className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-200  hover:text-teal-800 transition-colors flex items-center gap-2 shadow-lg"
        >
          <Home size={20} /> Home

        </button>
      </header>

      {/* Centered Login Form */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-teal-50 rounded-2xl shadow-2xl p-8 animate-fade-in">
          {/* Form Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-teal-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-teal-800 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-teal-50 border border-grey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-teal-800 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-teal-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Buttons */}
            <div className="space-y-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-400 via-teal-800 to-teal-400 hover:from-teal-200 hover:to-teal-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-lg"
              >
                Login
              </button>

              <button
                type="button"
                onClick={handleForgotPassword}
                className="w-full bg-teal-50 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Forgot Password?
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button className="text-teal-500 hover:text-teal-300 font-medium focus:outline-none">
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
            <div className="absolute top-2 left-2 text-red-500 font-bold text-sm bg-yellow-200 px-2 py-1 rounded">

            </div>
            <Sidebar demo={true} />
            <div className="flex-1 p-6 bg-gray-50">
              <h2 className="text-2xl font-bold mb-6 text-teal-800">Dashboard Preview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-100 p-6 rounded-lg shadow-md">
                  <h3 className="font-semibold text-blue-800">Total Members</h3>
                  <p className="text-2xl font-bold text-blue-600">1,250</p>
                </div>
                <div className="bg-green-100 p-6 rounded-lg shadow-md">
                  <h3 className="font-semibold text-green-800">Active Trainers</h3>
                  <p className="text-2xl font-bold text-green-600">15</p>
                </div>
                <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
                  <h3 className="font-semibold text-yellow-800">Revenue This Month</h3>
                  <p className="text-2xl font-bold text-yellow-600">$45,000</p>
                </div>
                <div className="bg-purple-100 p-6 rounded-lg shadow-md">
                  <h3 className="font-semibold text-purple-800">Classes Today</h3>
                  <p className="text-2xl font-bold text-purple-600">8</p>
                </div>
                <div className="bg-pink-100 p-6 rounded-lg shadow-md">
                  <h3 className="font-semibold text-pink-800">Products Sold</h3>
                  <p className="text-2xl font-bold text-pink-600">320</p>
                </div>
                <div className="bg-indigo-100 p-6 rounded-lg shadow-md">
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
    </div>
  );
};

export default Login;