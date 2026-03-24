"use client";

import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import Link from "next/link";
import "../collections.css";

export default function CollectionsItem() {
  const column1 = [
    {
      name: "Starlet",
      img: "/images/page/collections/sean_baker/Starlet.png",
      type: "portrait-tall",
    },
    {
      name: "Left-Handed Girl",
      img: "/images/page/collections/sean_baker/Left-handed-girl2.png",
      type: "landscape",
    },
  ];

  const column2 = [
    {
      name: "The Florida Project",
      img: "/images/page/collections/sean_baker/TheFloridaProject1.png",
      type: "landscape",
    },
    {
      name: "The Florida Project",
      img: "/images/page/collections/sean_baker/TheFloridaProject2.png",
      type: "landscape",
    },
    { name: "Anora", img: "/images/page/collections/sean_baker/Anora.png", type: "landscape" },
  ];

  const column3 = [
    {
      name: "Tangerine",
      img: "/images/page/collections/sean_baker/Tangerine.png",
      type: "portrait-tall",
    },
    {
      name: "Left-Handed Girl",
      img: "/images/page/collections/sean_baker/Left-handed-girl1.png",
      type: "portrait-tall",
    },
  ];

  return (
    <main className="theme-green">
      <header className="section-header">
        <div className="top-nav">
          <Link href="/" className="site-title" style={{ color: "#90FC82" }}>
            Mean girls
          </Link>
          <nav className="mini-nav">
            <Link href="/all-films" style={{ color: "#90FC82" }}>
              All Films
            </Link>
            <Link href="/collections" className="active" style={{ color: "#90FC82" }}>
              Collections
            </Link>
            <Link href="/docs" style={{ color: "#90FC82" }}>
              Docs
            </Link>
            <a href="#" style={{ color: "#90FC82" }}>
              About
            </a>
          </nav>
        </div>

        <div className="header-main">
          <img
            src="/images/page/collections/collections.svg"
            alt="COLLECTIONS"
            className="page-title-svg-collections"
          />
        </div>
      </header>

      <div className="content-wrapper">
        <h2 className="section-subtitle" style={{ color: "#EB3DF7" }}>
          DIRECTOR
        </h2>

        <section className="sb-content">
          <div className="sb-header-title">
            <img
              src="/images/page/collections/sean_baker/Sean-baker.svg"
              alt="Collections Director Sean Baker"
              className="sb-header-svg"
            />
          </div>

          <div className="hotgirls-three-columns">
            <div className="hg-col">
              {column1.map((f, i) => (
                <div key={i} className="sb-grid-item">
                  <div className={`hg-item ${f.type}`}>
                    <img src={f.img} alt={f.name} />
                  </div>
                  <span className="sb-grid-caption">{f.name}</span>
                </div>
              ))}
            </div>

            <div className="hg-col center">
              {column2.map((f, i) => (
                <div key={i} className="sb-grid-item">
                  <div className={`hg-item ${f.type}`}>
                    <img src={f.img} alt={f.name} />
                  </div>
                  <span className="sb-grid-caption">{f.name}</span>
                </div>
              ))}
            </div>

            <div className="hg-col">
              {column3.map((f, i) => (
                <div key={i} className="sb-grid-item">
                  <div className={`hg-item ${f.type}`}>
                    <img src={f.img} alt={f.name} />
                  </div>
                  <span className="sb-grid-caption">{f.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <AboutSection />
      </div>
      <Footer />
    </main>
  );
}
