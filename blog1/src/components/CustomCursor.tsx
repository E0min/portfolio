"use client";

import React, { useEffect, useState } from 'react';
import { useStickyCursor } from '@/context/StickyCursorContext';
import { motion, useMotionValue, useSpring } from 'motion/react';

const CustomCursor = () => {
    const { stickyElement } = useStickyCursor();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);
    const [clicking, setClicking] = useState(false);

    // Use motion values for smooth physics-based movement
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            setVisible(true);
        };
        const onMouseDown = () => setClicking(true);
        const onMouseUp = () => setClicking(false);

        if (window.matchMedia("(pointer: fine)").matches) {
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mousedown", onMouseDown);
            document.addEventListener("mouseup", onMouseUp);
        }

        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("mouseup", onMouseUp);
        };
    }, []);

    useEffect(() => {
        if (stickyElement) {
            // Magnetic Logic: Pull towards center
            const { left, top, width, height } = stickyElement.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;

            // Calculate distance from center
            const dist = {
                x: mousePos.x - centerX,
                y: mousePos.y - centerY
            };

            // Apply magnetic dampening (cursor moves less than mouse)
            // Factor 0.1 means very strong pull (cursor moves 10% of mouse movement from center)
            const targetX = centerX + dist.x * 0.1;
            const targetY = centerY + dist.y * 0.1;

            cursorX.set(targetX);
            cursorY.set(targetY);
        } else {
            // Standard Follow
            cursorX.set(mousePos.x);
            cursorY.set(mousePos.y);
        }
    }, [mousePos, stickyElement, cursorX, cursorY]);

    if (!visible) return null;

    return (
        <>
            <motion.div
                className="custom-cursor"
                style={{
                    x: springX,
                    y: springY,
                    scale: clicking ? 0.8 : (stickyElement ? 1.5 : 1), // Scale up when sticky
                }}
            />
            <style jsx global>{`
                @media (pointer: fine) {
                    body { cursor: none; }
                    a, button, input, textarea { cursor: none; }
                }

                .custom-cursor {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 30px;
                    height: 30px;
                    margin-left: -15px;
                    margin-top: -15px;
                    background-color: white;
                    border-radius: 50%;
                    pointer-events: none;
                    mix-blend-mode: difference;
                    z-index: 10000;
                    /* Transition handled by framer-motion */
                }
            `}</style>
        </>
    );
};

export default CustomCursor;
