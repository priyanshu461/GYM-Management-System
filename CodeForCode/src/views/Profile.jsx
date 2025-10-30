import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Phone, MapPin, Calendar, Award, Target, Edit3, Save, X, Dumbbell, Heart, TrendingUp, Star, BookOpen, Users, Bell, Settings, Activity, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Priyanshu Gautam',
    email: user?.email || 'priyanshu@example.com',
    phone: user?.phone || '+91 98765 43210',
    address: user?.address || 'Sanjay Palace, Shoe Market, 282002',
    joinDate: user?.joinDate || '2023-01-15',
    role: user?.role || 'Admin',
    membershipStatus: user?.membershipStatus || 'Active'
  });

  const [fitnessStats] = useState({
    bmi: 22.5,
    workoutsCompleted: 145,
    goalsAchieved: 12,
    totalHours: 320
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Update user data in AuthContext
    updateUser({
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
      address: profileData.address,
      role: profileData.role,
      membershipStatus: profileData.membershipStatus
    });
    // Here you would typically save to backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original data
    setProfileData({
      name: user?.name || 'Priyanshu Gautam',
      email: user?.email || 'priyanshu@example.com',
      phone: user?.phone || '+91 98765 43210',
      address: user?.address || 'Sanjay Palace, Shoe Market, 282002',
      joinDate: user?.joinDate || '2023-01-15',
      role: user?.role || 'Admin',
      membershipStatus: user?.membershipStatus || 'Active'
    });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border-t-4 border-teal-400 p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {profileData.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-teal-900 mb-2">{profileData.name}</h1>
              <p className="text-teal-600 text-lg mb-4">{profileData.role}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-teal-700">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>Joined {new Date(profileData.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={16} />
                  <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-semibold">
                    {profileData.membershipStatus}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-md"
                >
                  <Edit3 size={16} />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-md"
                  >
                    <Save size={16} />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-md"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-2xl shadow-lg border-t-4 border-teal-400 p-8">
          <h2 className="text-2xl font-bold text-teal-900 mb-6 flex items-center gap-3">
            <User size={24} className="text-teal-500" />
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-teal-800 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors"
                  />
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-lg">
                    <User size={20} className="text-teal-500" />
                    <span className="text-teal-900">{profileData.name}</span>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-teal-800 mb-2">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors"
                  />
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-lg">
                    <Mail size={20} className="text-teal-500" />
                    <span className="text-teal-900">{profileData.email}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-teal-800 mb-2">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors"
                  />
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-lg">
                    <Phone size={20} className="text-teal-500" />
                    <span className="text-teal-900">{profileData.phone}</span>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-teal-800 mb-2">Address</label>
                {isEditing ? (
                  <textarea
                    value={profileData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-colors resize-none"
                  />
                ) : (
                  <div className="flex items-start gap-3 p-3 bg-teal-50 rounded-lg">
                    <MapPin size={20} className="text-teal-500 mt-1" />
                    <span className="text-teal-900">{profileData.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="bg-white rounded-2xl shadow-lg border-t-4 border-teal-400 p-8">
          <h2 className="text-2xl font-bold text-teal-900 mb-6 flex items-center gap-3">
            <Award size={24} className="text-teal-500" />
            Account Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-xl border border-teal-200">
              <div className="flex items-center gap-3 mb-3">
                <Calendar size={20} className="text-teal-600" />
                <h3 className="font-semibold text-teal-800">Join Date</h3>
              </div>
              <p className="text-teal-900 text-lg font-medium">
                {new Date(profileData.joinDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-xl border border-teal-200">
              <div className="flex items-center gap-3 mb-3">
                <User size={20} className="text-teal-600" />
                <h3 className="font-semibold text-teal-800">Role</h3>
              </div>
              <p className="text-teal-900 text-lg font-medium">{profileData.role}</p>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-xl border border-teal-200">
              <div className="flex items-center gap-3 mb-3">
                <Award size={20} className="text-teal-600" />
                <h3 className="font-semibold text-teal-800">Membership</h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                profileData.membershipStatus === 'Active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {profileData.membershipStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Membership Details */}
        <div className="bg-white rounded-2xl shadow-lg border-t-4 border-teal-400 p-8">
          <h2 className="text-2xl font-bold text-teal-900 mb-6 flex items-center gap-3">
            <Award size={24} className="text-teal-500" />
            Membership Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl border border-emerald-200"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Star size={20} className="text-emerald-600" />
                <h3 className="font-semibold text-emerald-800">Plan Type</h3>
              </div>
              <p className="text-emerald-900 text-lg font-medium">Premium Membership</p>
              <p className="text-emerald-600 text-sm mt-1">Full Access Package</p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl border border-amber-200"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Calendar size={20} className="text-amber-600" />
                <h3 className="font-semibold text-amber-800">Expires On</h3>
              </div>
              <p className="text-amber-900 text-lg font-medium">Dec 31, 2024</p>
              <p className="text-amber-600 text-sm mt-1">Auto-renewal enabled</p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl border border-indigo-200"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Zap size={20} className="text-indigo-600" />
                <h3 className="font-semibold text-indigo-800">Benefits</h3>
              </div>
              <ul className="text-indigo-900 text-sm space-y-1">
                <li>• Unlimited Classes</li>
                <li>• Personal Training</li>
                <li>• Nutrition Consult</li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Fitness Stats */}
        <div className="bg-white rounded-2xl shadow-lg border-t-4 border-teal-400 p-8">
          <h2 className="text-2xl font-bold text-teal-900 mb-6 flex items-center gap-3">
            <Target size={24} className="text-teal-500" />
            Fitness Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 text-center hover:shadow-lg transition-shadow duration-200"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">{fitnessStats.bmi}</div>
              <div className="text-blue-800 font-semibold">BMI Score</div>
              <div className="text-blue-600 text-sm mt-1">Normal Range</div>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 text-center hover:shadow-lg transition-shadow duration-200"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl font-bold text-green-600 mb-2">{fitnessStats.workoutsCompleted}</div>
              <div className="text-green-800 font-semibold">Workouts Completed</div>
              <div className="text-green-600 text-sm mt-1">This Year</div>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 text-center hover:shadow-lg transition-shadow duration-200"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl font-bold text-purple-600 mb-2">{fitnessStats.goalsAchieved}</div>
              <div className="text-purple-800 font-semibold">Goals Achieved</div>
              <div className="text-purple-600 text-sm mt-1">Fitness Milestones</div>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200 text-center hover:shadow-lg transition-shadow duration-200"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl font-bold text-orange-600 mb-2">{fitnessStats.totalHours}</div>
              <div className="text-orange-800 font-semibold">Training Hours</div>
              <div className="text-orange-600 text-sm mt-1">Total Time</div>
            </motion.div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg border-t-4 border-teal-400 p-8">
          <h2 className="text-2xl font-bold text-teal-900 mb-6 flex items-center gap-3">
            <Zap size={24} className="text-teal-500" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/bmiCalculator">
              <motion.div
                className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-xl border border-teal-200 text-center hover:shadow-lg transition-all duration-200 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Activity size={32} className="text-teal-600 mx-auto mb-2" />
                <div className="text-teal-800 font-semibold">BMI Calculator</div>
                <div className="text-teal-600 text-sm">Check your health metrics</div>
              </motion.div>
            </Link>
            <Link to="/workoutRoutinue">
              <motion.div
                className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200 text-center hover:shadow-lg transition-all duration-200 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Dumbbell size={32} className="text-orange-600 mx-auto mb-2" />
                <div className="text-orange-800 font-semibold">Workout Plans</div>
                <div className="text-orange-600 text-sm">View your routines</div>
              </motion.div>
            </Link>
            <Link to="/dietPlan">
              <motion.div
                className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200 text-center hover:shadow-lg transition-all duration-200 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Heart size={32} className="text-green-600 mx-auto mb-2" />
                <div className="text-green-800 font-semibold">Diet Plans</div>
                <div className="text-green-600 text-sm">Nutrition guidance</div>
              </motion.div>
            </Link>
            <Link to="/progressTracking">
              <motion.div
                className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200 text-center hover:shadow-lg transition-all duration-200 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <TrendingUp size={32} className="text-purple-600 mx-auto mb-2" />
                <div className="text-purple-800 font-semibold">Progress Tracking</div>
                <div className="text-purple-600 text-sm">Monitor your journey</div>
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl shadow-lg border-t-4 border-teal-400 p-8">
          <h2 className="text-2xl font-bold text-teal-900 mb-6 flex items-center gap-3">
            <Activity size={24} className="text-teal-500" />
            Recent Activities
          </h2>
          <div className="space-y-4">
            <motion.div
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg border border-teal-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white">
                <Dumbbell size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-teal-900">Completed Upper Body Workout</h3>
                <p className="text-teal-600 text-sm">45 minutes • 320 calories burned</p>
              </div>
              <div className="text-teal-500 text-sm">2 hours ago</div>
            </motion.div>
            <motion.div
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                <Target size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-green-900">Achieved Weight Loss Goal</h3>
                <p className="text-green-600 text-sm">Lost 2kg this month</p>
              </div>
              <div className="text-green-500 text-sm">1 day ago</div>
            </motion.div>
            <motion.div
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <BookOpen size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900">Booked Yoga Class</h3>
                <p className="text-blue-600 text-sm">Tomorrow at 9:00 AM</p>
              </div>
              <div className="text-blue-500 text-sm">3 hours ago</div>
            </motion.div>
          </div>
        </div>

        {/* Fitness Preferences */}
        <div className="bg-white rounded-2xl shadow-lg border-t-4 border-teal-400 p-8">
          <h2 className="text-2xl font-bold text-teal-900 mb-6 flex items-center gap-3">
            <Settings size={24} className="text-teal-500" />
            Fitness Preferences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-teal-800 mb-2">Preferred Workout Types</label>
                <div className="flex flex-wrap gap-2">
                  {['Strength Training', 'Cardio', 'Yoga', 'HIIT', 'CrossFit'].map((type) => (
                    <span key={type} className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-teal-800 mb-2">Fitness Goals</label>
                <div className="flex flex-wrap gap-2">
                  {['Weight Loss', 'Muscle Gain', 'Endurance', 'Flexibility'].map((goal) => (
                    <span key={goal} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                      {goal}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-teal-800 mb-2">Dietary Restrictions</label>
                <div className="flex flex-wrap gap-2">
                  {['Vegetarian', 'Gluten-Free', 'Dairy-Free'].map((restriction) => (
                    <span key={restriction} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {restriction}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-teal-800 mb-2">Notification Preferences</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Bell size={16} className="text-teal-500" />
                    <span className="text-sm text-teal-700">Class Reminders</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-teal-500" />
                    <span className="text-sm text-teal-700">Trainer Updates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
