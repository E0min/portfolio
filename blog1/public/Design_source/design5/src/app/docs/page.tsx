"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import EditorialRow from "@/components/EditorialRow";
import "./docs.css";

export default function Docs() {
  const [activeTab, setActiveTab] = useState<"all" | "articles" | "zines">("all");

  const articles = [
    {
      label: "ARTICLE",
      title: (
        <>
          The Film
          <br />
          Everyone Is
          <br />
          Arguing
          <br />
          About: Sirāt
        </>
      ),
      img: "/images/page/docs/sirat.png",
      link: "/docs/sirat",
      reverse: false,
      textSide: "left" as const,
      imgSide: "left" as const,
      readMore: true,
    },
    {
      label: "ARTICLE",
      title: (
        <>
          Space & Time:
          <br />
          A Note
          <br />
          from
          <br />
          Celine Song
        </>
      ),
      img: "/images/page/docs/past_lives.png",
      link: "/docs/past-lives",
      reverse: true,
      textSide: "left" as const,
      imgSide: "right" as const,
      readMore: true,
    },
    {
      label: "ARTICLE",
      title: (
        <>
          Joker:
          <br />
          Folie à Deux
          <br />
          There Is
          <br />
          No Joker
        </>
      ),
      img: "/images/page/docs/joker_folie_a_deux.png",
      link: "#",
      reverse: false,
      textSide: "left" as const,
      imgSide: "left" as const,
      readMore: true,
    },
    {
      label: "ARTICLE",
      title: (
        <>
          Space & Time:
          <br />
          A Note
          <br />
          from
          <br />
          Celine Song
        </>
      ),
      img: "/images/page/docs/midsommar.png",
      link: "/docs/past-lives",
      reverse: true,
      textSide: "left" as const,
      imgSide: "right" as const,
      readMore: true,
    },
    {
      label: "ARTICLE",
      title: (
        <>
          A Dangerous
          <br />
          Woman:
          <br />
          Too Much for
          <br />
          Her Age
        </>
      ),
      img: "/images/page/docs/fourthgrader_bogyeong.png",
      link: "#",
      reverse: false,
      textSide: "left" as const,
      imgSide: "left" as const,
      readMore: true,
    },
  ];

  const zines = [
    {
      label: "ARTICLE",
      title: (
        <>
          Arco:
          <br />
          A Rainbow
          <br />
          Adventure of
          <br />
          Time Travel
          <br />
          &
          <br />
          Friendship
        </>
      ),
      img: "/images/page/docs/arco.png",
      link: "#",
      reverse: true,
      textSide: "left" as const,
      imgSide: "right" as const,
      readMore: true,
    },
    {
      label: "ARTICLE",
      title: (
        <>
          How to Paint
          <br />
          a Movie:
          <br />
          MinarI
        </>
      ),
      img: "/images/page/docs/minary.png",
      link: "#",
      reverse: false,
      textSide: "left" as const,
      imgSide: "left" as const,
      readMore: true,
    },
    {
      label: "ARTICLE",
      title: (
        <>
          Poster Boy:
          <br />
          Sean Baker
          <br />
          (&
          <br />
          his
          <br />
          Chihuahuas)
        </>
      ),
      img: "/images/page/docs/poster_boy.png",
      link: "#",
      reverse: true,
      textSide: "left" as const,
      imgSide: "right" as const,
      readMore: true,
    },
    {
      label: "ARTICLE",
      title: (
        <>
          Wes
          <br />
          Anderson
          <br />
          Returns to
          <br />
          Montblanc
        </>
      ),
      img: "/images/page/docs/montblanc.png",
      link: "#",
      reverse: false,
      textSide: "left" as const,
      imgSide: "left" as const,
      readMore: true,
    },
  ];

  return (
    <main>
      <Header />
      <div className="content-wrapper">
        <section className="docs-hero">
          <img src="/images/svg/DOCS.svg" alt="DOCS" className="docs-title-svg" />
          <div className="docs-tabs">
            <span
              className={`tab ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All
            </span>
            <span
              className={`tab ${activeTab === "articles" ? "active" : ""}`}
              onClick={() => setActiveTab("articles")}
            >
              Articles
            </span>
            <span
              className={`tab ${activeTab === "zines" ? "active" : ""}`}
              onClick={() => setActiveTab("zines")}
            >
              Zines
            </span>
          </div>
        </section>

        <div className="docs-content-container">
          {(activeTab === "all" || activeTab === "articles") && (
            <section className="docs-articles" data-tab="articles">
              {articles.map((card, idx) => (
                <EditorialRow key={`art-${idx}`} {...card} className="article-card" />
              ))}
            </section>
          )}

          {(activeTab === "all" || activeTab === "zines") && (
            <section className="docs-articles" data-tab="zines">
              {zines.map((card, idx) => (
                <EditorialRow key={`zine-${idx}`} {...card} className="article-card" />
              ))}
            </section>
          )}
        </div>

        {/* About Section */}
        <AboutSection />
      </div>
      <Footer />
    </main>
  );
}
