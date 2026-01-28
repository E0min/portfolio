import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import Mermaid from '@/components/mermaid';
import DemoPreview from '@/components/demo-preview';
import rehypeRaw from 'rehype-raw';

export default async function PortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const mdDir = path.join(process.cwd(), 'src/app/md');

    let markdownContent = '';
    let frontmatter: any = {};

    try {
        // Find matching portfolio file (case-insensitive)
        const files = fs.readdirSync(mdDir);
        const matchingFile = files.find(file =>
            file.toLowerCase() === `${slug.toLowerCase()}_portfolio.md`
        );

        if (!matchingFile) {
            notFound();
        }

        const filePath = path.join(mdDir, matchingFile);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);
        frontmatter = data;
        markdownContent = content;
    } catch (error) {
        console.error("Error reading portfolio markdown:", error);
        notFound();
    }

    // Process IFRAME: and IFRAME_SQUARE: syntax in markdown
    const processedContent = markdownContent
        .replace(
            /IFRAME_SQUARE:(.+)/g,
            (match, url) => {
                const trimmedUrl = url.trim();
                return `<div class="embedded-iframe-wrapper square">
                    <div class="embedded-iframe-container square">
                        <iframe src="${trimmedUrl}" class="embedded-iframe" title="Live Preview"></iframe>
                    </div>
                </div>`;
            }
        )
        .replace(
            /IFRAME:(.+)/g,
            (match, url) => {
                const trimmedUrl = url.trim();
                return `<div class="embedded-iframe-wrapper">
                    <div class="embedded-iframe-container">
                        <iframe src="${trimmedUrl}" class="embedded-iframe" title="Live Preview"></iframe>
                    </div>
                </div>`;
            }
        );

    return (
        <main style={{ padding: 'var(--spacing-xl) var(--spacing-md)', maxWidth: '1400px', margin: '0 auto' }}>
            <div className="portfolio-content">
                <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        img: ({ node, ...props }) => (
                            <img
                                {...props}
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    border: 'var(--border-thick)',
                                    boxShadow: 'var(--shadow-hard)',
                                    marginBottom: 'var(--spacing-lg)'
                                }}
                            />
                        ),
                        h1: ({ node, ...props }) => <h1 style={{ fontSize: '2.5rem', borderBottom: 'var(--border-thick)', paddingBottom: 'var(--spacing-sm)', marginBottom: 'var(--spacing-lg)' }} {...props} />,
                        h2: ({ node, ...props }) => <h2 style={{ fontSize: '2rem', borderBottom: 'var(--border-thin)', paddingBottom: 'var(--spacing-sm)', marginTop: 'var(--spacing-xl)', marginBottom: 'var(--spacing-md)' }} {...props} />,
                        h3: ({ node, ...props }) => <h3 style={{ fontSize: '1.5rem', fontWeight: '900', marginTop: 'var(--spacing-lg)', marginBottom: 'var(--spacing-sm)' }} {...props} />,
                        p: ({ node, ...props }) => <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: 'var(--spacing-md)' }} {...props} />,
                        ul: ({ node, ...props }) => <ul style={{ paddingLeft: '20px', marginBottom: 'var(--spacing-md)' }} {...props} />,
                        li: ({ node, ...props }) => <li style={{ fontSize: '1.1rem', marginBottom: 'var(--spacing-sm)' }} {...props} />,
                        a: ({ node, href, children, ...props }) => {
                            // Check if this is a demo link (both /portfolio/design/ and /portfolio/design*.html)
                            const isDemoLink = href?.startsWith('/portfolio/design');

                            if (isDemoLink && href) {
                                return (
                                    <DemoPreview href={href}>
                                        {children}
                                    </DemoPreview>
                                );
                            }

                            // Regular link
                            return <a href={href} style={{ fontWeight: 'bold', textDecoration: 'underline' }} {...props}>{children}</a>;
                        },
                        hr: ({ node, ...props }) => <hr style={{ border: 'none', borderTop: 'var(--border-thick)', margin: 'var(--spacing-lg) 0' }} {...props} />,
                        code: ({ node, inline, className, children, ...props }: any) => {
                            const match = /language-(\w+)/.exec(className || '');
                            const language = match ? match[1] : '';

                            // Check if it's a mermaid code block
                            if (!inline && language === 'mermaid') {
                                return <Mermaid chart={String(children).replace(/\n$/, '')} />;
                            }

                            return inline ? (
                                <code style={{ backgroundColor: '#f0f0f0', padding: '2px 4px', borderRadius: '3px', fontFamily: 'monospace' }} {...props}>
                                    {children}
                                </code>
                            ) : (
                                <code style={{ display: 'block', backgroundColor: '#f0f0f0', padding: 'var(--spacing-md)', border: 'var(--border-thin)', marginBottom: 'var(--spacing-md)', overflowX: 'auto', fontFamily: 'monospace' }} {...props}>
                                    {children}
                                </code>
                            );
                        },
                    }}
                >
                    {processedContent}
                </ReactMarkdown>
            </div>
        </main>
    );
}
