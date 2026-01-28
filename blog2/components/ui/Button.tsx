import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, fullWidth = false, className = '', ...props }) => {
  return (
    <button
      className={`
        pill-button 
        border-1.5 border-black dark:border-white 
        rounded-full px-6 py-2 
        transition-all duration-200 ease-in-out
        inline-flex items-center gap-2
        hover:bg-black hover:text-white
        dark:hover:bg-white dark:hover:text-black
        ${fullWidth ? 'w-full justify-center' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};