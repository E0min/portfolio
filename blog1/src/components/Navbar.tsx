"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import ScrollVelocity from '../ui/ScrollVelocity';
import { usePathname } from 'next/navigation';

// Hardcoded navigation items for simplicity, as fs is not available on client side
// Ideally these should be passed as props or fetched via API
const portfolioItems = [
    { slug: 'fit', title: 'Fit Portfolio' },
    { slug: 'xab', title: 'Xab Portfolio' },
    { slug: 'chat-graph', title: 'Chat Graph' }
];

const designItems = [
    { slug: 'design1', title: 'RECAP FESTIVAL' },
    { slug: 'design2', title: 'PUSHPULLDOOR' },
    { slug: 'design3', title: 'WeatherAPI' },
    { slug: 'design4', title: 'Firebase Hosting' },
    { slug: 'design5', title: 'Mean Girls' },
    { slug: 'design6', title: 'Fireworks' },
    { slug: 'design7', title: 'Dankook Univ. ID Card' }
];

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <nav className="desktop-nav" style={{
                position: 'fixed',
                top: 0,
                left: 0,
                height: '100vh',
                width: '250px',
                borderRight: 'var(--border-thick)',
                padding: 'var(--spacing-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                backgroundColor: '#ffffff',
                zIndex: 1000,
                overflow: 'hidden' // Changed from overflowY: 'auto'
            }}>
                <div style={{
                    marginBottom: 'var(--spacing-md)',
                    borderBottom: 'var(--border-thick)',
                    paddingBottom: 'var(--spacing-sm)',
                    width: '100%',
                    flexShrink: 0 // Prevent shrinking
                }}>
                    <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ScrollVelocity
                            texts={['WELCOME TO MY PORTFOLIO', 'Βιβλιοθήκη της Αλεξάνδρειας', 'Library of Alexandria']}
                            velocity={20}
                            className="custom-scroll-text"
                        />
                    </Link>
                </div>
                {/* Navigation Links - Scrollable Area */}
                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    width: '100%',
                    minHeight: 0, // Critical for nested flex scrolling
                    paddingRight: '4px' // Prevent scrollbar overlapping content slightly
                }}>
                    <NavLinks closeMenu={() => { }} pathname={pathname} />
                </div>
            </nav>

            {/* Mobile Header */}
            <div className="mobile-header">
                <Link href="/" style={{ textDecoration: 'none', color: 'inherit', fontWeight: '900', fontSize: '1.2rem' }}>
                    MIN'S PORTFOLIO
                </Link>
                <button onClick={toggleMenu} className="hamburger-btn">
                    <div className={`hamburger-line ${isOpen ? 'open' : ''}`}></div>
                    <div className={`hamburger-line ${isOpen ? 'open' : ''}`}></div>
                    <div className={`hamburger-line ${isOpen ? 'open' : ''}`}></div>
                </button>
            </div>

            {/* Mobile Overlay Menu */}
            {isOpen && (
                <div className="mobile-overlay">
                    <nav className="mobile-nav-content">
                        <NavLinks closeMenu={closeMenu} isMobile={true} pathname={pathname} />
                    </nav>
                </div>
            )}

            <style jsx>{`
                /* Desktop Nav Visibility */
                @media (max-width: 768px) {
                    .desktop-nav {
                        display: none !important;
                    }
                }

                /* Mobile Header Styles */
                .mobile-header {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 80px;
                    background: #ffffff;
                    border-bottom: var(--border-thick);
                    z-index: 2000;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 var(--spacing-md);
                }

                @media (max-width: 768px) {
                    .mobile-header {
                        display: flex;
                    }
                }

                /* Hamburger Button (Prompt 2: Thick border box) */
                .hamburger-btn {
                    width: 50px;
                    height: 50px;
                    border: 3px solid #000000;
                    background: #ffffff;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 6px;
                    cursor: pointer;
                    box-shadow: var(--shadow-hard);
                    transition: transform 0.1s steps(2); /* Jerky animation */
                }

                .hamburger-btn:active {
                    transform: translate(2px, 2px);
                    box-shadow: none;
                }

                .hamburger-line {
                    width: 30px;
                    height: 3px;
                    background-color: #000000;
                    transition: all 0.1s steps(2);
                }
                
                /* Simple X transformation or just style changes */
                .hamburger-line.open:nth-child(1) {
                    transform: translateY(9px) rotate(45deg);
                }
                .hamburger-line.open:nth-child(2) {
                    opacity: 0;
                }
                .hamburger-line.open:nth-child(3) {
                    transform: translateY(-9px) rotate(-45deg);
                }

                /* Mobile Overlay (Prompt 2: Full screen white overlay) */
                .mobile-overlay {
                    position: fixed;
                    top: 80px; /* Below header */
                    left: 0;
                    width: 100vw;
                    height: calc(100vh - 80px);
                    background-color: #ffffff;
                    z-index: 1050;
                    padding: var(--spacing-lg);
                    overflow-y: auto;
                    animation: overlayShow 0.1s steps(2); /* Jerky entrance */
                }

                @keyframes overlayShow {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
};

interface NavLinksProps {
    closeMenu: () => void;
    isMobile?: boolean;
    pathname: string;
}

const NavLinks: React.FC<NavLinksProps> = ({ closeMenu, isMobile = false, pathname }) => {
    // Shared link styles
    const linkStyle: React.CSSProperties = {
        fontSize: isMobile ? '2rem' : '1.5rem', // Prompt 2: Large text on mobile
        fontWeight: 'bold',
        marginBottom: 'var(--spacing-sm)',
        textDecoration: 'underline',
        textDecorationThickness: isMobile ? '4px' : '2px', // Thicker underline on mobile
        display: 'block',
        width: '100%' // Changed to 100% for block display
    };

    const subLinkStyle: React.CSSProperties = {
        fontSize: isMobile ? '1.5rem' : '1rem',
        width: '100%' // Changed to 100% for block display
    };

    // Helper to determine if link is active
    const isActive = (path: string) => pathname === path;

    // Helper to get class string
    const getLinkClass = (path: string) => {
        const baseClass = isMobile ? "neo-link-mobile" : "neo-link";
        return isActive(path) ? `${baseClass} active` : baseClass;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 'var(--spacing-xl)' : 'var(--spacing-lg)', width: '100%' }}>
            <Link href="/resume" className={getLinkClass('/resume')} onClick={closeMenu} style={linkStyle}>Resume</Link>
            <Link href="/about-min" className={getLinkClass('/about-min')} onClick={closeMenu} style={linkStyle}>About Min</Link>

            {/* Portfolio Section */}
            <div>
                <Link href="/portfolio" className={getLinkClass('/portfolio')} onClick={closeMenu} style={linkStyle}>Portfolio</Link>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', paddingLeft: 'var(--spacing-md)' }}>
                    {portfolioItems.map(item => (
                        <Link
                            key={item.slug}
                            href={`/portfolio/${item.slug}`}
                            className={getLinkClass(`/portfolio/${item.slug}`)}
                            onClick={closeMenu}
                            style={subLinkStyle}
                        >
                            {item.title}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Design Section */}
            <div>
                <Link href="/design" className={getLinkClass('/design')} onClick={closeMenu} style={linkStyle}>Design</Link>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', paddingLeft: 'var(--spacing-md)' }}>
                    {designItems.map(item => (
                        <Link
                            key={item.slug}
                            href={`/portfolio/${item.slug}`}
                            className={getLinkClass(`/portfolio/${item.slug}`)}
                            onClick={closeMenu}
                            style={subLinkStyle}
                        >
                            {item.title}
                        </Link>
                    ))}
                </div>
            </div>

            <Link href="/blog" className={getLinkClass('/blog')} onClick={closeMenu} style={linkStyle}>Blog</Link>
            <Link href="/contact" className={getLinkClass('/contact')} onClick={closeMenu} style={linkStyle}>Contact</Link>

            <style jsx global>{`
                /* Prompt 2: Mobile Link Hover/Active State */
                .neo-link-mobile {
                    display: block;
                    padding: 2px 5px;
                    transition: background-color 0.1s steps(2), color 0.1s steps(2);
                    color: #000000;
                    text-decoration: underline;
                }
                
                /* Inverted colors on active/hover */
                .neo-link-mobile:active, 
                .neo-link-mobile:hover,
                .neo-link-mobile.active,
                .neo-link.active {  /* Also apply to desktop active links */
                    background-color: #000000;
                    color: #FF0000; /* Prompt 2: Red text */
                    text-decoration: none;
                }
            `}</style>
        </div>
    );
};

export default Navbar;

