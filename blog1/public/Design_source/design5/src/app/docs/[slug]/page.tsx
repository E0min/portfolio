"use client";

import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import { useEffect, useState } from "react";
import Link from "next/link";

// Import integrated movie data
import editorsNotes from "@/data/editors-notes.json";

// Reuse styles from editors-note for article layout
import "@/app/editors-note/[slug]/film-detail.css";

export default function DocDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const foundMovie = editorsNotes.find((m: any) => m.slug === slug);
    if (foundMovie) {
      setMovie(foundMovie);
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <main>
        <Header />
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#C45481",
          }}
        >
          <h1>Loading...</h1>
        </div>
        <Footer />
      </main>
    );
  }

  if (!movie) {
    return (
      <main>
        <Header />
        <div style={{ padding: "100px", textAlign: "center", color: "#C45481" }}>
          <h1>Article Not Found</h1>
          <Link href="/docs" style={{ textDecoration: "underline" }}>
            Back to Docs
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  // --- Article Layout (Past Lives, Sirāt) ---
  return (
    <main className="theme-white">
      <div className="editor-hero">
        <img src={movie.heroImg} alt={movie.title} className="editor-hero-img" />
        <Header isHome={true} customColor="#fff" />
      </div>

      <div className="content-wrapper">
        <article className="editor-article">
          <div className="article-header">
            <span className="article-date">JAN 27, 2026</span>
            <h1 className="article-title">{movie.title}</h1>
            <div className="article-meta-row">
              <span className="article-share">SHARE</span>
              <span className="article-author">Editor&apos;s Note</span>
            </div>
          </div>

          <div
            className="article-body article-body-kr"
            dangerouslySetInnerHTML={{ __html: movie.content }}
          />
        </article>

        <AboutSection />

        <Footer
          pillImg={movie.footerImg || movie.heroImg}
          title={movie.title}
          year={movie.year}
          director={movie.credits?.directedBy}
        />
      </div>
    </main>
  );
}
