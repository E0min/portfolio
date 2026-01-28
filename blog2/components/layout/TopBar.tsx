import React from 'react';

export const TopBar: React.FC = () => {
  return (
    <div className="border-b-2 border-black dark:border-white p-6 flex flex-wrap gap-4 items-center">
      <div className="flex-1 flex gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
        <div className="neo-border rounded-full px-4 py-1 flex items-center gap-2 text-sm whitespace-nowrap cursor-pointer hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
          <span className="material-icons text-base">language</span>
          English
          <span className="material-icons text-base">expand_more</span>
        </div>
        <div className="neo-border rounded-full px-4 py-1 flex items-center gap-2 text-sm whitespace-nowrap cursor-pointer hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
          <span className="material-icons text-base">settings_accessibility</span>
          Accessibility
          <span className="material-icons text-base">expand_more</span>
        </div>
      </div>
      
      <div className="w-full md:w-auto flex-shrink-0">
        <div className="relative group">
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full md:w-80 bg-primary/10 dark:bg-primary/20 border-2 border-black dark:border-white p-2 px-4 focus:ring-0 focus:border-primary placeholder-black/50 dark:placeholder-white/50 transition-all"
          />
          <span className="material-icons absolute right-3 top-2.5 group-focus-within:text-primary transition-colors">search</span>
        </div>
      </div>
    </div>
  );
};