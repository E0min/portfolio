"use client";

import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);
    const [clicking, setClicking] = useState(false);

    useEffect(() => {
        const addEventListeners = () => {
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mousedown", onMouseDown);
            document.addEventListener("mouseup", onMouseUp);
        };

        const removeEventListeners = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("mouseup", onMouseUp);
        };

        const onMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setVisible(true);
        };

        const onMouseDown = () => {
            setClicking(true);
        };

        const onMouseUp = () => {
            setClicking(false);
        };

        // Only activate on devices with fine pointers (mouse)
        if (window.matchMedia("(pointer: fine)").matches) {
            addEventListeners();
        }

        return () => {
            removeEventListeners();
        };
    }, []);

    if (!visible) return null;

    return (
        <>
            <div
                className="custom-cursor"
                style={{
                    transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${clicking ? 0.8 : 1})`,
                }}
            />
            <style jsx global>{`
                @media (pointer: fine) {
                    body {
                        cursor: none;
                    }
                    a, button, input, textarea {
                        cursor: none; /* Hide default pointer on interactive elements too */
                    }
                }

                .custom-cursor {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 30px;
                    height: 30px;
                    margin-left: -15px; /* Center offset */
                    margin-top: -15px; /* Center offset */
                    background-color: white;
                    border-radius: 50%;
                    pointer-events: none;
                    mix-blend-mode: difference;
                    z-index: 10000;
                    transition: transform 0.1s ease-out; /* Smooth follow with slight delay/momentum feel */
                    will-change: transform;
                }
            `}</style>
        </>
    );
};

export default CustomCursor;
