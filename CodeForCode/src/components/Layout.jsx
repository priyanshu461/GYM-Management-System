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
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      <div className="flex">
        <Sidebar
          demo={false}
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
          collapsed={sidebarCollapsed}
          onToggleCollapse={handleToggleCollapse}
          className={`fixed inset-0 z-50 w-64 h-full transform -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out bg-teal-100 dark:bg-teal-900 shadow-lg`}
        />
        <main className={`flex-1 py-6 pr-6 pl-6  relative z-10 w-full pt-5`}>
          <Header
            onMobileMenuToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            sidebarCollapsed={sidebarCollapsed}
          />
          <div className="mt-16">
            {children}
          </div>
          <Footer/>
        </main>
      </div>
    </div>
  )
}

export default Layout