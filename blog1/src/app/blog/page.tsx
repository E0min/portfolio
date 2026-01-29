import Card from "@/ui/card";
import Button from "@/ui/button";
import Link from "next/link";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function BlogListing() {
    const blogDir = path.join(process.cwd(), 'src/md/blog');
    let posts: { id: string; slug: string; title: string; date: string; description: string; tags: string[] }[] = [];

    try {
        if (fs.existsSync(blogDir)) {
            const files = fs.readdirSync(blogDir);
            posts = files
                .filter(file => file.endsWith('.md'))
                .map(file => {
                    const filePath = path.join(blogDir, file);
                    const fileContent = fs.readFileSync(filePath, 'utf-8');
                    const { data } = matter(fileContent);
                    return {
                        id: file.replace('.md', ''),
                        slug: file.replace('.md', ''),
                        title: data.title,
                        description: data.description,
                        date: data.date,
                        tags: data.tags
                    };
                })
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }
    } catch (error) {
        console.error("Error reading blog posts:", error);
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
                    WRITINGS
                </h1>

                <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
                    {posts.map(post => (
                        <Card key={post.slug} title={post.title} className="neo-box static">
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
                            <p style={{ marginBottom: 'var(--spacing-md)', fontSize: '1.1rem', lineHeight: '1.6' }}>{post.description}</p>
                            <Link href={`/blog/${post.slug}`}>
                                <Button>Read More</Button>
                            </Link>
                        </Card>
                    ))}
                </div>
            </div>
        </main>
    );
}
