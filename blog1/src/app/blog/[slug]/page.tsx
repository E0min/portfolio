import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import Link from "next/link";

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    return (
        <main>
            <Navbar />
            <article style={{ padding: 'var(--spacing-xl) var(--spacing-md)', maxWidth: '800px', margin: '0 auto' }}>
                <Link href="/blog">
                    <Button variant="secondary" style={{ marginBottom: 'var(--spacing-md)', fontSize: '0.9rem' }}>← Back to Blog</Button>
                </Link>

                <header style={{
                    borderBottom: 'var(--border-thick)',
                    paddingBottom: 'var(--spacing-md)',
                    marginBottom: 'var(--spacing-lg)'
                }}>
                    <h1 style={{ fontSize: '3rem', textTransform: 'uppercase', lineHeight: '1.1' }}>
                        {slug.replace(/-/g, ' ')}
                    </h1>
                    <p style={{ marginTop: 'var(--spacing-sm)', color: '#666', fontWeight: 'bold' }}>Posted on 2024-01-28</p>
                </header>

                <div style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                    <p style={{ marginBottom: 'var(--spacing-md)' }}>
                        This is a placeholder for the content of <strong>{slug}</strong>.
                        Imagine a very insightful article here about technology, design, or life.
                    </p>
                    <p style={{ marginBottom: 'var(--spacing-md)' }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <div style={{
                        border: 'var(--border-thin)',
                        padding: 'var(--spacing-md)',
                        backgroundColor: 'var(--accent-pink)',
                        fontWeight: 'bold',
                        marginTop: 'var(--spacing-lg)'
                    }}>
                        &gt; End of Stream
                    </div>
                </div>
            </article>
        </main>
    );
}
