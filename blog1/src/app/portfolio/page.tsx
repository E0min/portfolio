import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import PortfolioGrid from "@/components/PortfolioGrid";

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
                        date: data.date || "2024",
                        tags: data.tags || []
                    };
                })
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

                <PortfolioGrid posts={posts} />
            </div>
        </main>
    );
}
