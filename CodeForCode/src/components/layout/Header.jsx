import React, { useState } from 'react'

import { Search, Bell, Menu, User, Settings, LogOut, Moon, Sun, Dumbbell, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";


const Header = ({ onMobileMenuToggle, sidebarCollapsed, onToggleSidebar }) => {
      const [query, setQuery] = useState("");
      const navigate = useNavigate();
      const { user, logout } = useAuth();
      const { theme, toggleTheme } = useTheme();

  return (
    <div>
         <header className={`fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-teal-900/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-teal-700/50 flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4 md:px-6 sm:py-2 transition-all duration-300 ${sidebarCollapsed ? 'md:left-20' : 'md:left-64'}`}>
            <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
              {/* Mobile Menu Toggle */}
              <button
                onClick={onMobileMenuToggle}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-teal-800 transition-colors duration-200 flex-shrink-0"
                aria-label="Toggle sidebar"
              >
                 <Menu size={20} className="text-gray-700 dark:text-white" />
              </button>

              {/* Desktop Sidebar Toggle */}
              {onToggleSidebar && (
                <button
                  onClick={onToggleSidebar}
                  className="hidden md:flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-teal-800 transition-colors duration-200 flex-shrink-0"
                  aria-label="Toggle sidebar"
                >
                  {sidebarCollapsed ? (
                    <ChevronRight size={20} className="text-gray-700 dark:text-white" />
                  ) : (
                    <ChevronLeft size={20} className="text-gray-700 dark:text-white" />
                  )}
                </button>
              )}

              {/* Logo */}
              
              
              {/* Search Bar - Responsive */}
              <div className=" sm:flex rounded-xl bg-gray-50 dark:bg-teal-800/50 p-2 shadow-sm border border-gray-200/50 dark:border-teal-700/50 flex items-center gap-2 flex-1 max-w-md ml-2">
                <Search size={16} className="text-gray-400 dark:text-teal-300 flex-shrink-0" />
                <input 
                  value={query} 
                  onChange={(e) => setQuery(e.target.value)} 
                  placeholder="Search..." 
                  className="outline-none text-sm bg-transparent text-gray-700 dark:text-white placeholder:text-gray-400 dark:placeholder:text-teal-400 w-full min-w-0" 
                />
              </div>

              {/* Mobile Search Icon */}
              <button className="sm:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-teal-800 transition-colors duration-200">
                <Search size={18} className="text-gray-700 dark:text-white" />
              </button>

              {/* Action Buttons - Hidden on mobile */}
              <div className="hidden lg:flex items-center gap-2 text-sm text-gray-600 dark:text-teal-300">
                <button className="px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-teal-800 transition-colors duration-200 font-medium">Export</button>
                <button className="px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-teal-800 transition-colors duration-200 font-medium">Filters</button>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg ${theme === 'dark' ? 'bg-teal-700 text-teal-100 hover:bg-teal-600' : 'bg-teal-500 text-white hover:bg-teal-600'}`}
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={18} className="sm:w-5 sm:h-5" /> : <Sun size={18} className="sm:w-5 sm:h-5" />}
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-teal-800 transition-colors duration-200 relative flex-shrink-0">
                <Bell size={18} className="sm:w-5 sm:h-5 text-gray-700 dark:text-white" />
                <span className="absolute top-1 right-1 h-2 w-2 sm:h-2.5 sm:w-2.5 bg-red-500 rounded-full border-2 border-white dark:border-teal-900"></span>
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 sm:gap-3 cursor-pointer p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-teal-800 transition-colors duration-200 flex-shrink-0">
                    <div className="hidden sm:block text-right">
                      <div className="text-xs sm:text-sm font-medium text-gray-700 dark:text-white leading-tight">{user?.name?.split(' ')[0] || 'User'}</div>
                      <div className="text-[10px] sm:text-xs text-gray-500 dark:text-teal-400 leading-tight">{user?user.user_type : 'Admin'}</div>
                    </div>
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700 flex items-center justify-center text-white font-semibold text-xs sm:text-sm shadow-md">
                      {(user?.name || 'U').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 sm:w-56">
                  <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    logout();
                    navigate('/login');
                  }} className="cursor-pointer text-red-600 dark:text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    LogOut
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
    </div>
  )
}

export default Header