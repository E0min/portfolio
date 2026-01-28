import Link from 'next/link';
import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav style={{
            borderBottom: 'var(--border-thick)',
            padding: 'var(--spacing-md)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'var(--accent-yellow)', // Distinct header color
        }}>
            <div style={{ fontWeight: '900', fontSize: '1.2rem' }}>
                <Link href="/" style={{ textDecoration: 'none' }}>MY PORTFOLIO</Link>
            </div>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                <Link href="/about" className="neo-link">About</Link>
                <Link href="/blog" className="neo-link">Blog</Link>
                <Link href="/contact" className="neo-link">Contact</Link>
            </div>
        </nav>
    );
};

export default Navbar;
