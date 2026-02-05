"use client";

import React from 'react';
import MagneticButton from '@/components/MagneticButton';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    className?: string; // Allow extending classes
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
    // We can add variant logic here if needed, currently using base neo-button
    const baseClass = "neo-button";
    const finalClass = `${baseClass} ${className}`;

    return (
        <MagneticButton style={{ display: 'inline-block' }}>
            <button className={finalClass} {...props}>
                {children}
            </button>
        </MagneticButton>
    );
};

export default Button;
