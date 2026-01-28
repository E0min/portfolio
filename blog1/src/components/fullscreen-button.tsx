'use client';

import React from 'react';
import DemoPreview from './demo-preview';

interface FullscreenButtonProps {
    href: string;
}

export default function FullscreenButton({ href }: FullscreenButtonProps) {
    return (
        <div style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 10,
        }}>
            <DemoPreview href={href}>
                <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                    </svg>
                    전체화면
                </span>
            </DemoPreview>
        </div>
    );
}
