import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Link from "next/link";

const POSTS = [
    { id: '1', slug: 'hello-world', title: 'Hello World: A Brutalist Approach', description: 'Why standard web design is boring and why you should embrace the raw pixels.' },
    { id: '2', slug: 'css-is-awesome', title: 'CSS is Awesome (And Painful)', description: 'A deep dive into the overflow: hidden property and why it saves lives.' },
    { id: '3', slug: 'why-nextjs', title: 'Why Next.js?', description: 'Server Side Rendering is cool again. Let’s talk about hydration errors.' },
];

export default function BlogListing() {
    return (
        <main>
            <Navbar />
            <div style={{ padding: 'var(--spacing-xl) var(--spacing-md)', maxWidth: '1000px', margin: '0 auto' }}>
                <h1 style={{
                    fontSize: '3rem',
                    marginBottom: 'var(--spacing-lg)',
                    borderBottom: 'var(--border-thick)',
                    display: 'inline-block'
                }}>
                    WRITINGS
                </h1>

                <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                    {POSTS.map(post => (
                        <Card key={post.id} title={post.title} className="neo-box">
                            <p style={{ marginBottom: 'var(--spacing-md)', fontSize: '1.1rem' }}>{post.description}</p>
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
