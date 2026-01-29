import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import Mermaid from '@/util/mermaid';
import DemoPreview from '@/components/demo-preview';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

export default async function PortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const mdDir = path.join(process.cwd(), 'src/md');
    const portfolioDir = path.join(process.cwd(), 'src/md/portfolio');
    const designDir = path.join(process.cwd(), 'src/md/design');

    let markdownContent = '';
    let frontmatter: any = {};

    try {
        // 1. Try finding in src/md/portfolio first
        let matchingFile;
        let targetDir = portfolioDir;

        if (fs.existsSync(portfolioDir)) {
            const portfolioFiles = fs.readdirSync(portfolioDir);
            matchingFile = portfolioFiles.find(file =>
                file.toLowerCase() === `${slug.toLowerCase()}_portfolio.md`
            );
        }

        // 2. If not found, try in src/md/design
        if (!matchingFile && fs.existsSync(designDir)) {
            targetDir = designDir;
            const designFiles = fs.readdirSync(designDir);
            matchingFile = designFiles.find(file =>
                file.toLowerCase() === `${slug.toLowerCase()}_portfolio.md`
            );
        }

        if (!matchingFile) {
            notFound();
        }

        const filePath = path.join(targetDir, matchingFile!);
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
        )
        // Fix for intraword bolding (e.g. **text**text)
        // We inject a zero-width space &#8203; which acts as a separator for the parser
        // but is invisible to the user.
        .replace(/\*\*([^*]+)\*\*(?=[^\s])/g, '**$1**&#8203;');

    return (
        <main style={{ padding: 'var(--spacing-xl) var(--spacing-md)', maxWidth: '1400px', margin: '0 auto' }}>
            <div className="portfolio-content">
                {frontmatter.image && (
                    <img
                        src={frontmatter.image}
                        alt={frontmatter.title}
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: '500px',
                            objectFit: 'contain',
                            display: 'block',
                            margin: '0 auto',
                            border: 'var(--border-thick)',
                            boxShadow: 'var(--shadow-hard)',
                            marginBottom: 'var(--spacing-lg)',
                            backgroundColor: '#fff'
                        }}
                    />
                )}
                <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkGfm]}
                    components={{
                        img: ({ node, ...props }) => (
                            <img
                                {...props}
                                style={{
                                    width: '70%',
                                    height: 'auto',
                                    display: 'block',
                                    margin: '0 auto',
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
                        code: ({ node, className, children, ...props }: any) => {
                            const match = /language-(\w+)/.exec(className || '');
                            const language = match ? match[1] : '';

                            // Check if it's a mermaid code block
                            if (language === 'mermaid') {
                                return (
                                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', margin: 'var(--spacing-md) 0' }}>
                                        <div style={{ width: '90%', border: 'none' }}>
                                            <Mermaid chart={String(children).replace(/\n$/, '')} />
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            );
                        },
                        pre: ({ node, children, ...props }) => {
                            return (
                                <pre style={{
                                    backgroundColor: '#ffffff',
                                    padding: 'var(--spacing-md)',
                                    marginBottom: 'var(--spacing-md)',
                                    borderRadius: '4px',
                                    overflowX: 'auto',
                                    color: '#000000',
                                    border: 'var(--border-thick)',
                                    boxShadow: 'var(--shadow-hard)'
                                }} {...props}>
                                    {children}
                                </pre>
                            );
                        },
                        // Add table support styling
                        table: ({ node, ...props }) => <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 'var(--spacing-md)', border: 'var(--border-thin)' }} {...props} />,
                        thead: ({ node, ...props }) => <thead style={{ backgroundColor: '#f5f5f5' }} {...props} />,
                        tbody: ({ node, ...props }) => <tbody {...props} />,
                        tr: ({ node, ...props }) => <tr style={{ borderBottom: '1px solid #ddd' }} {...props} />,
                        th: ({ node, ...props }) => <th style={{ padding: 'var(--spacing-sm)', textAlign: 'left', fontWeight: 'bold', border: '1px solid #000' }} {...props} />,
                        td: ({ node, ...props }) => <td style={{ padding: 'var(--spacing-sm)', border: '1px solid #000' }} {...props} />,
                        blockquote: ({ node, ...props }) => <blockquote style={{ borderLeft: '4px solid #000', paddingLeft: 'var(--spacing-md)', color: '#666', fontStyle: 'italic', margin: 'var(--spacing-md) 0' }} {...props} />,
                        strong: ({ node, ...props }) => <strong style={{ fontWeight: 'bold' }} {...props} />,
                        b: ({ node, ...props }) => <b style={{ fontWeight: 'bold' }} {...props} />,
                    }}
                >
                    {processedContent}
                </ReactMarkdown>
            </div>
        </main>
    );
}
