import Folder from "@/ui/folder";
import Button from "@/ui/button";
import Link from "next/link";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

export default function PortfolioListing() {
    const mdDir = path.join(process.cwd(), 'src/md/portfolio');
    let posts: { slug: string; title: string; description: string; date: string; tags: string[] }[] = [];

    try {
        if (fs.existsSync(mdDir)) {
            const files = fs.readdirSync(mdDir);
            posts = files
                .filter(file => file.endsWith('_portfolio.md'))
                .map(file => {
                    const filePath = path.join(mdDir, file);
                    const fileContent = fs.readFileSync(filePath, 'utf-8');
                    const { data } = matter(fileContent);
                    return {
                        slug: file.replace('_portfolio.md', ''),
                        title: data.title || file.replace('_portfolio.md', ''),
                        description: data.description || "Portfolio project",
                        // Using current date if no date provided, or just don't sort by date if irrelevant
                        date: data.date || "2024",
                        tags: data.tags
                    };
                })
                // Sort by date if available, otherwise just arbitrary
                .sort((a, b) => (b.date > a.date ? 1 : -1));
        }
    } catch (error) {
        console.error("Error reading portfolio posts:", error);
    }

    return (
        <main>
            <div style={{ padding: 'var(--spacing-xl) var(--spacing-md)', maxWidth: '1000px', margin: '0 auto' }}>
                <h1 style={{
                    fontSize: '3rem',
                    marginBottom: 'var(--spacing-lg)',
                    borderBottom: 'var(--border-thick)',
                    display: 'inline-block',
                    fontFamily: '"Pretendard", sans-serif',
                    fontWeight: '900'
                }}>
                    PORTFOLIO
                </h1>

                <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
                    {posts.map(post => (
                        <Folder key={post.slug} title={post.title}>
                            <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                <span style={{ fontSize: '0.9rem', color: '#666', marginRight: '10px' }}>{post.date}</span>
                                {post.tags && post.tags.map((tag: string) => (
                                    <span key={tag} style={{
                                        fontSize: '0.8rem',
                                        border: '1px solid #000',
                                        padding: '2px 6px',
                                        marginRight: '5px',
                                        backgroundColor: '#f0f0f0'
                                    }}>
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                            <div style={{ marginBottom: 'var(--spacing-md)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                                <ReactMarkdown
                                    components={{
                                        strong: ({ node, ...props }) => <span style={{ fontWeight: 'bold', color: '#000' }} {...props} />,
                                        ul: ({ node, ...props }) => <ul style={{ paddingLeft: '20px', margin: '10px 0' }} {...props} />,
                                        li: ({ node, ...props }) => <li style={{ marginBottom: '5px' }} {...props} />
                                    }}
                                >
                                    {post.description}
                                </ReactMarkdown>
                            </div>
                            <Link href={`/portfolio/${post.slug}`}>
                                <Button style={{ width: '100%' }}>Open Folder_</Button>
                            </Link>
                        </Folder>
                    ))}
                </div>
            </div>
        </main>
    );
}
