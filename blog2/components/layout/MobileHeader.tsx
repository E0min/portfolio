import React from 'react';

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="lg:hidden sticky top-0 bg-background-light dark:bg-background-dark border-b-2 border-black dark:border-white p-4 flex justify-between items-center z-50">
      <h1 className="text-2xl font-bold text-primary">NEO*</h1>
      <button onClick={onMenuClick} className="material-icons">menu</button>
    </header>
  );
};