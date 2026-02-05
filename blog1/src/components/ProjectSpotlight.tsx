"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectItem {
    slug: string;
    title: string;
    description?: string;
    image?: string;
}

interface ProjectSpotlightProps {
    items: ProjectItem[];
}

const ProjectSpotlight: React.FC<ProjectSpotlightProps> = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        // Get relative position to the viewport or container?
        // Fixed position for the image usually works best for "follow cursor"
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            style={{ position: 'relative', width: '100%', padding: 'var(--spacing-lg) 0' }}
        >
            {/* List of Items */}
            <div className="spotlight-list">
                {items.map((item, index) => (
                    <Link
                        key={item.slug}
                        href={`/portfolio/${item.slug}`}
                        onMouseEnter={() => setActiveIndex(index)}
                        onMouseLeave={() => setActiveIndex(null)}
                        className="spotlight-item"
                        style={{
                            display: 'block',
                            padding: 'var(--spacing-md) 0',
                            borderBottom: 'var(--border-thin)',
                            textDecoration: 'none',
                            color: 'inherit',
                            position: 'relative',
                            zIndex: 2,
                            mixBlendMode: 'difference' // Cool effect if over image
                        }}
                    >
                        <h2 style={{
                            fontSize: '3rem',
                            margin: 0,
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            fontFamily: '"Pretendard", sans-serif',
                            mixBlendMode: 'difference',
                            color: '#fff' // Inverted because block is white? No, let's keep it simple first
                        }}>
                            <span style={{ fontSize: '1rem', verticalAlign: 'middle', marginRight: '20px', fontWeight: 'normal' }}>0{index + 1}</span>
                            {item.title}
                        </h2>
                        {item.description && (
                            <p style={{ margin: '5px 0 0 50px', fontSize: '1rem', color: '#888', mixBlendMode: 'difference' }}>
                                {item.description}
                            </p>
                        )}
                    </Link>
                ))}
            </div>

            {/* Floating Image */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 1,
                    overflow: 'hidden'
                }}
            >
                <AnimatePresence mode="wait">
                    {activeIndex !== null && items[activeIndex].image && (
                        <motion.img
                            key={items[activeIndex].slug}
                            src={items[activeIndex].image}
                            alt={items[activeIndex].title}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                x: mousePos.x - 200, // Center the image (assuming width 400)
                                y: mousePos.y - 150  // Center the image (assuming height 300)
                            }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 150, damping: 15 }}
                            style={{
                                position: 'absolute',
                                width: '400px',
                                height: 'auto',
                                maxWidth: '80vw',
                                maxHeight: '60vh',
                                objectFit: 'cover',
                                border: 'var(--border-thick)',
                                boxShadow: 'var(--shadow-hard)',
                                backgroundColor: '#fff'
                            }}
                        />
                    )}
                </AnimatePresence>
            </div>

            <style jsx>{`
                .spotlight-item {
                    transition: transform 0.2s;
                }
                .spotlight-item:hover {
                    opacity: 0.8; /* Slight dim */
                    transform: translateX(20px);
                }
                .spotlight-item h2 {
                    color: black;
                }
                /* Ensure text is visible over image if image is big */
            `}</style>
        </div>
    );
};

export default ProjectSpotlight;
