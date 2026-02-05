"use client";

import { motion } from 'motion/react';
import React, { useRef } from 'react';

interface DraggableCardProps {
    children: React.ReactNode;
    className?: string; // Allow extending classes
}

const DraggableCard: React.FC<DraggableCardProps> = ({ children, className = '' }) => {
    const constraintsRef = useRef(null);

    return (
        <motion.div
            className={`draggable-card-wrapper ${className}`}
            drag
            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
            dragElastic={0.2}
            whileDrag={{ scale: 1.05, cursor: 'grabbing', zIndex: 50 }}
            whileHover={{ scale: 1.02 }}
            style={{
                cursor: 'grab',
                position: 'relative',
                touchAction: 'none' // Important for drag on touch devices
            }}
        >
            {children}
        </motion.div>
    );
};

export default DraggableCard;
