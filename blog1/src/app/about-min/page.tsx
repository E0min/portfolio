import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

export default function AboutMinPage() {
    const markdownPath = path.join(process.cwd(), 'src/md/personal-statement.md');
    let markdownContent = '';
    let frontmatter: any = {};

    try {
        const fileContent = fs.readFileSync(markdownPath, 'utf8');
        const { data, content } = matter(fileContent);
        frontmatter = data;
        markdownContent = content;
    } catch (error) {
        console.error("Error reading personal statement markdown:", error);
        markdownContent = "# Error\nCould not load personal statement.";
    }

    return (
        <main style={{ padding: 'var(--spacing-xl) var(--spacing-md)', maxWidth: '900px', margin: '0 auto' }}>
            {/* Header Section */}
            <header style={{ marginBottom: 'var(--spacing-xl)' }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    borderBottom: 'var(--border-thick)',
                    paddingBottom: 'var(--spacing-sm)',
                    marginBottom: 'var(--spacing-md)',
                    textTransform: 'uppercase',
                    fontFamily: '"Pretendard", sans-serif'
                }}>
                    {frontmatter.title || 'About Min'}
                </h1>
                <p style={{ fontSize: '1.1rem', color: '#666', fontFamily: '"Pretendard", sans-serif' }}>
                    Target: <span style={{ fontWeight: 'bold', color: '#000' }}>{frontmatter.target}</span>
                </p>
            </header>

            {/* Markdown Content */}
            <div className="resume-content">
                <ReactMarkdown
                    components={{
                        h1: ({ node, ...props }) => <h1 style={{ fontSize: '2.5rem', borderBottom: 'var(--border-thick)', paddingBottom: 'var(--spacing-sm)', marginBottom: 'var(--spacing-lg)', marginTop: 'var(--spacing-xl)', fontFamily: '"Pretendard", sans-serif' }} {...props} />,
                        h2: ({ node, ...props }) => <h2 style={{ fontSize: '2rem', borderBottom: 'var(--border-thin)', paddingBottom: 'var(--spacing-sm)', marginTop: 'var(--spacing-xl)', marginBottom: 'var(--spacing-md)', fontFamily: '"Pretendard", sans-serif' }} {...props} />,
                        h3: ({ node, ...props }) => <h3 style={{ fontSize: '1.5rem', fontWeight: '900', marginTop: 'var(--spacing-lg)', marginBottom: 'var(--spacing-sm)', fontFamily: '"Pretendard", sans-serif' }} {...props} />,
                        p: ({ node, ...props }) => <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: 'var(--spacing-md)', fontFamily: '"Pretendard", sans-serif' }} {...props} />,
                        ul: ({ node, ...props }) => <ul style={{ paddingLeft: '20px', marginBottom: 'var(--spacing-md)', fontFamily: '"Pretendard", sans-serif' }} {...props} />,
                        li: ({ node, ...props }) => <li style={{ fontSize: '1.1rem', marginBottom: 'var(--spacing-sm)', lineHeight: '1.6' }} {...props} />,
                        strong: ({ node, ...props }) => <strong style={{ fontWeight: '900', backgroundColor: '#f0f0f0', padding: '0 4px' }} {...props} />,
                    }}
                >
                    {markdownContent}
                </ReactMarkdown>
            </div>
        </main>
    );
}
