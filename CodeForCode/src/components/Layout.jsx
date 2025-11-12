import React, { useState } from 'react'
import Sidebar from './layout/Sidebar'
import Header from './layout/Header'
import Footer from './layout/Footer'

const Layout = ({children}) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleToggleCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-teal-900 text-foreground relative">
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      <div className="flex flex-col md:flex-row relative">
        {/* Fixed Sidebar - Desktop */}
        <Sidebar
          demo={false}
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
          collapsed={sidebarCollapsed}
          onToggleCollapse={handleToggleCollapse}
          className={`sticky top-0 left-0 z-50 h-screen transform transition-all duration-300 ease-in-out bg-teal-100 dark:bg-teal-900 shadow-xl ${
            isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:shadow-lg ${sidebarCollapsed ? 'md:w-20' : 'md:w-64'}`}
        />
        
        {/* Main Content Area - with proper margin for fixed sidebar */}
        <main className={`flex-1 w-full min-w-0 transition-all duration-300 ${
          sidebarCollapsed ? '' : ''
        }`}>
          <Header
            onMobileMenuToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            sidebarCollapsed={sidebarCollapsed}
            onToggleSidebar={handleToggleCollapse}
          />
          <div className="mt-16 md:mt-20 px-8 sm:px-6 lg:px-4 py- sm:py-6">
            {children}
          </div>
          <Footer/>
        </main>
      </div>
    </div>
  )
}

export default Layout