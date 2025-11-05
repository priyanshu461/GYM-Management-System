import React, { useState, useEffect } from 'react'
import { Menu, LogOut, LayoutDashboardIcon, Dumbbell, Laptop2, X } from "lucide-react";
import { MdGroup, MdNotificationAdd, MdOutlineSecurity, MdSupportAgent } from 'react-icons/md';
import { TfiWallet } from 'react-icons/tfi';
import { BsClockHistory, BsFillBox2HeartFill } from 'react-icons/bs';
import { FaBlog, FaCapsules, FaCartPlus, FaSignInAlt, FaUserTie } from 'react-icons/fa';
import { LuFolderCog } from 'react-icons/lu';
import { TbReportAnalytics, TbReportSearch } from 'react-icons/tb';
import { GiFruitBowl, GiGymBag, GiProgression } from 'react-icons/gi';
import { BiDumbbell } from 'react-icons/bi';
import { AiOutlineAudit, AiTwotoneRest } from 'react-icons/ai';
import { SiGoogleclassroom } from 'react-icons/si';
import { SlSettings } from 'react-icons/sl';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = ({ demo = false, isOpen, onClose, collapsed, onToggleCollapse, className }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [managementOpen, setManagementOpen] = useState(false);
  const [workoutOpen, setWorkoutOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);

  // Helper function to check if a route is active
  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  // Auto-expand dropdowns based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/members') || path.startsWith('/trainers') || path.startsWith('/finance') || path.startsWith('/facilities')) {
      setManagementOpen(true);
    }
    if (path.startsWith('/workout-routine') || path.startsWith('/bmi-calculator') || path.startsWith('/diet-plan') || path.startsWith('/progress-tracking') || path.startsWith('/reports-analytics')) {
      setWorkoutOpen(true);
    }
    if (path.startsWith('/classes-schedule') || path.startsWith('/courses') || path.startsWith('/franchises-and-membership')) {
      setServiceOpen(true);
    }
    if (path.startsWith('/products')) {
      setProductOpen(true);
    }
  }, [location.pathname]);

  return (
    <div>
      <aside
        className={`${className} flex flex-col h-screen top-0 overflow-hidden`}
      >
        <div className="h-16 sm:h-17 flex items-center px-3 sm:px-4 justify-between border-b border-teal-300/50 dark:border-teal-700/50 bg-teal-50/50 dark:bg-teal-900/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            {/* Logo Icon */}
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700 shadow-md flex-shrink-0">
              <Dumbbell size={20} className="text-white" />
            </div>
            {(isOpen || !collapsed) && (
              <h1 className="font-extrabold text-lg sm:text-xl text-teal-600 dark:text-white select-none truncate">
                <span className="hidden sm:inline">Admin </span>
                <span className='text-teal-900 dark:text-white'>Panel</span>
              </h1>
            )}
          </div>
          {isOpen && (
            <button 
              onClick={onClose} 
              className="md:hidden p-2 rounded-lg hover:bg-teal-200 dark:hover:bg-teal-800 transition-colors duration-200 flex-shrink-0"
              aria-label="Close sidebar"
            >
              <X size={20} className="text-teal-900 dark:text-white" />
            </button>
          )}
        </div>

        <nav className="p-2 sm:p-3 mt-2 sm:mt-4 flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-teal-300 dark:scrollbar-thumb-teal-700 scrollbar-track-transparent">
          {demo ? (
            <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-3 rounded-lg hover:teal-100 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
              <LayoutDashboardIcon size={20} className="text-teal-900 dark:text-white" />
              {(isOpen || !collapsed) && <span className="font-semibold">Dashboard</span>}
            </div>
          ) : (
            <Link 
              to="/dashboard" 
              className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg cursor-pointer text-sm transition-all duration-200 group ${
                isActive('/dashboard')
                  ? 'bg-teal-500 dark:bg-teal-700 text-white shadow-lg'
                  : 'hover:bg-teal-100 dark:hover:bg-teal-800 text-teal-900 dark:text-white'
              }`}
            >
              <LayoutDashboardIcon size={18} className={`sm:w-5 sm:h-5 flex-shrink-0 group-hover:scale-110 transition-transform ${
                isActive('/dashboard') ? 'text-white' : 'text-teal-900 dark:text-white'
              }`} />
              {(isOpen || !collapsed) && <span className="font-semibold truncate">Dashboard</span>}
            </Link>
          )}

          {/* Management Dropdown */}
          <div>
            <button
              type="button"
              className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white w-full transition-all duration-200 group"
              onClick={() => setManagementOpen((open) => !open)}
              aria-expanded={managementOpen}
            >
              <Laptop2 size={18} className="sm:w-5 sm:h-5 text-teal-600 dark:text-white flex-shrink-0 group-hover:scale-110 transition-transform" />
              {(isOpen || !collapsed) && <span className="font-semibold truncate">Management</span>}
              {(isOpen || !collapsed) && (
                <svg
                  className={`ml-auto transition-transform ${managementOpen ? 'rotate-90' : ''}`}
                  width="14"
                  height="14"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M6 8L10 12L14 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
              {managementOpen && (isOpen || !collapsed) && (
              <div className="ml-4 sm:ml-8 flex flex-col gap-1 sm:gap-2 mt-1">
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <MdGroup size={18} className="text-teal-900 dark:text-white" />
                    <span>Members Management</span>
                  </div>
                ) : (
                  <Link 
                    to="/members" 
                    className={`flex items-center gap-2 sm:gap-3 p-2 rounded-lg cursor-pointer text-sm transition-all duration-200 group ${
                      isActive('/members')
                        ? 'bg-teal-500/20 dark:bg-teal-700/50 text-teal-700 dark:text-teal-200 font-medium border-l-2 border-teal-500'
                        : 'hover:bg-teal-50 dark:hover:bg-teal-800 text-teal-900 dark:text-white'
                    }`}
                  >
                    <MdGroup size={16} className={`sm:w-4 sm:h-4 flex-shrink-0 group-hover:scale-110 transition-transform ${
                      isActive('/members') ? 'text-teal-700 dark:text-teal-200' : 'text-teal-900 dark:text-white'
                    }`} />
                    <span className="truncate">Members Management</span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <FaUserTie size={18} className="text-teal-900 dark:text-white" />
                    <span>Trainer</span>
                  </div>
                ) : (
                  <Link 
                    to="/trainers" 
                    className={`flex items-center gap-2 sm:gap-3 p-2 rounded-lg cursor-pointer text-sm transition-all duration-200 group ${
                      isActive('/trainers')
                        ? 'bg-teal-500/20 dark:bg-teal-700/50 text-teal-700 dark:text-teal-200 font-medium border-l-2 border-teal-500'
                        : 'hover:bg-teal-50 dark:hover:bg-teal-800 text-teal-900 dark:text-white'
                    }`}
                  >
                    <FaUserTie size={16} className={`sm:w-4 sm:h-4 flex-shrink-0 group-hover:scale-110 transition-transform ${
                      isActive('/trainers') ? 'text-teal-700 dark:text-teal-200' : 'text-teal-900 dark:text-white'
                    }`} />
                    <span className="truncate">Trainers</span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <TfiWallet size={18} className="text-teal-900 dark:text-white" />
                    <span>Finance</span>
                  </div>
                ) : (
                  <Link 
                    to="/finance" 
                    className={`flex items-center gap-2 sm:gap-3 p-2 rounded-lg cursor-pointer text-sm transition-all duration-200 group ${
                      isActive('/finance')
                        ? 'bg-teal-500/20 dark:bg-teal-700/50 text-teal-700 dark:text-teal-200 font-medium border-l-2 border-teal-500'
                        : 'hover:bg-teal-50 dark:hover:bg-teal-800 text-teal-900 dark:text-white'
                    }`}
                  >
                    <TfiWallet size={16} className={`sm:w-4 sm:h-4 flex-shrink-0 group-hover:scale-110 transition-transform ${
                      isActive('/finance') ? 'text-teal-700 dark:text-teal-200' : 'text-teal-900 dark:text-white'
                    }`} />
                    <span className="truncate">Finance</span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <BsFillBox2HeartFill size={18} className="text-teal-900 dark:text-white" />
                    <span>Facilities</span>
                  </div>
                ) : (
                  <Link 
                    to="/facilities" 
                    className={`flex items-center gap-2 sm:gap-3 p-2 rounded-lg cursor-pointer text-sm transition-all duration-200 group ${
                      isActive('/facilities')
                        ? 'bg-teal-500/20 dark:bg-teal-700/50 text-teal-700 dark:text-teal-200 font-medium border-l-2 border-teal-500'
                        : 'hover:bg-teal-50 dark:hover:bg-teal-800 text-teal-900 dark:text-white'
                    }`}
                  >
                    <BsFillBox2HeartFill size={16} className={`sm:w-4 sm:h-4 flex-shrink-0 group-hover:scale-110 transition-transform ${
                      isActive('/facilities') ? 'text-teal-700 dark:text-teal-200' : 'text-teal-900 dark:text-white'
                    }`} />
                    <span className="truncate">Facilities</span>
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Workout & Diet plans Dropdown */}
          <div>
            <button
              type="button"
              className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white w-full transition-all duration-200 group"
              onClick={() => setWorkoutOpen((open) => !open)}
              aria-expanded={workoutOpen}
            >
              <BiDumbbell size={20} className="text-teal-600 dark:text-white" />
              {(isOpen || !collapsed) && <span className="font-semibold truncate">Workout & Diet Plans</span>}
              {(isOpen || !collapsed) && (
                
                <svg
                  className={`ml-auto transition-transform ${workoutOpen ? 'rotate-90' : ''}`}
                  width="14"
                  height="14"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M6 8L10 12L14 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            {workoutOpen && (isOpen || !collapsed) && (
              <div className="ml-4 sm:ml-8 flex flex-col gap-1 sm:gap-2 mt-1">
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-all duration-200 group">
                    <BsClockHistory size={16} className="sm:w-4 sm:h-4 text-teal-900 dark:text-white flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="truncate">Workout Routines</span>
                  </div>
                ) : (
                  <Link 
                    to="/workout-routine" 
                    className={`flex items-center gap-2 sm:gap-3 p-2 rounded-lg cursor-pointer text-sm transition-all duration-200 group ${
                      isActive('/workout-routine')
                        ? 'bg-teal-500/20 dark:bg-teal-700/50 text-teal-700 dark:text-teal-200 font-medium border-l-2 border-teal-500'
                        : 'hover:bg-teal-50 dark:hover:bg-teal-800 text-teal-900 dark:text-white'
                    }`}
                  >
                    <BsClockHistory size={16} className={`sm:w-4 sm:h-4 flex-shrink-0 group-hover:scale-110 transition-transform ${
                      isActive('/workout-routine') ? 'text-teal-700 dark:text-teal-200' : 'text-teal-900 dark:text-white'
                    }`} />
                    <span className="truncate">Workout Routines</span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-all duration-200 group">
                    <TbReportAnalytics size={16} className="sm:w-4 sm:h-4 text-teal-900 dark:text-white flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="truncate">BMI Calculator</span>
                  </div>
                ) : ( 
                  <Link 
                    to="/bmi-calculator" 
                    className={`flex items-center gap-2 sm:gap-3 p-2 rounded-lg cursor-pointer text-sm transition-all duration-200 group ${
                      isActive('/bmi-calculator')
                        ? 'bg-teal-500/20 dark:bg-teal-700/50 text-teal-700 dark:text-teal-200 font-medium border-l-2 border-teal-500'
                        : 'hover:bg-teal-50 dark:hover:bg-teal-800 text-teal-900 dark:text-white'
                    }`}
                  >
                    <TbReportAnalytics size={16} className={`sm:w-4 sm:h-4 flex-shrink-0 group-hover:scale-110 transition-transform ${
                      isActive('/bmi-calculator') ? 'text-teal-700 dark:text-teal-200' : 'text-teal-900 dark:text-white'
                    }`} />
                    <span className="truncate">BMI Calculator</span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-all duration-200 group">
                    <GiFruitBowl size={16} className="sm:w-4 sm:h-4 text-teal-900 dark:text-white flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="truncate">Diet Plans</span>
                  </div>
                ) : (
                  <Link 
                    to="/diet-plan" 
                    className={`flex items-center gap-2 sm:gap-3 p-2 rounded-lg cursor-pointer text-sm transition-all duration-200 group ${
                      isActive('/diet-plan')
                        ? 'bg-teal-500/20 dark:bg-teal-700/50 text-teal-700 dark:text-teal-200 font-medium border-l-2 border-teal-500'
                        : 'hover:bg-teal-50 dark:hover:bg-teal-800 text-teal-900 dark:text-white'
                    }`}
                  >
                    <GiFruitBowl size={16} className={`sm:w-4 sm:h-4 flex-shrink-0 group-hover:scale-110 transition-transform ${
                      isActive('/diet-plan') ? 'text-teal-700 dark:text-teal-200' : 'text-teal-900 dark:text-white'
                    }`} />
                    <span className="truncate">Diet Plans</span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-all duration-200 group">
                    <GiProgression size={16} className="sm:w-4 sm:h-4 text-teal-900 dark:text-white flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="truncate">Progress Tracking</span>
                  </div>
                ) : (
                  <Link 
                    to="/progress-tracking" 
                    className={`flex items-center gap-2 sm:gap-3 p-2 rounded-lg cursor-pointer text-sm transition-all duration-200 group ${
                      isActive('/progress-tracking')
                        ? 'bg-teal-500/20 dark:bg-teal-700/50 text-teal-700 dark:text-teal-200 font-medium border-l-2 border-teal-500'
                        : 'hover:bg-teal-50 dark:hover:bg-teal-800 text-teal-900 dark:text-white'
                    }`}
                  >
                    <GiProgression size={16} className={`sm:w-4 sm:h-4 flex-shrink-0 group-hover:scale-110 transition-transform ${
                      isActive('/progress-tracking') ? 'text-teal-700 dark:text-teal-200' : 'text-teal-900 dark:text-white'
                    }`} />
                    <span className="truncate">Progress Tracking</span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-all duration-200 group">
                    <TbReportSearch size={16} className="sm:w-4 sm:h-4 text-teal-900 dark:text-white flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="truncate">Reports & Analytics</span>
                  </div>
                ) : (
                  <Link 
                    to="/reports-analytics" 
                    className={`flex items-center gap-2 sm:gap-3 p-2 rounded-lg cursor-pointer text-sm transition-all duration-200 group ${
                      isActive('/reports-analytics')
                        ? 'bg-teal-500/20 dark:bg-teal-700/50 text-teal-700 dark:text-teal-200 font-medium border-l-2 border-teal-500'
                        : 'hover:bg-teal-50 dark:hover:bg-teal-800 text-teal-900 dark:text-white'
                    }`}
                  >
                    <TbReportSearch size={16} className={`sm:w-4 sm:h-4 flex-shrink-0 group-hover:scale-110 transition-transform ${
                      isActive('/reports-analytics') ? 'text-teal-700 dark:text-teal-200' : 'text-teal-900 dark:text-white'
                    }`} />
                    <span className="truncate">Reports & Analytics</span>
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Our Services Dropdown */}
          <div>
            <button
              type="button"
              className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white w-full transition-all duration-200 group"
              onClick={() => setServiceOpen((open) => !open)}
              aria-expanded={serviceOpen}
            >
              <LuFolderCog size={20} className="text-teal-900 dark:text-white" />
              {(isOpen || !collapsed) && <span className="font-semibold">Services</span>}
              {(isOpen || !collapsed) && (
                <svg
                  className={`ml-auto transition-transform ${serviceOpen ? 'rotate-90' : ''}`}
                  width="14"
                  height="14"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M6 8L10 12L 14 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            {serviceOpen && (isOpen || !collapsed) && (
              <div className="ml-4 sm:ml-8 flex flex-col gap-1 sm:gap-2 mt-1">
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <SiGoogleclassroom size={18} className="text-teal-900 dark:text-white" />
                    <span>Classes & Schedules</span>
                  </div>
                ) : (
                  <Link 
                    to="/classes-schedule" 
                    className={`flex items-center gap-2 sm:gap-3 p-2 rounded-lg cursor-pointer text-sm transition-all duration-200 group ${
                      isActive('/classes-schedule')
                        ? 'bg-teal-500/20 dark:bg-teal-700/50 text-teal-700 dark:text-teal-200 font-medium border-l-2 border-teal-500'
                        : 'hover:bg-teal-50 dark:hover:bg-teal-800 text-teal-900 dark:text-white'
                    }`}
                  >
                    <SiGoogleclassroom size={16} className={`sm:w-4 sm:h-4 flex-shrink-0 group-hover:scale-110 transition-transform ${
                      isActive('/classes-schedule') ? 'text-teal-700 dark:text-teal-200' : 'text-teal-900 dark:text-white'
                    }`} />
                    <span className="truncate">Classes & Schedules</span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <AiOutlineAudit size={18} className="text-teal-900 dark:text-white" />
                    <span>Courses</span>
                  </div>
                ) : (
                  <Link 
                    to="/courses" 
                    className={`flex items-center gap-2 sm:gap-3 p-2 rounded-lg cursor-pointer text-sm transition-all duration-200 group ${
                      isActive('/courses')
                        ? 'bg-teal-500/20 dark:bg-teal-700/50 text-teal-700 dark:text-teal-200 font-medium border-l-2 border-teal-500'
                        : 'hover:bg-teal-50 dark:hover:bg-teal-800 text-teal-900 dark:text-white'
                    }`}
                  >
                    <AiOutlineAudit size={16} className={`sm:w-4 sm:h-4 flex-shrink-0 group-hover:scale-110 transition-transform ${
                      isActive('/courses') ? 'text-teal-700 dark:text-teal-200' : 'text-teal-900 dark:text-white'
                    }`} />
                    <span className="truncate">Courses</span>
                  </Link> 
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <GiGymBag size={18} className="text-teal-900 dark:text-white" />
                    <span>Membership Plans </span>
                  </div>
                ) : (
                  <Link 
                    to="/franchises-and-membership" 
                    className={`flex items-center gap-2 sm:gap-3 p-2 rounded-lg cursor-pointer text-sm transition-all duration-200 group ${
                      isActive('/franchises-and-membership')
                        ? 'bg-teal-500/20 dark:bg-teal-700/50 text-teal-700 dark:text-teal-200 font-medium border-l-2 border-teal-500'
                        : 'hover:bg-teal-50 dark:hover:bg-teal-800 text-teal-900 dark:text-white'
                    }`}
                  >
                    <GiGymBag size={16} className={`sm:w-4 sm:h-4 flex-shrink-0 group-hover:scale-110 transition-transform ${
                      isActive('/franchises-and-membership') ? 'text-teal-700 dark:text-teal-200' : 'text-teal-900 dark:text-white'
                    }`} />
                    <span className="truncate">Membership Plans</span>
                  </Link>
                )}

              </div>
            )}
          </div>

          {/* Authentication
          <div>
            <button
              type="button"
              className="flex items-center gap-3 p-3 rounded-lg hover:teal-100 cursor-pointer text-sm text-teal-900 w-full transition-colors duration-200"
              onClick={() => setAuthenticationOpen((open) => !open)}
              aria-expanded={authenticationOpen}
            >
              <SiAuthentik size={20} className="teteal-600" />
              {(isOpen || !isCollapsed) && <span className="font-semibold">Authentication</span>}
              {(isOpen || !isCollapsed) && (
                <svg
                  className={`ml-auto transition-transform ${authenticationOpen ? 'rotate-90' : ''}`}
                  width="14"
                  height="14"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M6 8L10 12L14 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            {authenticationOpen && (isOpen || !isCollapsed) && (
              <div className="ml-8 flex flex-col gap-2 mt-1">
                <a
                  className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200"
                  href="#"
                >
                  <FaSignInAlt size={18} />
                  <span>Sign Up</span>
                </a>
                <a
                  className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200"
                  href="#"
                >
                  <GoPasskeyFill size={18} />
                  <span>Sign In</span>
                </a>
                <a
                  className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200"
                  href="#"
                >
                  <TbClockExclamation size={18} />
                  <span>Forgot & Reset Password</span>
                </a>
              </div>
            )}
          </div> */}

          {/* Products */}
          <div>
            <button
              type="button"
              className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white w-full transition-all duration-200 group"
              onClick={() => setProductOpen((open) => !open)}
              aria-expanded={productOpen}
            >
              <FaCartPlus size={20} className="text-teal-600 dark:text-white" />
              {(isOpen || !collapsed) && <span className="font-semibold">Products</span>}
              {(isOpen || !collapsed) && (
                <svg
                  className={`ml-auto transition-transform ${productOpen ? 'rotate-90' : ''}`}
                  width="14"
                  height="14"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M6 8L10 12L14 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            {productOpen && (isOpen || !collapsed) && (
              <div className="ml-4 sm:ml-8 flex flex-col gap-1 sm:gap-2 mt-1">
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <FaCartPlus size={18} className="text-teal-900 dark:text-white" />
                    <span>All Products</span>
                  </div>
                ) : (
                  <Link 
                    to="/products" 
                    className={`flex items-center gap-2 sm:gap-3 p-2 rounded-lg cursor-pointer text-sm transition-all duration-200 group ${
                      isActive('/products')
                        ? 'bg-teal-500/20 dark:bg-teal-700/50 text-teal-700 dark:text-teal-200 font-medium border-l-2 border-teal-500'
                        : 'hover:bg-teal-50 dark:hover:bg-teal-800 text-teal-900 dark:text-white'
                    }`}
                  >
                    <FaCartPlus size={16} className={`sm:w-4 sm:h-4 flex-shrink-0 group-hover:scale-110 transition-transform ${
                      isActive('/products') ? 'text-teal-700 dark:text-teal-200' : 'text-teal-900 dark:text-white'
                    }`} />
                    <span className="truncate">All Products</span>
                  </Link>
                )}
                {/* {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <GiFruitBowl size={18} className="text-teal-900 dark:text-white" />
                    <span>Protein</span>
                  </div>
                ) : (
                  <Link to="/protein" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <GiFruitBowl size={18} className="text-teal-900 dark:text-white" />
                    <span>Protein</span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <Dumbbell size={20} className="text-teal-900 dark:text-white" />
                    <span>Pre, Intra & Post-Workout Supplements</span>
                  </div>
                ) : (
                  <Link to="/supplements" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <Dumbbell size={20} className="text-teal-900 dark:text-white" />
                    <span>Pre, Intra & Post-Workout Supplements</span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <AiTwotoneRest size={18} className="text-teal-900 dark:text-white" />
                    <span>Amino Acids Supplements</span>
                  </div>
                ) : (
                  <Link to="/amino-acid-supplements" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <AiTwotoneRest size={18} className="text-teal-900 dark:text-white" />
                    <span>Amino Acids Supplements</span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <FaCapsules size={18} className="text-teal-900 dark:text-white" />
                    <span>Multivitamins & Minerals</span>
                  </div>
                ) : (
                  <Link to="/MultivitaminAndMinerals" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <FaCapsules size={18} className="text-teal-900 dark:text-white" />
                    <span>Multivitamins & Minerals</span>
                  </Link>
                )} */}
              </div>
            )}
          </div>
          <Link 
            to="/notificationcommunication" 
            className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg cursor-pointer text-sm transition-all duration-200 group ${
              isActive('/notificationcommunication')
                ? 'bg-teal-500 dark:bg-teal-700 text-white shadow-lg'
                : 'hover:bg-teal-100 dark:hover:bg-teal-800 text-teal-900 dark:text-white'
            }`}
          >
            <MdNotificationAdd size={18} className={`sm:w-5 sm:h-5 flex-shrink-0 group-hover:scale-110 transition-transform ${
              isActive('/notificationcommunication') ? 'text-white' : 'text-teal-900 dark:text-white'
            }`} />
            {(isOpen || !collapsed) && <span className="font-semibold truncate">Notifications</span>}
          </Link>
          {demo ? (
            <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-3 rounded-lg hover:teal-100 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
              <FaBlog size={18} className="text-teal-900 dark:text-white" />
              {(isOpen || !collapsed) && <span className="font-semibold"> Blog</span>}
            </div>
          ) : (
            <Link 
              to="/gymblog" 
              className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg cursor-pointer text-sm transition-all duration-200 group ${
                isActive('/gymblog')
                  ? 'bg-teal-500 dark:bg-teal-700 text-white shadow-lg'
                  : 'hover:bg-teal-100 dark:hover:bg-teal-800 text-teal-900 dark:text-white'
              }`}
            >
              <FaBlog size={18} className={`sm:w-5 sm:h-5 flex-shrink-0 group-hover:scale-110 transition-transform ${
                isActive('/gymblog') ? 'text-white' : 'text-teal-900 dark:text-white'
              }`} />
              {(isOpen || !collapsed) && <span className="font-semibold truncate">Blog</span>}
            </Link>
          )}
          {demo ? (
            <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-3 rounded-lg hover:teal-100 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
              <MdSupportAgent size={18} className="text-teal-900 dark:text-white" />
              {(isOpen || !collapsed) && <span className="font-semibold"> Tickets</span>}
            </div>
          ) : (
            <Link 
              to="/supporttickets" 
              className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg cursor-pointer text-sm transition-all duration-200 group ${
                isActive('/supporttickets')
                  ? 'bg-teal-500 dark:bg-teal-700 text-white shadow-lg'
                  : 'hover:bg-teal-100 dark:hover:bg-teal-800 text-teal-900 dark:text-white'
              }`}
            >
              <MdSupportAgent size={18} className={`sm:w-5 sm:h-5 flex-shrink-0 group-hover:scale-110 transition-transform ${
                isActive('/supporttickets') ? 'text-white' : 'text-teal-900 dark:text-white'
              }`} />
              {(isOpen || !collapsed) && <span className="font-semibold truncate">Support Tickets</span>}
            </Link>
          )}
          {demo ? (
            <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-3 rounded-lg hover:teal-100 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
              <SlSettings size={18} className="text-teal-900 dark:text-white" />
              {(isOpen || !collapsed) && <span className="font-semibold">Settings</span>}
            </div>
          ) : (
            <Link 
              to="/settings" 
              className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg cursor-pointer text-sm transition-all duration-200 group ${
                isActive('/settings')
                  ? 'bg-teal-500 dark:bg-teal-700 text-white shadow-lg'
                  : 'hover:bg-teal-100 dark:hover:bg-teal-800 text-teal-900 dark:text-white'
              }`}
            >
              <SlSettings size={18} className={`sm:w-5 sm:h-5 flex-shrink-0 group-hover:scale-110 transition-transform ${
                isActive('/settings') ? 'text-white' : 'text-teal-900 dark:text-white'
              }`} />
              {(isOpen || !collapsed) && <span className="font-semibold truncate">Settings</span>}
            </Link>
          )}
        </nav>

        <div className="mt-auto p-4 border-t border-teal-300 dark:border-teal-700">
          <div className={`${collapsed ? 'flex justify-center' : 'flex items-center gap-3'}`}>
            {(isOpen || !collapsed) && (
              <img
                src="https://i.pravatar.cc/40"
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            {(isOpen || !collapsed) && (
              <div>
                <p className="text-sm font-semibold text-teal-800">Priyanshu Gautam</p>
                <p className="text-xs text-teal-500">Admin</p>
              </div>
            )}
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className={`${collapsed ? '' : 'ml-auto'} p-2 rounded-md hover:bg-teal-200 transition-colors duration-200`}
              aria-label="Logout"
            >
              <LogOut size={20} className="text-teal-900" />
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
