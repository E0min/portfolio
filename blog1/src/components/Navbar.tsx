import Link from 'next/link';
import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ScrollVelocity from '../ui/ScrollVelocity';


const Navbar: React.FC = () => {
    // Read portfolio files from md directory
    const mdDir = path.join(process.cwd(), 'src/md');
    const portfolioDir = path.join(process.cwd(), 'src/md/portfolio');
    const designDir = path.join(process.cwd(), 'src/md/design');

    let portfolioItems: { slug: string; title: string }[] = [];
    let designItems: { slug: string; title: string }[] = [];

    try {
        // Get Portfolio Items from src/md/portfolio
        if (fs.existsSync(portfolioDir)) {
            const portfolioFiles = fs.readdirSync(portfolioDir);
            portfolioItems = portfolioFiles
                .filter(file => file.endsWith('_portfolio.md'))
                .map(file => {
                    const content = fs.readFileSync(path.join(portfolioDir, file), 'utf-8');
                    const { data } = matter(content);
                    return {
                        slug: file.replace('_portfolio.md', ''),
                        title: data.title || file.replace('_portfolio.md', '')
                    };
                });
        }

        // Get Design Items from src/md/design
        if (fs.existsSync(designDir)) {
            const designFiles = fs.readdirSync(designDir);
            designItems = designFiles
                .filter(file => file.toLowerCase().startsWith('design') && file.endsWith('_portfolio.md'))
                .map(file => {
                    const content = fs.readFileSync(path.join(designDir, file), 'utf-8');
                    const { data } = matter(content);
                    return {
                        slug: file.replace('_portfolio.md', ''),
                        title: data.title || file.replace('_portfolio.md', '')
                    };
                });
        }
    } catch (error) {
        console.error("Error reading portfolio/design files:", error);
    }
    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '250px',
            borderRight: 'var(--border-thick)',
            padding: 'var(--spacing-md)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            backgroundColor: '#ffffff',
            zIndex: 1000,
            overflowY: 'auto'
        }}>
            <div style={{
                marginBottom: 'var(--spacing-xl)',
                borderBottom: 'var(--border-thin)',
                paddingBottom: 'var(--spacing-sm)',
                width: '100%',
                overflow: 'hidden'
            }}>
                <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ScrollVelocity
                        texts={['WELCOME TO MY PORTFOLIO', 'Βιβλιοθήκη της Αλεξάνδρειας', 'Library of Alexandria']}
                        velocity={20}
                        className="custom-scroll-text"
                    />
                </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', width: '100%' }}>
                {/* Min Section */}
                <div>
                    <div className="neo-link" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: 'var(--spacing-sm)', textDecoration: 'underline', textDecorationThickness: '2px' }}>Min</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', paddingLeft: 'var(--spacing-md)' }}>
                        <Link href="/resume" className="neo-link" style={{ fontSize: '1rem' }}>Resume</Link>
                        <Link href="/about-min" className="neo-link" style={{ fontSize: '1rem' }}>About Min</Link>
                    </div>
                </div>

                {/* Portfolio Section */}
                <div>
                    <Link href="/portfolio" className="neo-link" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: 'var(--spacing-sm)', textDecoration: 'underline', textDecorationThickness: '2px', display: 'block' }}>Portfolio</Link>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', paddingLeft: 'var(--spacing-md)' }}>
                        {portfolioItems.map(item => (
                            <Link
                                key={item.slug}
                                href={`/portfolio/${item.slug}`}
                                className="neo-link"
                                style={{ fontSize: '1rem' }}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Design Section */}
                <div>
                    <Link href="/design" className="neo-link" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: 'var(--spacing-sm)', textDecoration: 'underline', textDecorationThickness: '2px', display: 'block' }}>Design</Link>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', paddingLeft: 'var(--spacing-md)' }}>
                        {designItems.map(item => (
                            <Link
                                key={item.slug}
                                href={`/portfolio/${item.slug}`}
                                className="neo-link"
                                style={{ fontSize: '1rem' }}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>

                <Link href="/blog" className="neo-link" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: 'var(--spacing-sm)', textDecoration: 'underline', textDecorationThickness: '2px' }}>Blog</Link>
                <Link href="/contact" className="neo-link" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: 'var(--spacing-sm)', textDecoration: 'underline', textDecorationThickness: '2px' }}>Contact</Link>
            </div>

            <div style={{ marginTop: 'auto', fontSize: '0.8rem', fontWeight: 'bold' }}>

            </div>
        </nav>
    );
};

export default Navbar;
