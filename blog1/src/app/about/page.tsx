import Card from "@/components/card";

export default function About() {
    return (
        <main>
            <div style={{ padding: 'var(--spacing-xl) var(--spacing-md)', maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{
                    fontSize: '3rem',
                    marginBottom: 'var(--spacing-lg)',
                    textTransform: 'uppercase',
                    borderBottom: 'var(--border-thick)',
                }}>
                    About Me
                </h1>

                <Card className="neo-box" style={{ padding: 'var(--spacing-lg)' }}>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: 'var(--spacing-md)' }}>
                        I am a developer who believes in simplicity, clarity, and bold design.
                        I create things that live on the internet, sometimes they break, sometimes they don't.
                    </p>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
                        This portfolio is an experiment in Neo-Brutalism, emphasizing raw structure,
                        high contrast, and an honest representation of materials (HTML/CSS).
                        No hidden divs, no blurred backgrounds, just pixels.
                    </p>
                </Card>

                <div style={{ marginTop: 'var(--spacing-xl)' }}>
                    <h2 style={{ marginBottom: 'var(--spacing-md)', fontSize: '2rem' }}>Skills</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-sm)' }}>
                        {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Neo-Brutalism', 'Coffee'].map(skill => (
                            <span key={skill} style={{
                                border: 'var(--border-thick)',
                                padding: 'var(--spacing-sm)',
                                backgroundColor: 'var(--accent-yellow)',
                                fontWeight: 'bold',
                                boxShadow: 'var(--shadow-hover)'
                            }}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
