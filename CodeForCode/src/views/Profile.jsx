import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { User, Mail, Phone, MapPin, Calendar, Edit3, Save, X, Loader2 } from 'lucide-react';
import Layout from '@/components/Layout';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    joinedAt: '',
    user_type: ''
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      // Assuming user data is available from context
      setProfileData({
        name: user?.name || 'User',
        email: user?.email || '',
        mobile: user?.mobile || '',
        address: user?.address || '',
        joinedAt: user?.joinedAt || '',
        user_type: user?.user_type || 'Admin'
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      // TODO: Implement update profile API call
      // For now, just update context
      updateUser({
        name: profileData.name,
        email: profileData.email,
        mobile: profileData.mobile,
        address: profileData.address,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    fetchUserProfile();
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-teal-900' : 'bg-gradient-to-br from-teal-50 via-teal-100 to-teal-50'}`}>
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <Loader2 size={24} className="animate-spin text-teal-500" />
            <span className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>Loading profile...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-teal-900' : 'bg-gradient-to-br from-teal-50 via-teal-100 to-teal-50'}`}>
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>
                My Profile
              </h1>
              <p className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'} mt-1`}>
                Manage your personal information
              </p>
            </div>
            <div className="flex gap-2">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Edit3 size={16} />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={saving}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Profile Card */}
          <div className={`p-6 rounded-xl shadow-lg mb-8 ${theme === 'dark' ? 'bg-teal-800' : 'bg-white'} border border-teal-200`}>
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {profileData.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>{profileData.name}</h2>
                <p className={`text-sm ${theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}`}>{profileData.email}</p>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} className="text-teal-500" />
                    <span className={theme === 'dark' ? 'text-teal-200' : 'text-teal-600'}>Joined {new Date(profileData.joinedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={16} className="text-teal-500" />
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800`}>
                      {profileData.user_type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-teal-800' : 'bg-white'} border border-teal-200`}>
            <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-teal-900'}`}>Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-teal-200' : 'text-teal-800'} mb-2`}>Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 ${theme === 'dark' ? 'bg-teal-700 text-white' : 'bg-white text-teal-900'}`}
                  />
                ) : (
                  <div className={`flex items-center gap-3 p-3 rounded-lg ${theme === 'dark' ? 'bg-teal-700' : 'bg-teal-50'}`}>
                    <User size={20} className="text-teal-500" />
                    <span className={theme === 'dark' ? 'text-white' : 'text-teal-900'}>{profileData.name}</span>
                  </div>
                )}
              </div>
              <div>
                <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-teal-200' : 'text-teal-800'} mb-2`}>Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 ${theme === 'dark' ? 'bg-teal-700 text-white' : 'bg-white text-teal-900'}`}
                  />
                ) : (
                  <div className={`flex items-center gap-3 p-3 rounded-lg ${theme === 'dark' ? 'bg-teal-700' : 'bg-teal-50'}`}>
                    <Mail size={20} className="text-teal-500" />
                    <span className={theme === 'dark' ? 'text-white' : 'text-teal-900'}>{profileData.email}</span>
                  </div>
                )}
              </div>
              <div>
                <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-teal-200' : 'text-teal-800'} mb-2`}>Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    className={`w-full px-4 py-3 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 ${theme === 'dark' ? 'bg-teal-700 text-white' : 'bg-white text-teal-900'}`}
                  />
                ) : (
                  <div className={`flex items-center gap-3 p-3 rounded-lg ${theme === 'dark' ? 'bg-teal-700' : 'bg-teal-50'}`}>
                    <Phone size={20} className="text-teal-500" />
                    <span className={theme === 'dark' ? 'text-white' : 'text-teal-900'}>{profileData.mobile}</span>
                  </div>
                )}
              </div>
              <div>
                <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-teal-200' : 'text-teal-800'} mb-2`}>Address</label>
                {isEditing ? (
                  <textarea
                    value={profileData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={3}
                    className={`w-full px-4 py-3 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none ${theme === 'dark' ? 'bg-teal-700 text-white' : 'bg-white text-teal-900'}`}
                  />
                ) : (
                  <div className={`flex items-start gap-3 p-3 rounded-lg ${theme === 'dark' ? 'bg-teal-700' : 'bg-teal-50'}`}>
                    <MapPin size={20} className="text-teal-500 mt-1" />
                    <span className={theme === 'dark' ? 'text-white' : 'text-teal-900'}>{profileData.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
