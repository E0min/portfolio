'use client';

import React, { useState, useEffect } from 'react';

interface DemoPreviewProps {
    href: string;
    children: React.ReactNode;
}

export default function DemoPreview({ href, children }: DemoPreviewProps) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                style={{
                    display: 'inline-block',
                    padding: 'var(--spacing-sm) var(--spacing-md)',
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    border: 'var(--border-thick)',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    boxShadow: 'var(--shadow-hard)',
                    transition: 'transform 0.1s',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translate(-2px, -2px)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translate(0, 0)';
                }}
            >
                {children}
            </button>

            {isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 'var(--spacing-lg)',
                    }}
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            maxWidth: '1400px',
                            maxHeight: '900px',
                            backgroundColor: 'white',
                            border: 'var(--border-thick)',
                            boxShadow: 'var(--shadow-hard)',
                            overflow: 'auto',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{
                                position: 'absolute',
                                top: '-40px',
                                right: '0',
                                padding: 'var(--spacing-sm) var(--spacing-md)',
                                backgroundColor: 'var(--color-primary)',
                                color: 'white',
                                border: 'var(--border-thick)',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                boxShadow: 'var(--shadow-hard)',
                                zIndex: 10000,
                            }}
                        >
                            ✕ 닫기 (ESC)
                        </button>
                        <iframe
                            src={href}
                            style={{
                                width: '100%',
                                height: '100%',
                                minHeight: '900px',
                                border: 'none',
                            }}
                            title="Demo Preview"
                        />
                    </div>
                </div>
            )}
        </>
    );
}
