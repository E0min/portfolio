import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

export default function ResumePage() {
    const markdownPath = path.join(process.cwd(), 'src/app/md/resume.md');
    let markdownContent = '';
    let frontmatter: any = {};

    try {
        const fileContent = fs.readFileSync(markdownPath, 'utf8');
        const { data, content } = matter(fileContent);
        frontmatter = data;
        markdownContent = content;
    } catch (error) {
        console.error("Error reading resume markdown:", error);
        markdownContent = "# Error\nCould not load resume.";
    }

    return (
        <main style={{ padding: 'var(--spacing-xl) var(--spacing-md)', maxWidth: '900px', margin: '0 auto' }}>
            {/* Header Section */}
            <header style={{
                display: 'flex',
                gap: 'var(--spacing-xl)',
                marginBottom: 'var(--spacing-xl)',
                alignItems: 'center',
                flexWrap: 'wrap'
            }}>
                {/* Left: Profile Image */}
                {frontmatter.profileImage && (
                    <div style={{ flex: '0 0 250px' }}>
                        <img
                            src={frontmatter.profileImage}
                            alt="Profile"
                            style={{
                                width: '100%',
                                borderRadius: '0px',
                                border: 'var(--border-thin)',
                                boxShadow: 'var(--shadow-hard)'
                            }}
                        />
                    </div>
                )}

                {/* Right: Info */}
                <div style={{ flex: '1', minWidth: '300px' }}>
                    <h1 style={{
                        fontSize: '2.5rem',
                        borderBottom: 'var(--border-thick)',
                        paddingBottom: 'var(--spacing-sm)',
                        marginBottom: 'var(--spacing-md)'
                    }}>
                        {frontmatter.name}
                    </h1>

                    <div style={{ marginBottom: 'var(--spacing-md)' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: 'var(--spacing-sm)' }}>Contact</h3>
                        <p>📧 Email : <a href={`mailto:${frontmatter.contact?.email}`}>{frontmatter.contact?.email}</a></p>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: 'var(--spacing-sm)' }}>Channel</h3>
                        <p>Github : <a href={frontmatter.channel?.github} target="_blank" rel="noopener noreferrer">Github</a></p>
                        <p>Blog : <a href={frontmatter.channel?.blog} target="_blank" rel="noopener noreferrer">Velog</a></p>
                    </div>
                </div>
            </header>

            {/* Markdown Content */}
            <div className="resume-content">
                <ReactMarkdown
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
                        h1: ({ node, ...props }) => <h1 style={{ fontSize: '2.5rem', borderBottom: 'var(--border-thick)', paddingBottom: 'var(--spacing-sm)', marginBottom: 'var(--spacing-lg)', textTransform: 'uppercase' }} {...props} />,
                        h2: ({ node, ...props }) => <h2 style={{ fontSize: '2rem', borderBottom: 'var(--border-thin)', paddingBottom: 'var(--spacing-sm)', marginTop: 'var(--spacing-xl)', marginBottom: 'var(--spacing-md)', textTransform: 'uppercase' }} {...props} />,
                        h3: ({ node, ...props }) => <h3 style={{ fontSize: '1.5rem', fontWeight: '900', marginTop: 'var(--spacing-lg)', marginBottom: 'var(--spacing-sm)' }} {...props} />,
                        p: ({ node, ...props }) => <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: 'var(--spacing-md)' }} {...props} />,
                        ul: ({ node, ...props }) => <ul style={{ paddingLeft: '20px', marginBottom: 'var(--spacing-md)' }} {...props} />,
                        li: ({ node, ...props }) => <li style={{ fontSize: '1.1rem', marginBottom: 'var(--spacing-sm)' }} {...props} />,
                        a: ({ node, ...props }) => <a style={{ fontWeight: 'bold', textDecoration: 'underline' }} {...props} />,
                        hr: ({ node, ...props }) => <hr style={{ border: 'none', borderTop: 'var(--border-thick)', margin: 'var(--spacing-lg) 0' }} {...props} />,
                    }}
                >
                    {markdownContent}
                </ReactMarkdown>
            </div>
        </main>
    );
}
