import Link from 'next/link';
import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const Navbar: React.FC = () => {
    // Read portfolio files from md directory
    const mdDir = path.join(process.cwd(), 'src/app/md');
    let portfolioItems: { slug: string; title: string }[] = [];
    let designItems: { slug: string; title: string }[] = [];

    try {
        const files = fs.readdirSync(mdDir);
        const allItems = files
            .filter(file => file.endsWith('_portfolio.md'))
            .map(file => {
                const slug = file.replace('_portfolio.md', '').toLowerCase();
                const filePath = path.join(mdDir, file);
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                const { data } = matter(fileContent);
                const title = data.title || file.replace('_portfolio.md', '');
                return { slug, title };
            });

        // Separate design items from portfolio items
        designItems = allItems.filter(item => item.slug.startsWith('design'));
        portfolioItems = allItems.filter(item => !item.slug.startsWith('design'));
    } catch (error) {
        console.error("Error reading portfolio files:", error);
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
                fontWeight: '900',
                fontSize: '1.5rem',
                marginBottom: 'var(--spacing-xl)',
                borderBottom: 'var(--border-thin)',
                paddingBottom: 'var(--spacing-sm)',
                width: '100%'
            }}>
                <Link href="/" style={{ textDecoration: 'none' }}>MY<br />PORTFOLIO</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', width: '100%' }}>
                <Link href="/resume" className="neo-link" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Resume</Link>

                {/* Portfolio Section */}
                <div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: 'var(--spacing-sm)' }}>Portfolio</div>
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
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: 'var(--spacing-sm)' }}>Design</div>
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

                <Link href="/blog" className="neo-link" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Blog</Link>
                <Link href="/contact" className="neo-link" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Contact</Link>
            </div>

            <div style={{ marginTop: 'auto', fontSize: '0.8rem', fontWeight: 'bold' }}>
                © 2026 Neo-Brut
            </div>
        </nav>
    );
};

export default Navbar;
