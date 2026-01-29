import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blogDir = path.join(process.cwd(), 'src/md/blog');
    const filePath = path.join(blogDir, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        notFound();
    }

    let markdownContent = '';
    let frontmatter: any = {};

    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);
        frontmatter = data;
        // Fix for intraword bolding (e.g. **text**text)
        markdownContent = content.replace(/\*\*([^*]+)\*\*(?=[^\s])/g, '**$1**&#8203;');
    } catch (error) {
        console.error("Error reading blog post:", error);
        return <div>Error loading post.</div>;
    }

    return (
        <main style={{ padding: 'var(--spacing-xl) var(--spacing-md)', maxWidth: '900px', margin: '0 auto' }}>
            <header style={{ marginBottom: 'var(--spacing-xl)', borderBottom: 'var(--border-thick)', paddingBottom: 'var(--spacing-lg)' }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    marginBottom: 'var(--spacing-md)',
                    fontFamily: '"Pretendard", sans-serif',
                    fontWeight: '900'
                }}>
                    {frontmatter.title}
                </h1>
                <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold' }}>{frontmatter.date}</span>
                    {frontmatter.tags && (
                        <div style={{ display: 'flex', gap: '5px' }}>
                            {frontmatter.tags.map((tag: string) => (
                                <span key={tag} style={{
                                    backgroundColor: '#000',
                                    color: '#fff',
                                    padding: '2px 8px',
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold'
                                }}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </header>

            <div className="portfolio-content">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        h1: ({ node, ...props }) => <h1 style={{ fontSize: '2rem', borderBottom: 'var(--border-thick)', paddingBottom: 'var(--spacing-sm)', marginTop: '2em', marginBottom: '1em' }} {...props} />,
                        h2: ({ node, ...props }) => <h2 style={{ fontSize: '1.8rem', borderBottom: 'var(--border-thin)', paddingBottom: 'var(--spacing-sm)', marginTop: '2em', marginBottom: '1em' }} {...props} />,
                        h3: ({ node, ...props }) => <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '1.5em', marginBottom: '1em' }} {...props} />,
                        p: ({ node, ...props }) => <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5em' }} {...props} />,
                        ul: ({ node, ...props }) => <ul style={{ paddingLeft: '20px', marginBottom: '1.5em' }} {...props} />,
                        li: ({ node, ...props }) => <li style={{ fontSize: '1.1rem', marginBottom: '0.5em' }} {...props} />,
                        code: ({ node, inline, className, children, ...props }: any) => {
                            // Block code (inside pre)
                            if (!inline) {
                                return (
                                    <code className={className} style={{ backgroundColor: 'transparent', padding: 0 }} {...props}>
                                        {children}
                                    </code>
                                );
                            }
                            // Inline code
                            return (
                                <code className={className} style={{
                                    backgroundColor: '#f0f0f0',
                                    padding: '2px 4px',
                                    borderRadius: '0px',
                                    border: '1px solid #000',
                                    fontWeight: 'bold',
                                    fontSize: '0.9em'
                                }} {...props}>
                                    {children}
                                </code>
                            );
                        },
                        pre: ({ node, children, ...props }) => {
                            return (
                                <pre style={{
                                    padding: 'var(--spacing-md)',
                                    marginBottom: 'var(--spacing-md)',
                                    borderRadius: '0',
                                    overflowX: 'auto',
                                    border: 'var(--border-thick)',
                                    boxShadow: 'var(--shadow-hard)',
                                    backgroundColor: '#ffffff'
                                }} {...props}>
                                    {children}
                                </pre>
                            );
                        },
                        strong: ({ node, ...props }) => <strong style={{ fontWeight: 'bold' }} {...props} />,
                        b: ({ node, ...props }) => <b style={{ fontWeight: 'bold' }} {...props} />,
                    }}
                >
                    {markdownContent}
                </ReactMarkdown>
            </div>
        </main>
    );
}
