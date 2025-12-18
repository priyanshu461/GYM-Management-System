import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Lock, Save, Loader2, Eye, EyeOff, Shield, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import Layout from '@/components/Layout';
import settingsService from '../services/settingsService';

const Settings = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: []
  });

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let score = 0;
    const feedback = [];

    if (password.length >= 8) score += 1;
    else feedback.push('At least 8 characters');

    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Lowercase letter');

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Uppercase letter');

    if (/\d/.test(password)) score += 1;
    else feedback.push('Number');

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
    else feedback.push('Special character');

    setPasswordStrength({ score, feedback });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (field === 'newPassword') {
      checkPasswordStrength(value);
    }

    setMessage({ type: '', text: '' });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const getStrengthColor = () => {
    const { score } = passwordStrength;
    if (score <= 2) return 'bg-red-500';
    if (score <= 3) return 'bg-yellow-500';
    if (score <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    const { score } = passwordStrength;
    if (score <= 2) return 'Weak';
    if (score <= 3) return 'Fair';
    if (score <= 4) return 'Good';
    return 'Strong';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.currentPassword) {
      setMessage({ type: 'error', text: 'Current password is required' });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (formData.newPassword.length < 8) {
      setMessage({ type: 'error', text: 'New password must be at least 8 characters long' });
      return;
    }

    if (passwordStrength.score < 3) {
      setMessage({ type: 'error', text: 'Password is too weak. Please improve it.' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Call the actual API
      await settingsService.updatePassword(user.id, formData.newPassword);

      setMessage({
        type: 'success',
        text: 'Password changed successfully! You will be redirected to login.'
      });

      // Clear form
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      // Auto redirect after success
      setTimeout(() => {
        // You might want to logout the user here
        window.location.reload();
      }, 3000);

    } catch (error) {
      console.error('Password change error:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to change password. Please check your current password and try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-teal-900' : 'bg-gradient-to-br from-teal-50 via-teal-100 to-teal-50'}`}>
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className={`p-3 rounded-full ${theme === 'dark' ? 'bg-teal-800' : 'bg-teal-100'}`}>
              <Lock size={32} className="text-teal-500" />
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>
                Change Password
              </h1>
              <p className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'} mt-1`}>
                Keep your account secure with a strong password
              </p>
            </div>
          </div>
          {/* Change Password Form */}
          <div className={`max-w-2xl mx-auto p-8 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-teal-800' : 'bg-white'} border border-teal-200`}>
            <div className="mb-6">
              <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-teal-900'} mb-2`}>
                Change Password
              </h2>
              <p className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}`}>
                Create a strong password to protect your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Current Password */}
              <div>
                <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-teal-200' : 'text-teal-800'} mb-2`}>
                  Current Password *
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    value={formData.currentPassword}
                    onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                    className={`w-full px-4 py-3 pr-12 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all ${theme === 'dark' ? 'bg-teal-700 text-white border-teal-600' : 'bg-white text-teal-900'}`}
                    placeholder="Enter your current password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-500 hover:text-teal-600"
                  >
                    {showPasswords.current ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-teal-200' : 'text-teal-800'} mb-2`}>
                  New Password *
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={(e) => handleInputChange('newPassword', e.target.value)}
                    className={`w-full px-4 py-3 pr-12 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all ${theme === 'dark' ? 'bg-teal-700 text-white border-teal-600' : 'bg-white text-teal-900'}`}
                    placeholder="Enter a strong new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-500 hover:text-teal-600"
                  >
                    {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {formData.newPassword && (
                  <div className="mt-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                          style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-medium ${getStrengthColor().replace('bg-', 'text-')}`}>
                        {getStrengthText()}
                      </span>
                    </div>

                    {passwordStrength.feedback.length > 0 && (
                      <div className="text-xs text-gray-600 space-y-1">
                        {passwordStrength.feedback.map((item, index) => (
                          <div key={index} className="flex items-center gap-1">
                            <XCircle size={12} className="text-red-500" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-teal-200' : 'text-teal-800'} mb-2`}>
                  Confirm New Password *
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all ${
                      formData.confirmPassword && formData.newPassword !== formData.confirmPassword
                        ? 'border-red-300 focus:ring-red-400'
                        : 'border-teal-200'
                    } ${theme === 'dark' ? 'bg-teal-700 text-white border-teal-600' : 'bg-white text-teal-900'}`}
                    placeholder="Confirm your new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-500 hover:text-teal-600"
                  >
                    {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <XCircle size={14} />
                    Passwords do not match
                  </p>
                )}
              </div>

              {/* Message */}
              {message.text && (
                <div className={`p-4 rounded-lg flex items-center gap-3 ${
                  message.type === 'success'
                    ? 'bg-green-50 border border-green-200 text-green-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                  {message.type === 'success' ? (
                    <CheckCircle size={20} className="text-green-600" />
                  ) : (
                    <XCircle size={20} className="text-red-600" />
                  )}
                  <span className="text-sm">{message.text}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !formData.currentPassword || !formData.newPassword || !formData.confirmPassword}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Updating Password...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Change Password
                  </>
                )}
              </button>
            </form>

            {/* Security Tips */}
            <div className={`mt-8 p-4 rounded-lg ${theme === 'dark' ? 'bg-teal-700' : 'bg-teal-50'} border border-teal-200`}>
              <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-teal-900'} mb-2`}>
                Password Security Tips:
              </h3>
              <ul className={`text-xs ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'} space-y-1`}>
                <li>• Use at least 8 characters</li>
                <li>• Include uppercase and lowercase letters</li>
                <li>• Add numbers and special characters</li>
                <li>• Avoid using personal information</li>
                <li>• Don't reuse passwords from other accounts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
