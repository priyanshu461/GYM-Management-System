import React, { useState } from 'react'
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
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = ({ demo = false, isOpen, onClose, collapsed, onToggleCollapse, className }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [managementOpen, setManagementOpen] = useState(false);
  const [workoutOpen, setWorkoutOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);

  return (
    <div>
      <aside
        className={`${className} ${collapsed ? 'md:w-20' : 'md:w-64'} flex flex-col sticky h-screen top-0`}
      >
        <div className="h-18 flex items-center px-4 justify-between border-b border-teal-300 dark:border-teal-700">
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleCollapse}
              className="md:flex hidden p-2 rounded-md hover:bg-teal-200 dark:hover:bg-teal-800 transition-colors duration-200"
              aria-label="Toggle sidebar"
            >
              <Menu size={20} className="text-teal-900 dark:text-white" />
            </button>
            {(isOpen || !collapsed) && (
              <h1 className="font-extrabold text-xl text-teal-600 dark:text-white select-none">Admin <span className='text-teal-900 dark:text-white'>Panel</span></h1>
            )}
          </div>
          {(isOpen || !collapsed) && <div className="text-xs text-teal-500 select-none"></div>}
          {isOpen && <button onClick={onClose} className="md:hidden p-2 rounded-md hover:bg-teal-200"><X size={20} /></button>}
        </div>

        <nav className="p-3 mt-4 flex-1 overflow-y-auto">
          {demo ? (
            <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-3 rounded-lg hover:teal-100 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
              <LayoutDashboardIcon size={20} className="text-teal-900 dark:text-white" />
              {(isOpen || !collapsed) && <span className="font-semibold">Dashboard</span>}
            </div>
          ) : (
            <Link to="/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:teal-100 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
              <LayoutDashboardIcon size={20} className="text-teal-900 dark:text-white" />
              {(isOpen || !collapsed) && <span className="font-semibold">Dashboard</span>}
            </Link>
          )}

          {/* Management Dropdown */}
          <div>
            <button
              type="button"
              className="flex items-center gap-3 p-3 rounded-lg hover:teal-100 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white w-full transition-colors duration-200"
              onClick={() => setManagementOpen((open) => !open)}
              aria-expanded={managementOpen}
            >
              <Laptop2 size={20} className="text-teal-600 dark:text-white" />
              {(isOpen || !collapsed) && <span className="font-semibold">Management</span>}
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
              <div className="ml-8 flex flex-col gap-2 mt-1">
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <MdGroup size={18} className="text-teal-900 dark:text-white" />
                    <span>Members Management</span>
                  </div>
                ) : (
                  <Link to="/members" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <MdGroup size={18} className="text-teal-900 dark:text-white" />
                    <span>Members Management</span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <FaUserTie size={18} className="text-teal-900 dark:text-white" />
                    <span>Trainer</span>
                  </div>
                ) : (
                  <Link to="/trainers" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <FaUserTie size={18} className="text-teal-900 dark:text-white" />
                    <span>Trainers</span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <TfiWallet size={18} className="text-teal-900 dark:text-white" />
                    <span>Finance</span>
                  </div>
                ) : (
                  <Link to="/finance" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <TfiWallet size={18} className="text-teal-900 dark:text-white" />
                    <span>Finance</span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <BsFillBox2HeartFill size={18} className="text-teal-900 dark:text-white" />
                    <span>Facilities</span>
                  </div>
                ) : (
                  <Link to="/facilities" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <BsFillBox2HeartFill size={18} className="text-teal-900 dark:text-white" />
                    <span>Facilities</span>
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Workout & Diet plans Dropdown */}
          <div>
            <button
              type="button"
              className="flex items-center gap-3 p-3 rounded-lg hover:teal-100 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white w-full transition-colors duration-200"
              onClick={() => setWorkoutOpen((open) => !open)}
              aria-expanded={workoutOpen}
            >
              <BiDumbbell size={20} className="text-teal-600 dark:text-white" />
              {(isOpen || !collapsed) && <span className="font-semibold">Workout & Diet</span>}
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
              <div className="ml-8 flex flex-col gap-2 mt-1">
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <BsClockHistory size={18} className="text-teal-900 dark:text-white" />
                    <span>Workout Routines</span>
                  </div>
                ) : (
                  <Link to="/workoutRoutinue" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <BsClockHistory size={18} className="text-teal-900 dark:text-white" />
                    <span>Workout Routines</span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <TbReportAnalytics size={18} className="text-teal-900 dark:text-white" />
                    <span>BMI Calculator</span>
                  </div>
                ) : (
                  <Link to="/bmiCalculator" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <TbReportAnalytics size={18} className="text-teal-900 dark:text-white" />
                    <span>BMI Calculator</span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <TbReportAnalytics size={18} className="text-teal-900 dark:text-white" />
                    <span>Custom Diet </span>
                  </div>
                ) : (
                  <Link to="/dietPlan" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <TbReportAnalytics size={18} className="text-teal-900 dark:text-white" />
                    <span>Custom Diet </span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <GiProgression size={18} className="text-teal-900 dark:text-white" />
                    <span>Progress Tracking</span>
                  </div>
                ) : (
                  <Link to="/progressTracking" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <GiProgression size={18} className="text-teal-900 dark:text-white" />
                    <span>Progress Tracking</span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <TbReportSearch size={18} className="text-teal-900 dark:text-white" />
                    <span>Reports / Analytics</span>
                  </div>
                ) : (
                  <Link to="/reportsAnalytics" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <TbReportSearch size={18} className="text-teal-900 dark:text-white" />
                    <span>Reports / Analytics</span>
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Our Services Dropdown */}
          <div>
            <button
              type="button"
              className="flex items-center gap-3 p-3 rounded-lg hover:teal-100 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white w-full transition-colors duration-200"
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
              <div className="ml-8 flex flex-col gap-2 mt-1">
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <SiGoogleclassroom size={18} className="text-teal-900 dark:text-white" />
                    <span>Classes & Schedules</span>
                  </div>
                ) : (
                  <Link to="/classesSchedule" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <SiGoogleclassroom size={18} className="text-teal-900 dark:text-white" />
                    <span>Classes & Schedules</span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <AiOutlineAudit size={18} className="text-teal-900 dark:text-white" />
                    <span>Courses</span>
                  </div>
                ) : (
                  <Link to="/courses" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <AiOutlineAudit size={18} className="text-teal-900 dark:text-white" />
                    <span>Courses</span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <GiGymBag size={18} className="text-teal-900 dark:text-white" />
                    <span>Franchise & Members Managementhips</span>
                  </div>
                ) : (
                  <Link to="/FranchiseAndMembership" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <GiGymBag size={18} className="text-teal-900 dark:text-white" />
                    <span>Franchise & Members Managementhips</span>
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
              className="flex items-center gap-3 p-3 rounded-lg hover:teal-100 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white w-full transition-colors duration-200"
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
              <div className="ml-8 flex flex-col gap-2 mt-1">
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <GiFruitBowl size={18} className="text-teal-900 dark:text-white" />
                    <span>Protein</span>
                  </div>
                ) : (
                  <Link to="/Protein" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <GiFruitBowl size={18} className="text-teal-900 dark:text-white" />
                    <span>Protein</span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <Dumbbell size={20} className="text-teal-900 dark:text-white" />
                    <span>Pre, Intra & Post-Workout Suppliments</span>
                  </div>
                ) : (
                  <Link to="/Suppliments" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <Dumbbell size={20} className="text-teal-900 dark:text-white" />
                    <span>Pre, Intra & Post-Workout Suppliments</span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <AiTwotoneRest size={18} className="text-teal-900 dark:text-white" />
                    <span>Amino Acids Suppliments</span>
                  </div>
                ) : (
                  <Link to="/AminoAcidSuppliments" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
                    <AiTwotoneRest size={18} className="text-teal-900 dark:text-white" />
                    <span>Amino Acids Suppliments</span>
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
                )}
              </div>
            )}
          </div>
          <Link to="/NotificationCommunication">
            <a
            className="flex items-center gap-3 p-3 rounded-lg hover:teal-100 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200"
            href="#"
          >
            <MdNotificationAdd size={18} className="text-teal-900 dark:text-white" />
            {(isOpen || !collapsed) && <span className="font-semibold">Notifications</span>}
          </a>
          </Link>
          {demo ? (
            <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-3 rounded-lg hover:teal-100 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
              <FaBlog size={18} className="text-teal-900 dark:text-white" />
              {(isOpen || !collapsed) && <span className="font-semibold"> Blog</span>}
            </div>
          ) : (
            <Link to="/GymBlog" className="flex items-center gap-3 p-3 rounded-lg hover:teal-100 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
              <FaBlog size={18} className="text-teal-900 dark:text-white" />
              {(isOpen || !collapsed) && <span className="font-semibold"> Blog</span>}
            </Link>
          )}
          {demo ? (
            <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-3 rounded-lg hover:teal-100 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
              <MdSupportAgent size={18} className="text-teal-900 dark:text-white" />
              {(isOpen || !collapsed) && <span className="font-semibold">Support Tickets</span>}
            </div>
          ) : (
            <Link to="/supportTickets" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
              <MdSupportAgent size={18} className="text-teal-900 dark:text-white" />
              {(isOpen || !collapsed) && <span className="font-semibold">Support Tickets</span>}
            </Link>
          )}
          {demo ? (
            <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-3 rounded-lg hover:teal-100 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
              <SlSettings size={18} className="text-teal-900 dark:text-white" />
              {(isOpen || !collapsed) && <span className="font-semibold">Settings</span>}
            </div>
          ) : (
            <Link to="/Settings" className="flex items-center gap-3 p-3 rounded-lg hover:teal-100 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-colors duration-200">
              <SlSettings size={18} className="text-teal-900 dark:text-white" />
              {(isOpen || !collapsed) && <span className="font-semibold">Settings</span>}
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
