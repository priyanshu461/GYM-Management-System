import React, { useState } from 'react'

import { Search, Bell, Menu, User, Settings, LogOut } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";


const Header = ({ onMobileMenuToggle, sidebarCollapsed }) => {
      const [query, setQuery] = useState("");
      const navigate = useNavigate();
      const { user, logout } = useAuth();
      const { theme } = useTheme();

  return (
    <div>
         <header className={`fixed top-0 ${sidebarCollapsed ? 'md:left-20' : 'md:left-64'} left-0 right-0 z-50 bg-card shadow-md flex items-center justify-between gap-4 mb-6 px-6 py-2 dark:bg-teal-900 dark:text-white`}>
            <div className="flex items-center gap-4">
              <button
                onClick={onMobileMenuToggle}
                className="md:hidden p-2 rounded-md hover:bg-slate-100 transition-colors duration-200"
                aria-label="Toggle sidebar"
              >
                <Menu size={20} className="text-slate-900" />
              </button>
              <div className="rounded-lg bg-white p-2 shadow-sm flex items-center gap-3">
                <Search size={16} />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search orders, products, customers..." className="outline-none text-sm w-80" />
              </div>


              <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
                <button className="px-3 py-2 rounded-lg hover:bg-slate-100">Export</button>
                <button className="px-3 py-2 rounded-lg hover:bg-slate-100">Filters</button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-600 dark:bg-gray-700 dark:text-teal-100 transition-colors duration-200 relative">
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border border-white dark:border-gray-700"></span>
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-3 cursor-pointer p-2 rounded-md hover:bg-slate-100 transition-colors duration-200">
                    <div className="text-right">
                      <div className="text-sm font-medium">{user?.name || 'Priyanshu Gautam'}</div>
                      <div className="text-xs text-slate-500">{user?.role || 'Admin'}</div>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-400 to-orange-900 flex items-center justify-center text-white font-semibold">
                      {(user?.name || 'Priyanshu Gautam').split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/Settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    logout();
                    navigate('/login');
                  }}>
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