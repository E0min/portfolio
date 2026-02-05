import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ProjectSpotlight from '@/components/ProjectSpotlight';

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
            <h1
                className="glitch"
                data-text="DESIGN"
                style={{
                    fontSize: '3rem',
                    marginBottom: 'var(--spacing-lg)',
                    borderBottom: 'var(--border-thick)',
                    display: 'inline-block',
                    fontFamily: '"Pretendard", sans-serif',
                    fontWeight: '900'
                }}>
                DESIGN
            </h1>

            <ProjectSpotlight items={posts} />
        </main>
    );
}
