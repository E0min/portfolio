import Link from "next/link";
import Button from "@/components/button";
import Card from "@/components/card";

export default function Home() {
  return (
    <main>

      <header style={{
        padding: 'var(--spacing-xl) var(--spacing-md)',
        borderBottom: 'var(--border-thick)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 'var(--spacing-md)',
        backgroundColor: '#fff'
      }}>
        <h1 style={{
          fontSize: '4rem',
          lineHeight: '1',
          fontWeight: '900',
          textTransform: 'uppercase',
          maxWidth: '800px',
          textShadow: '4px 4px 0px #000000'
        }}>
          Simplicity is the Ultimate Sophistication
        </h1>
        <p style={{ fontSize: '1.5rem', maxWidth: '600px', margin: 'var(--spacing-md) 0' }}>
          Welcome to my digital playground. Hard lines, bold colors, and raw code.
        </p>
        <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
          <Link href="/blog">
            <Button>Read My Thoughts</Button>
          </Link>
          <Link href="/resume">
            <Button variant="secondary" style={{ backgroundColor: '#fff' }}>Resume</Button>
          </Link>
        </div>
      </header>

      <section style={{ padding: 'var(--spacing-xl) var(--spacing-md)', borderTop: 'var(--border-thick)' }}>
        <h2 style={{
          fontSize: '2.5rem',
          marginBottom: 'var(--spacing-lg)',
          borderBottom: 'var(--border-thick)',
          paddingBottom: 'var(--spacing-sm)',
          display: 'inline-block',
          backgroundColor: '#fff',
          padding: 'var(--spacing-sm)',
          boxShadow: 'var(--shadow-hard)'
        }}>
          Featured Works
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-lg)' }}>
          <Card title="Project Alpha">
            <p>A web application built with pure determination and raw CSS. No frameworks were harmed in the making of this landing page.</p>
            <div style={{ marginTop: 'var(--spacing-md)' }}>
              <Button style={{ fontSize: '0.8rem' }}>View Source</Button>
            </div>
          </Card>
          <Card title="Neon Dreams">
            <p>An exploration of color theory and brutalist architecture in digital space. Warning: May cause eye strain.</p>
            <div style={{ marginTop: 'var(--spacing-md)' }}>
              <Button style={{ fontSize: '0.8rem' }}>View Source</Button>
            </div>
          </Card>
          <Card title="The Void">
            <p>A minimalist experiment. It does nothing, but it does it effectively and with style.</p>
            <div style={{ marginTop: 'var(--spacing-md)' }}>
              <Button style={{ fontSize: '0.8rem' }}>View Source</Button>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
