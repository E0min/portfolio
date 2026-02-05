"use client";

import DraggableCard from "@/components/DraggableCard";
import Folder from "@/ui/folder";
import Button from "@/ui/button";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';

interface PortfolioPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    tags: string[];
}

export default function PortfolioGrid({ posts }: { posts: PortfolioPost[] }) {
    return (
        <>
            <div className="portfolio-grid">
                {posts.map(post => (
                    <DraggableCard key={post.slug}>
                        <Folder title={post.title}>
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
                                <Button>Open Folder_</Button>
                            </Link>
                        </Folder>
                    </DraggableCard>
                ))}
            </div>
            <style jsx>{`
                .portfolio-grid {
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-lg);
                }
            `}</style>
        </>
    );
}
