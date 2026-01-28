import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { MobileHeader } from './components/layout/MobileHeader';
import { Hero } from './components/sections/Hero';
import { Showcase } from './components/sections/Showcase';
import { Community } from './components/sections/Community';
import { Footer } from './components/layout/Footer';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { TopBar } from './components/layout/TopBar';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check system preference or localStorage on mount
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isSystemDark) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar for Desktop */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="lg:ml-64 flex-1 flex flex-col min-h-screen relative">
        {/* Mobile Header */}
        <MobileHeader onMenuClick={toggleMobileMenu} />
        
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
           <div className="lg:hidden fixed inset-0 z-40 bg-background-light dark:bg-background-dark p-8 flex flex-col">
              <div className="flex justify-between items-center mb-8">
                 <h2 className="text-2xl font-bold text-primary">Menu</h2>
                 <button onClick={toggleMobileMenu} className="material-icons text-3xl">close</button>
              </div>
              <nav className="space-y-6 text-2xl font-display font-bold">
                 <a href="#" className="block hover:text-primary" onClick={toggleMobileMenu}>Portfolio</a>
                 <a href="#" className="block hover:text-primary" onClick={toggleMobileMenu}>Journal</a>
                 <a href="#" className="block hover:text-primary" onClick={toggleMobileMenu}>Experiments</a>
                 <a href="#" className="block hover:text-primary" onClick={toggleMobileMenu}>Archive</a>
                 <a href="#" className="block hover:text-primary" onClick={toggleMobileMenu}>About</a>
              </nav>
           </div>
        )}

        {/* Top Bar with Search & Language */}
        <TopBar />

        {/* Content Sections */}
        <Hero />
        <Showcase />
        <Community />
        
        {/* Footer */}
        <Footer />

        {/* Sticky Bottom Banner */}
        <div className="bg-primary border-t-2 border-black p-4 flex justify-between items-center text-sm font-medium sticky bottom-0 z-30">
          <p>Looking for the legacy version? Find neo.js 1.0 here!</p>
          <button className="material-icons hover:opacity-70">close</button>
        </div>
      </main>

      {/* Floating Theme Toggle */}
      <ThemeToggle isDark={isDarkMode} toggle={toggleTheme} />
    </div>
  );
};

export default App;