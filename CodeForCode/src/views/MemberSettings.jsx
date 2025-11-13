import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Settings, User, Bell, Shield, Palette, Save, Eye, EyeOff } from 'lucide-react';
import Layout from '@/components/Layout';

const MemberSettings = () => {
  const { member } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    // Profile settings
    name: member?.name || '',
    email: member?.email || '',
    mobile: member?.mobile || '',
    dateOfBirth: member?.dateOfBirth || '',
    gender: member?.gender || 'male',
    address: member?.address || '',

    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    workoutReminders: true,
    classReminders: true,
    progressUpdates: true,
    newsletter: false,

    // Privacy settings
    profileVisibility: 'private',
    showProgress: true,
    showAchievements: true,
    allowMessages: true,

    // Preferences
    language: 'en',
    timezone: 'UTC+5:30',
    units: 'metric',
    theme: theme
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSettingChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswords(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    // In real app, make API call to update profile
    console.log('Saving profile:', settings);
    alert('Profile settings saved successfully!');
  };

  const handleSaveNotifications = () => {
    // In real app, make API call to update notifications
    console.log('Saving notifications:', settings);
    alert('Notification settings saved successfully!');
  };

  const handleSavePrivacy = () => {
    // In real app, make API call to update privacy
    console.log('Saving privacy:', settings);
    alert('Privacy settings saved successfully!');
  };

  const handleChangePassword = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwords.newPassword.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    // In real app, make API call to change password
    console.log('Changing password');
    alert('Password changed successfully!');
    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Palette }
  ];

  return (
    <Layout>
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-teal-900' : 'bg-gradient-to-br from-teal-50 via-teal-100 to-teal-50'}`}>
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>
              Settings
            </h1>
            <p className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'} mt-1`}>
              Manage your account preferences and settings
            </p>
          </div>
        </div>

        {/* Settings Content */}
        <div className={`rounded-xl shadow-lg overflow-hidden ${theme === 'dark' ? 'bg-teal-800' : 'bg-white'}`}>
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? `border-b-2 border-teal-500 ${theme === 'dark' ? 'text-teal-300' : 'text-teal-600'}`
                      : `${theme === 'dark' ? 'text-teal-400 hover:text-teal-300' : 'text-gray-600 hover:text-teal-600'}`
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>
                  Profile Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={settings.name}
                      onChange={(e) => handleSettingChange('profile', 'name', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark' ? 'bg-teal-700 text-white border-teal-600' : 'bg-white text-teal-900 border-teal-200'}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => handleSettingChange('profile', 'email', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark' ? 'bg-teal-700 text-white border-teal-600' : 'bg-white text-teal-900 border-teal-200'}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={settings.mobile}
                      onChange={(e) => handleSettingChange('profile', 'mobile', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark' ? 'bg-teal-700 text-white border-teal-600' : 'bg-white text-teal-900 border-teal-200'}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={settings.dateOfBirth}
                      onChange={(e) => handleSettingChange('profile', 'dateOfBirth', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark' ? 'bg-teal-700 text-white border-teal-600' : 'bg-white text-teal-900 border-teal-200'}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>
                      Gender
                    </label>
                    <select
                      value={settings.gender}
                      onChange={(e) => handleSettingChange('profile', 'gender', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark' ? 'bg-teal-700 text-white border-teal-600' : 'bg-white text-teal-900 border-teal-200'}`}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>
                      Address
                    </label>
                    <textarea
                      value={settings.address}
                      onChange={(e) => handleSettingChange('profile', 'address', e.target.value)}
                      rows="3"
                      className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark' ? 'bg-teal-700 text-white border-teal-600' : 'bg-white text-teal-900 border-teal-200'}`}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveProfile}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Save size={18} />
                    Save Profile
                  </button>
                </div>

                {/* Change Password Section */}
                <div className="border-t pt-6 mt-8">
                  <h4 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>
                    Change Password
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={passwords.currentPassword}
                          onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                          className={`w-full px-3 py-2 pr-10 border rounded-lg ${theme === 'dark' ? 'bg-teal-700 text-white border-teal-600' : 'bg-white text-teal-900 border-teal-200'}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>
                        New Password
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={passwords.newPassword}
                        onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark' ? 'bg-teal-700 text-white border-teal-600' : 'bg-white text-teal-900 border-teal-200'}`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>
                        Confirm Password
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={passwords.confirmPassword}
                        onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark' ? 'bg-teal-700 text-white border-teal-600' : 'bg-white text-teal-900 border-teal-200'}`}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
                    <button
                      onClick={handleChangePassword}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>
                  Notification Preferences
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>
                        Email Notifications
                      </h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}`}>
                        Receive notifications via email
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>
                        Push Notifications
                      </h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}`}>
                        Receive push notifications in browser
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.pushNotifications}
                        onChange={(e) => handleSettingChange('notifications', 'pushNotifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>
                        Workout Reminders
                      </h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}`}>
                        Get reminded about scheduled workouts
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.workoutReminders}
                        onChange={(e) => handleSettingChange('notifications', 'workoutReminders', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>
                        Class Reminders
                      </h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}`}>
                        Get reminded about upcoming classes
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.classReminders}
                        onChange={(e) => handleSettingChange('notifications', 'classReminders', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>
                        Progress Updates
                      </h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}`}>
                        Receive updates on your fitness progress
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.progressUpdates}
                        onChange={(e) => handleSettingChange('notifications', 'progressUpdates', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>
                        Newsletter
                      </h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}`}>
                        Subscribe to our fitness newsletter
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.newsletter}
                        onChange={(e) => handleSettingChange('notifications', 'newsletter', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveNotifications}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Save size={18} />
                    Save Notifications
                  </button>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>
                  Privacy Settings
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>
                      Profile Visibility
                    </label>
                    <select
                      value={settings.profileVisibility}
                      onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark' ? 'bg-teal-700 text-white border-teal-600' : 'bg-white text-teal-900 border-teal-200'}`}
                    >
                      <option value="public">Public - Anyone can see my profile</option>
                      <option value="members">Members Only - Only gym members can see</option>
                      <option value="private">Private - Only I can see my profile</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>
                        Show Progress
                      </h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}`}>
                        Allow others to see my fitness progress
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.showProgress}
                        onChange={(e) => handleSettingChange('privacy', 'showProgress', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>
                        Show Achievements
                      </h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}`}>
                        Allow others to see my achievements
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.showAchievements}
                        onChange={(e) => handleSettingChange('privacy', 'showAchievements', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>
                        Allow Messages
                      </h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}`}>
                        Allow other members to send me messages
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.allowMessages}
                        onChange={(e) => handleSettingChange('privacy', 'allowMessages', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSavePrivacy}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Save size={18} />
                    Save Privacy Settings
                  </button>
                </div>
              </div>
            )}

            {/* Preferences */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>
                  App Preferences
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>
                      Language
                    </label>
                    <select
                      value={settings.language}
                      onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark' ? 'bg-teal-700 text-white border-teal-600' : 'bg-white text-teal-900 border-teal-200'}`}
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>
                      Timezone
                    </label>
                    <select
                      value={settings.timezone}
                      onChange={(e) => handleSettingChange('preferences', 'timezone', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark' ? 'bg-teal-700 text-white border-teal-600' : 'bg-white text-teal-900 border-teal-200'}`}
                    >
                      <option value="UTC+5:30">IST (UTC+5:30)</option>
                      <option value="UTC+0">GMT (UTC+0)</option>
                      <option value="UTC-5">EST (UTC-5)</option>
                      <option value="UTC-8">PST (UTC-8)</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>
                      Units
                    </label>
                    <select
                      value={settings.units}
                      onChange={(e) => handleSettingChange('preferences', 'units', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark' ? 'bg-teal-700 text-white border-teal-600' : 'bg-white text-teal-900 border-teal-200'}`}
                    >
                      <option value="metric">Metric (kg, km)</option>
                      <option value="imperial">Imperial (lbs, miles)</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-teal-200' : 'text-teal-700'}`}>
                      Theme
                    </label>
                    <select
                      value={settings.theme}
                      onChange={(e) => {
                        handleSettingChange('preferences', 'theme', e.target.value);
                        toggleTheme();
                      }}
                      className={`w-full px-3 py-2 border rounded-lg ${theme === 'dark' ? 'bg-teal-700 text-white border-teal-600' : 'bg-white text-teal-900 border-teal-200'}`}
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => alert('Preferences saved successfully!')}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Save size={18} />
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default MemberSettings;
