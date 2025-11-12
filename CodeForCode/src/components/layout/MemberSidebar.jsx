import React, { useState, useEffect } from 'react'
import { LogOut, Dumbbell, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { memberMenuConfig, getMemberDropdownPaths } from '../../config/memberMenuConfig';

const MemberSidebar = ({ demo = false, isOpen, onClose, collapsed, onToggleCollapse, className }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { member, logout } = useAuth();

  // Dynamic state for dropdowns
  const [openDropdowns, setOpenDropdowns] = useState({});
  const dropdownPaths = getMemberDropdownPaths();

  // Helper function to check if a route is active
  const isActive = (path) => {
    if (path === '/member-dashboard') {
      return location.pathname === '/member-dashboard';
    }
    return location.pathname.startsWith(path);
  };

  // Toggle dropdown state
  const toggleDropdown = (id) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Auto-expand dropdowns based on current route
  useEffect(() => {
    const newOpenDropdowns = {};
    
    Object.keys(dropdownPaths).forEach(dropdownId => {
      const paths = dropdownPaths[dropdownId];
      const shouldOpen = paths.some(path => location.pathname.startsWith(path));
      if (shouldOpen) {
        newOpenDropdowns[dropdownId] = true;
      }
    });
    
    setOpenDropdowns(newOpenDropdowns);
  }, [location.pathname]);

  // Render menu item icon
  const renderIcon = (IconComponent, size = 18, isActive = false) => {
    if (!IconComponent) return null;
    return (
      <IconComponent
        size={size}
        className={`sm:w-5 sm:h-5 flex-shrink-0 group-hover:scale-110 transition-transform ${
          isActive ? 'text-white' : 'text-teal-900 dark:text-white'
        }`}
      />
    );
  };

  // Render a single menu link
  const renderLink = (item, isSubItem = false) => {
    const active = isActive(item.path);
    const IconComponent = item.icon;
    
    if (demo) {
      return (
        <div
          onClick={() => alert('This is a demo. Please login to access.')}
          className={`flex items-center gap-2 sm:gap-3 p-2 ${isSubItem ? '' : 'sm:p-3'} rounded-lg hover:bg-teal-50 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white transition-all duration-200 group`}
        >
          {renderIcon(IconComponent, isSubItem ? 16 : 18, false)}
          {(isOpen || !collapsed) && <span className="font-semibold truncate">{item.label}</span>}
        </div>
      );
    }

    return (
      <Link
        to={item.path}
        className={`flex items-center gap-2 sm:gap-3 p-2 ${isSubItem ? '' : 'sm:p-3'} rounded-lg cursor-pointer text-sm transition-all duration-200 group ${
          active
            ? isSubItem
              ? 'bg-teal-500/20 dark:bg-teal-700/50 text-teal-700 dark:text-teal-200 font-medium border-l-2 border-teal-500'
              : 'bg-teal-500 dark:bg-teal-700 text-white shadow-lg'
            : 'hover:bg-teal-100 dark:hover:bg-teal-800 text-teal-900 dark:text-white'
        }`}
      >
        {renderIcon(IconComponent, isSubItem ? 16 : 18, active && !isSubItem)}
        {(isOpen || !collapsed) && <span className="font-semibold truncate">{item.label}</span>}
      </Link>
    );
  };

  // Render dropdown menu
  const renderDropdown = (item) => {
    const IconComponent = item.icon;
    const isOpen = openDropdowns[item.id] || false;
    const hasActiveChild = item.children?.some(child => isActive(child.path));

    return (
      <div key={item.id}>
        <button
          type="button"
          className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-800 cursor-pointer text-sm text-teal-900 dark:text-white w-full transition-all duration-200 group"
          onClick={() => toggleDropdown(item.id)}
          aria-expanded={isOpen}
        >
          {renderIcon(IconComponent, 20, false)}
          {(isOpen || !collapsed) && <span className="font-semibold truncate">{item.label}</span>}
          {(isOpen || !collapsed) && (
            <svg
              className={`ml-auto transition-transform ${isOpen ? 'rotate-90' : ''}`}
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
        {isOpen && (isOpen || !collapsed) && item.children && (
          <div className="ml-4 sm:ml-8 flex flex-col gap-1 sm:gap-2 mt-1">
            {item.children.map(child => (
              <div key={child.id}>
                {renderLink(child, true)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Render menu item (link or dropdown)
  const renderMenuItem = (item) => {
    if (item.type === 'dropdown') {
      return renderDropdown(item);
    }
    return <div key={item.id}>{renderLink(item)}</div>;
  };

  return (
    <div className="shadow-xl">
      <aside
        className={`${className} flex flex-col h-screen overflow-hidden bg-white dark:bg-teal-800 border-r border-teal-200 dark:border-teal-700 shadow-2xl`}
      >
        {/* Header */}
        <div className="h-16 sm:h-17 flex items-center px-4 sm:px-6 justify-between border-b border-teal-200 dark:border-teal-700 bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-900 dark:to-teal-800">
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            {/* Logo Icon */}
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700 shadow-lg flex-shrink-0">
              <Dumbbell size={24} className="text-white" />
            </div>
            {(isOpen || !collapsed) && (
              <h1 className="font-extrabold text-xl sm:text-2xl text-teal-700 dark:text-white select-none truncate">
                <span className="hidden sm:inline">Member </span>
                <span className='text-teal-600 dark:text-teal-200'>Panel</span>
              </h1>
            )}
          </div>
          <div className="flex items-center gap-2">
            {/* Collapse Toggle Button */}
            <button
              onClick={onToggleCollapse}
              className="p-2 rounded-lg hover:bg-teal-200 dark:hover:bg-teal-700 transition-colors duration-200 flex-shrink-0"
              aria-label="Toggle sidebar collapse"
            >
              {collapsed ? (
                <ChevronRight size={20} className="text-teal-700 dark:text-white" />
              ) : (
                <ChevronLeft size={20} className="text-teal-700 dark:text-white" />
              )}
            </button>
            {isOpen && (
              <button
                onClick={onClose}
                className="md:hidden p-2 rounded-lg hover:bg-teal-200 dark:hover:bg-teal-700 transition-colors duration-200 flex-shrink-0"
                aria-label="Close sidebar"
              >
                <X size={20} className="text-teal-700 dark:text-white" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 sm:p-4 mt-4 sm:mt-6 flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-teal-300 dark:scrollbar-thumb-teal-600 scrollbar-track-transparent">
          <div className="space-y-2">
            {memberMenuConfig.map(item => renderMenuItem(item))}
          </div>
        </nav>

        {/* Footer */}
        <div className="mt-auto p-4 border-t border-teal-200 dark:border-teal-700 bg-teal-50/50 dark:bg-teal-900/50">
          <div className={`${collapsed ? 'flex justify-center' : 'flex items-center gap-4'}`}>
            {(isOpen || !collapsed) && (
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/40"
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-teal-200 dark:ring-teal-600"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-teal-800"></div>
              </div>
            )}
            {(isOpen || !collapsed) && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-teal-800 dark:text-teal-200 truncate">{member?.name || 'Member'}</p>
                <p className="text-xs text-teal-600 dark:text-teal-400">Member</p>
              </div>
            )}
            <button
              onClick={() => {
                logout();
                navigate('/member-login');
              }}
              className={`${collapsed ? '' : 'ml-auto'} p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 group`}
              aria-label="Logout"
            >
              <LogOut size={20} className="text-red-500 group-hover:text-red-600" />
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default React.memo(MemberSidebar);
