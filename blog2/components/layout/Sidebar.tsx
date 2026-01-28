import React from 'react';
import { NAV_LINKS } from '../../constants';
import { Button } from '../ui/Button';

export const Sidebar: React.FC = () => {
  return (
    <aside className="fixed top-0 left-0 h-full w-64 border-r-2 border-black dark:border-white bg-background-light dark:bg-background-dark z-50 hidden lg:flex flex-col p-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-primary flex items-center">
          NEO* <span className="text-xs ml-2 text-black dark:text-white font-normal uppercase tracking-widest">v2.0</span>
        </h1>
      </div>
      
      <nav className="flex-grow space-y-4">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="block text-lg font-medium hover:text-primary transition-colors"
          >
            {link.label}
          </a>
        ))}
      </nav>
      
      <div className="mt-auto space-y-4">
        <Button fullWidth>
          <span className="material-icons text-sm">code</span>
          Start Coding
        </Button>
        <Button fullWidth>
          <span className="material-icons text-sm">favorite_border</span>
          Sponsor
        </Button>
      </div>
    </aside>
  );
};