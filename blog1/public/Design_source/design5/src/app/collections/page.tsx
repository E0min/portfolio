"use client";

import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import EditorialRow, { EditorialRowProps } from "@/components/EditorialRow";
import Link from "next/link";
import "./collections.css";

// Interface for collections to match EditorialRowProps
interface CollectionItem extends EditorialRowProps {
  key?: number;
}

export default function CollectionsLists() {
  const collections: CollectionItem[] = [
    {
      label: (
        <>
          2023
          <br />
          DIRECTOR OF ANORA
        </>
      ),
      title: (
        <>
          GREAT
          <br />
          AMERICAN
          <br />
          DREAM
          <br />
          SEAN BAKER
        </>
      ),
      img: "/images/page/collections/sean_baker.png",
      link: "/collections/collections-item",
      reverse: false,
      textSide: "left",
      imgSide: "right",
    },
    {
      label: "DIRECTOR OF MATERIALISTS",
      title: (
        <>
          CREATIVE
          <br />
          AFFAIR
          <br />
          WITH
          <br />
          CELINE SONG
        </>
      ),
      img: "/images/page/collections/celine song.png",
      reverse: true,
      textSide: "right",
      imgSide: "left",
      alignRight: true,
    },
    {
      label: "DIRECTOR OF No other choice",
      title: (
        <>
          BLEAK
          <br />
          BLOODY
          <br />
          VISION
          <br />
          PARK CHAN-WOOK
        </>
      ),
      img: "/images/page/collections/park_chan_wook.png",
      reverse: false,
      textSide: "left",
      imgSide: "right",
    },
    {
      title: (
        <>
          HUMAN
          <br />
          BEHAVIOR
          <br />
          OBSERVED
          <br />
          RUBEN OSTLUND
        </>
      ),
      label: "DIRECTOR OF TRIANGLE OF SADNESS",
      img: "/images/page/collections/ruben.png",
      reverse: true,
      textSide: "right",
      imgSide: "left",
      alignRight: true,
      readMore: false,
    },
    {
      label: "DIRECTOR OF No other choice",
      title: (
        <>
          THE MEANS
          <br />
          GUIDE TO
          <br />
          WIM
          <br />
          WENDERS
        </>
      ),
      img: "/images/page/collections/wim_wenders.png",
      reverse: false,
      textSide: "left",
      imgSide: "right",
      titleStyle: { color: "#e95538" },
    },
  ];

  return (
    <main className="theme-green">
      {/* 1:1 Matching Original Header Structure */}
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

        <div className="header-main" style={{ position: "relative" }}></div>
      </header>

      <div className="content-wrapper">
        <section className="collections-list">
          {collections.map((col, idx) => (
            <EditorialRow key={idx} {...col} />
          ))}
        </section>

        <AboutSection />
      </div>
      <Footer />
    </main>
  );
}
