import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export default function DesignPage() {
    const designDir = path.join(process.cwd(), 'src/md/design');

    let posts: { slug: string; title: string; description?: string; image?: string }[] = [];

    if (fs.existsSync(designDir)) {
        const files = fs.readdirSync(designDir);
        posts = files
            .filter(file => file.endsWith('.md'))
            .map(file => {
                const filePath = path.join(designDir, file);
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                const { data } = matter(fileContent);
                const slug = file.replace('_portfolio.md', '');

                return {
                    slug,
                    title: data.title,
                    description: data.description,
                    image: data.image
                };
            });
    }

    return (
        <main style={{ padding: 'var(--spacing-xl) var(--spacing-md)', maxWidth: '1600px', margin: '0 auto' }}>
            <h1 style={{
                fontSize: '3rem',
                marginBottom: 'var(--spacing-lg)',
                borderBottom: 'var(--border-thick)',
                display: 'inline-block',
                fontFamily: '"Pretendard", sans-serif',
                fontWeight: '900'
            }}>
                DESIGN
            </h1>

            {/* Masonry Layout using CSS Columns */}
            <div className="masonry-grid">
                {posts.map((post) => {
                    return (
                        <div key={post.slug} className="masonry-item neo-box-hover">
                            <Link href={`/portfolio/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                                <div style={{
                                    position: 'relative',
                                    borderBottom: 'var(--border-thick)',
                                    backgroundColor: '#f0f0f0',
                                    overflow: 'hidden'
                                }}>
                                    {post.image ? (
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                                display: 'block'
                                            }}
                                        />
                                    ) : (
                                        <div style={{
                                            width: '100%',
                                            height: '200px', // Default placeholder height
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.2rem',
                                            fontWeight: 'bold',
                                            color: '#999',
                                            backgroundColor: '#e0e0e0'
                                        }}>
                                            NO IMAGE
                                        </div>
                                    )}
                                </div>
                                <div style={{ padding: 'var(--spacing-md)' }}>
                                    <h3 style={{ margin: '0 0 var(--spacing-sm) 0', fontSize: '1.2rem', fontWeight: 'bold' }}>{post.title}</h3>
                                    {post.description && <p style={{ fontSize: '0.9rem', color: '#666' }}>{post.description}</p>}
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .masonry-grid {
                    column-count: 3;
                    column-gap: 20px;
                }
                .masonry-item {
                    break-inside: avoid;
                    margin-bottom: 20px;
                    border: var(--border-thick);
                    box-shadow: var(--shadow-hard);
                    background-color: #fff;
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .masonry-item:hover {
                    transform: translate(-2px, -2px);
                    box-shadow: 6px 6px 0px 0px rgba(0,0,0,1);
                }
                
                @media (max-width: 1200px) {
                    .masonry-grid {
                        column-count: 2;
                    }
                }
                @media (max-width: 600px) {
                    .masonry-grid {
                        column-count: 1;
                    }
                }
            `}} />
        </main>
    );
}
