"use client";

import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import TextHoverList from "@/components/TextHoverList";
import Link from "next/link";
import WishlistButton from "@/components/WishlistButton";
import { useEffect, useState } from "react";
import "./film-showcase.css";
import "./film-detail.css";

// Import integrated movie data
import editorsNotes from "@/data/editors-notes.json";

export default function FilmDetailPage() {
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
        <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#C45481" }}>
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
          <h1>Film Not Found</h1>
          <Link href="/all-films" style={{ textDecoration: "underline" }}>Back to All Films</Link>
        </div>
        <Footer />
      </main>
    );
  }

  // Determine theme color for Header (Showcase only)
  const getThemeColor = () => {
    if (movie.theme === "theme-pink") return "#334671"; // Anora (Navy)
    if (movie.theme === "theme-navy") return "#1C2854"; // Anatomy (Dark Navy)
    if (movie.theme === "theme-slate") return "#FCE618"; // Parasite (Yellow)
    if (movie.theme === "theme-blue") return "#FCE618"; // Triangle (Yellow)
    if (movie.theme === "theme-red") return "#FCE618"; // No Other Choice, Accident (Yellow)
    return "#FCE618"; // Default showcase yellow
  };

  return (
    <main className={movie.theme || "theme-pink"}>
      {/* 1. Hero Section */}
      <div className="showcase-hero">
        <img src={movie.heroImg} alt={movie.title} className="showcase-hero-img" />

        {/* Header Overlay exactly like / page */}
        <Header isHome={true} customColor={getThemeColor()} />

        <header className="showcase-overlay" style={{ pointerEvents: "none" }}>
          {/* Movie info remains fixed in position relative to hero container */}
          <h1 className="showcase-movie-title"
            style={{ pointerEvents: "auto", fontWeight: 200 }}
            dangerouslySetInnerHTML={{ __html: movie.title }} />
          <span className="showcase-year" style={{ pointerEvents: "auto" }}>{movie.year}</span>
          <div className="showcase-hero-wishlist" style={{ pointerEvents: "auto" }}>
            <WishlistButton id={`${movie.slug}-hero`} />
          </div>
        </header>
      </div>

      <div className="content-wrapper">

        {/* 2. Info Section */}
        <section className="showcase-info">
          <div className="info-poster">
            <img src={movie.poster || movie.heroImg} alt="Poster" />
          </div>

          <div className="info-synopsis">
            <span className="info-label">SYNOPSIS</span>
            <div className="info-divider"></div>
            <p className="info-text">{movie.synopsis}</p>

            {movie.awards && movie.awards.length > 0 && (
              <div className="awards-block">
                <span className="info-label">AWARDS</span>
                <div className="awards-divider-full"></div>
                {movie.awards.map((award: any, i: number) => (
                  <div key={i} style={{ marginBottom: "1.5vw" }}>
                    <img src={award.icon} alt="" className={award.festival.includes("ACADEMY") ? "academy-award-icon" : "cannes-icon"} />
                    <span className="awards-festival">{award.festival}</span>
                    <span className="awards-detail">{award.detail}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="info-details">
            <span className="info-label">ADDITIONAL DETAILS</span>
            <div className="info-divider"></div>
            {movie.credits && (
              <>
                <div className="detail-group">
                  <span className="detail-label">DIRECTED BY</span>
                  <span className="detail-value">{movie.credits.directedBy}</span>
                </div>
                <div className="detail-group">
                  <span className="detail-label">WRITTEN BY</span>
                  <span className="detail-value">{movie.credits.writtenBy}</span>
                </div>
                <div className="detail-group starring">
                  <span className="detail-label">STARRING</span>
                  {movie.credits.starring.map((actor: string, i: number) => (
                    <span key={i} className="detail-value">{actor}</span>
                  ))}
                </div>
              </>
            )}
            {movie.ratingImg && (
              <div className="detail-group rating">
                <span className="detail-label">RATING</span>
                <img src={movie.ratingImg} alt="R" className="rating-img" />
              </div>
            )}
          </div>
        </section>

        {/* 3. Scene Section */}
        {movie.scene && (
          <section className="showcase-scene showcase-scene-wrapper">
            <img src={movie.scene.img} alt="Scene" />
            <div className="scene-quote" dangerouslySetInnerHTML={{ __html: movie.scene.quote }} />
          </section>
        )}

        {/* 4. Director Spotlight */}
        {movie.directorSpotlight && (
          <section className="showcase-director">
            <div className="director-photo">
              <img src={movie.directorSpotlight.photo} alt="Director" />
            </div>
            <div className="director-info">
              <span className="director-role">{movie.directorSpotlight.role}</span>
              <h2 className="director-name">
                {movie.directorSpotlight.name.map((n: string, i: number) => (
                  <span key={i}>{n}<br /></span>
                ))}
              </h2>
              <p className="director-quote">{movie.directorSpotlight.quote}</p>
            </div>
          </section>
        )}

        {/* 5. Gallery */}
        {movie.gallery && (
          <section className="showcase-gallery">
            <div className="gallery-header">
              <h2 className="gallery-title">Gallery</h2>
            </div>
            <div className="gallery-grid">
              {movie.gallery.map((img: string, i: number) => (
                <div key={i} className="gallery-item" style={{ position: "relative" }}>
                  <img src={img} alt={`Gallery ${i + 1}`} />
                  <div className="gallery-wishlist-pos" style={{ position: "absolute", bottom: "1.14vw", left: "1.14vw", zIndex: 10 }}>
                    <WishlistButton id={`${movie.slug}-gallery-${i}`} variant="gallery" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <TextHoverList />
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
