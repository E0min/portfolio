import React from 'react';

interface ThemeToggleProps {
  isDark: boolean;
  toggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, toggle }) => {
  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 bg-white dark:bg-black neo-border p-3 z-[60] hover:scale-110 transition-transform"
      aria-label="Toggle Dark Mode"
    >
      <span className={`material-icons ${isDark ? 'hidden' : 'block'}`}>dark_mode</span>
      <span className={`material-icons ${isDark ? 'block' : 'hidden'}`}>light_mode</span>
    </button>
  );
};