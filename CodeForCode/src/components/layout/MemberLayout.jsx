import React, { useState, useCallback, useMemo } from 'react';
import MemberSidebar from './MemberSidebar';

const MemberLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleCollapse = useCallback(() => {
    setCollapsed(prev => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  console.log(collapsed);
  

  const sidebarProps = useMemo(() => ({
    isOpen,
    onClose: handleClose,
    collapsed,
    onToggleCollapse: handleToggleCollapse,
    className: `sticky top-0 left-0 z-40 h-screen transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`,
  }), [isOpen, collapsed, handleToggleCollapse, handleClose]);

  return (
    <div className="min-h-screen flex">
      <MemberSidebar {...sidebarProps} />
      <div className="flex-1 transition-all duration-300">
        {children}
      </div>
    </div>
  );
};

export default MemberLayout;
