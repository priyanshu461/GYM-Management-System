import React, { useState } from 'react'
import { Menu, LogOut, LayoutDashboardIcon, Dumbbell, Laptop2 } from "lucide-react";
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

const Sidebar = ({ demo = false }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [managementOpen, setManagementOpen] = useState(false);
  const [workoutOpen, setWorkoutOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);

  return (
    <div>
      <aside
        className={`transition-all duration-300 bg-gradient-to-b from-teal to-teal-100 border-r border-teal-200 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } shadow-lg h-screen sticky top-0 flex flex-col`}
      >
        <div className="h-18 flex items-center px-4 justify-between border-b border-teal-300">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((s) => !s)}
              className="p-2 rounded-md hover:bg-teal-200 transition-colors duration-200"
              aria-label="Toggle sidebar"
            >
              <Menu size={20} className="text-teal-900" />
            </button>
            {sidebarOpen && (
              <h1 className="font-extrabold text-xl text-teal-600 select-none">Admin <span className='text-teal-900'>Panel</span></h1>
            )}
          </div>
          {sidebarOpen && <div className="text-xs text-teal-500 select-none">v1.0</div>}
        </div>

        <nav className="p-3 mt-4 flex-1 overflow-y-auto">
          {demo ? (
            <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-3 rounded-lg hover:teal-100 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
              <LayoutDashboardIcon size={20} className="text-teal-900" />
              {sidebarOpen && <span className="font-semibold">Dashboard</span>}
            </div>
          ) : (
            <Link to="/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:teal-100 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
              <LayoutDashboardIcon size={20} className="text-teal-900" />
              {sidebarOpen && <span className="font-semibold">Dashboard</span>}
            </Link>
          )}

          {/* Management Dropdown */}
          <div>
            <button
              type="button"
              className="flex items-center gap-3 p-3 rounded-lg hover:teal-100 cursor-pointer text-sm text-teal-900 w-full transition-colors duration-200"
              onClick={() => setManagementOpen((open) => !open)}
              aria-expanded={managementOpen}
            >
              <Laptop2 size={20} className="teteal-600" />
              {sidebarOpen && <span className="font-semibold">Management</span>}
              {sidebarOpen && (
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
              {managementOpen && sidebarOpen && (
              <div className="ml-8 flex flex-col gap-2 mt-1">
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
                    <MdGroup size={18} />
                    <span>Members Management</span>
                  </div>
                ) : (
                  <Link to="/members" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
                    <MdGroup size={18} />
                    <span>Members Management</span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
                    <FaUserTie size={18} />
                    <span>Trainer</span>
                  </div>
                ) : (
                  <Link to="/trainers" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
                    <FaUserTie size={18} />
                    <span>Trainers</span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
                    <TfiWallet size={18} />
                    <span>Finance</span>
                  </div>
                ) : (
                  <Link to="/finance" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
                    <TfiWallet size={18} />
                    <span>Finance</span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
                    <BsFillBox2HeartFill size={18} />
                    <span>Facilities</span>
                  </div>
                ) : (
                  <Link to="/facilities" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
                    <BsFillBox2HeartFill size={18} />
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
              className="flex items-center gap-3 p-3 rounded-lg hover:teal-100 cursor-pointer text-sm text-teal-900 w-full transition-colors duration-200"
              onClick={() => setWorkoutOpen((open) => !open)}
              aria-expanded={workoutOpen}
            >
              <BiDumbbell size={20} className="teteal-600" />
              {sidebarOpen && <span className="font-semibold">Workout & Diet</span>}
              {sidebarOpen && (
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
            {workoutOpen && sidebarOpen && (
              <div className="ml-8 flex flex-col gap-2 mt-1">
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
                    <BsClockHistory size={18} />
                    <span>Workout Routines</span>
                  </div>
                ) : (
                  <Link to="/workoutRoutinue" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
                    <BsClockHistory size={18} />
                    <span>Workout Routines</span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
                    <TbReportAnalytics size={18} />
                    <span>Custom Diet</span>
                  </div>
                ) : (
                  <Link to="/dietPlan" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
                    <TbReportAnalytics size={18} />
                    <span>Custom Diet </span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
                    <GiProgression size={18} />
                    <span>Progress Tracking</span>
                  </div>
                ) : (
                  <Link to="/progressTracking" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
                    <GiProgression size={18} />
                    <span>Progress Tracking</span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
                    <TbReportSearch size={18} />
                    <span>Reports / Analytics</span>
                  </div>
                ) : (
                  <Link to="/reportsAnalytics" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
                    <TbReportSearch size={18} />
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
              className="flex items-center gap-3 p-3 rounded-lg hover:teal-100 cursor-pointer text-sm text-teal-900 w-full transition-colors duration-200"
              onClick={() => setServiceOpen((open) => !open)}
              aria-expanded={serviceOpen}
            >
              <LuFolderCog size={20} className="text-teal-900" />
              {sidebarOpen && <span className="font-semibold">Services</span>}
              {sidebarOpen && (
                <svg
                  className={`ml-auto transition-transform ${serviceOpen ? 'rotate-90' : ''}`}
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
            {serviceOpen && sidebarOpen && (
              <div className="ml-8 flex flex-col gap-2 mt-1">
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
                    <SiGoogleclassroom size={18} />
                    <span>Classes & Schedules</span>
                  </div>
                ) : (
                  <Link to="/classesSchedule" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
                    <SiGoogleclassroom size={18} />
                    <span>Classes & Schedules</span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
                    <AiOutlineAudit size={18} />
                    <span>Courses</span>
                  </div>
                ) : (
                  <Link to="/courses" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
                    <AiOutlineAudit size={18} />
                    <span>Courses</span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
                    <GiGymBag size={18} />
                    <span>Franchise & Members Managementhips</span>
                  </div>
                ) : (
                  <Link to="/FranchiseAndMembership" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
                    <GiGymBag size={18} />
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
              {sidebarOpen && <span className="font-semibold">Authentication</span>}
              {sidebarOpen && (
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
            {authenticationOpen && sidebarOpen && (
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
              className="flex items-center gap-3 p-3 rounded-lg hover:teal-100 cursor-pointer text-sm text-teal-900 w-full transition-colors duration-200"
              onClick={() => setProductOpen((open) => !open)}
              aria-expanded={productOpen}
            >
              <FaCartPlus size={20} className="teteal-600" />
              {sidebarOpen && <span className="font-semibold">Products</span>}
              {sidebarOpen && (
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
            {productOpen && sidebarOpen && (
              <div className="ml-8 flex flex-col gap-2 mt-1">
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
                    <GiFruitBowl size={18} />
                    <span>Protein</span>
                  </div>
                ) : (
                  <Link to="/Protein" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
                    <GiFruitBowl size={18} />
                    <span>Protein</span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
                    <Dumbbell size={20} />
                    <span>Pre, Intra & Post-Workout Suppliments</span>
                  </div>
                ) : (
                  <Link to="/Suppliments" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
                    <Dumbbell size={20} />
                    <span>Pre, Intra & Post-Workout Suppliments</span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
                    <AiTwotoneRest size={18} />
                    <span>Amino Acids Suppliments</span>
                  </div>
                ) : (
                  <Link to="/AminoAcidSuppliments" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
                    <AiTwotoneRest size={18} />
                    <span>Amino Acids Suppliments</span>
                  </Link>
                )}
                {demo ? (
                  <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
                    <FaCapsules size={18} />
                    <span>Multivitamins & Minerals</span>
                  </div>
                ) : (
                  <Link to="/MultivitaminAndMinerals" className="flex items-center gap-3 p-2 rounded-lg hover:teal-50 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
                    <FaCapsules size={18} />
                    <span>Multivitamins & Minerals</span>
                  </Link>
                )}
              </div>
            )}
          </div>
          <Link to="/NotificationCommunication">
            <a
            className="flex items-center gap-3 p-3 rounded-lg hover:teal-100 cursor-pointer text-sm text-teal-900 transition-colors duration-200"
            href="#"
          >
            <MdNotificationAdd size={18} />
            {sidebarOpen && <span className="font-semibold">Notifications</span>}
          </a>
          </Link>
          {demo ? (
            <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-3 rounded-lg hover:teal-100 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
              <FaBlog size={18} />
              {sidebarOpen && <span className="font-semibold"> Blog</span>}
            </div>
          ) : (
            <Link to="/GymBlog" className="flex items-center gap-3 p-3 rounded-lg hover:teal-100 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
              <FaBlog size={18} />
              {sidebarOpen && <span className="font-semibold"> Blog</span>}
            </Link>
          )}
          {demo ? (
            <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-3 rounded-lg hover:teal-100 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
              <MdSupportAgent size={18} />
              {sidebarOpen && <span className="font-semibold">Support Tickets</span>}
            </div>
          ) : (
            <Link to="/supportTickets" className="flex items-center gap-3 p-3 rounded-lg hover:teal-100 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
              <MdSupportAgent size={18} />
              {sidebarOpen && <span className="font-semibold">Support Tickets</span>}
            </Link>
          )}
          {demo ? (
            <div onClick={() => alert('This is a demo. Please login to access.')} className="flex items-center gap-3 p-3 rounded-lg hover:teal-100 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
              <SlSettings size={18} />
              {sidebarOpen && <span className="font-semibold">Settings</span>}
            </div>
          ) : (
            <Link to="/Settings" className="flex items-center gap-3 p-3 rounded-lg hover:teal-100 cursor-pointer text-sm text-teal-900 transition-colors duration-200">
              <SlSettings size={18} />
              {sidebarOpen && <span className="font-semibold">Settings</span>}
            </Link>
          )}
        </nav>

        <div className="mt-auto p-4 border-t border-teal-300">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40"
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            {sidebarOpen && (
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
              className="ml-auto p-2 rounded-md hover:bg-teal-200 transition-colors duration-200"
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
