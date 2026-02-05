"use client";

import React from "react";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    strength?: number; // Kept for compatibility but unused
    style?: React.CSSProperties;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
    children,
    className = "",
    onClick,
    style
}) => {
    // Magnetic/Sticky effect removed by user request
    return (
        <div
            className={className}
            onClick={onClick}
            style={style}
        >
            {children}
        </div>
    );
};

export default MagneticButton;
