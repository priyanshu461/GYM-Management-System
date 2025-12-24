import React, { useState } from 'react'
import Sidebar from './layout/Sidebar'
import Header from './layout/Header'
import Footer from './layout/Footer'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet"

const Layout = ({children}) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleToggleCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-teal-900 text-foreground relative">
      <div className="flex flex-col md:flex-row relative">
        {/* Mobile Sidebar - Sheet */}
        <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
          <SheetContent side="left" className="p-0 w-64 bg-teal-100 dark:bg-teal-900">
            <Sidebar
              demo={false}
              isOpen={true}
              onClose={() => setIsMobileSidebarOpen(false)}
              collapsed={false}
              onToggleCollapse={handleToggleCollapse}
              className="h-full"
            />
          </SheetContent>
        </Sheet>

        {/* Fixed Sidebar - Desktop */}
        <Sidebar
          demo={false}
          isOpen={true}
          onClose={() => setIsMobileSidebarOpen(false)}
          collapsed={sidebarCollapsed}
          onToggleCollapse={handleToggleCollapse}
          className={`hidden md:flex sticky top-0 left-0 z-50 h-screen bg-teal-100 dark:bg-teal-900 shadow-lg ${sidebarCollapsed ? 'md:w-20' : 'md:w-64'}`}
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