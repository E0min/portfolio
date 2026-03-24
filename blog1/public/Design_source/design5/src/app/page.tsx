"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import EditorialRow from "@/components/EditorialRow";
import WishlistButton from "@/components/WishlistButton";
import AboutSection from "@/components/AboutSection";
import { useState } from "react";
import "./home.css";

import TextHoverList from "@/components/TextHoverList";

export default function Home() {
  const [hoverImg, setHoverImg] = useState("");
  const [listHoverOpacity, setListHoverOpacity] = useState(0);

  const textListFilms = [
    {
      name: "The Room Next Door",
      year: 2024,
      img: "hover/the_room_next_door.png",
    },
    {
      name: "On Becoming a Guinea Fowl",
      year: 2025,
      img: "hover/on_becoming_guinea_fowl.png",
    },
    { name: "Immaculate", year: 2024, img: "hover/immaculate.png" },
    { name: "Oldboy", year: 2003, img: "hover/oldboy.png" },
    { name: "Materialists", year: 2025, img: "hover/materialists.png" },
    {
      name: "The Zone of Interest",
      year: 2024,
      img: "hover/the_zone_of_interest.png",
    },
    {
      name: "Father Mother Sister Brother",
      year: 2026,
      img: "hover/father_mother_sister_brother.png",
    },
  ];

  return (
    <main>
      <Header isHome={true} />

      {/* Hero Section */}
      <section className="section hero">
        <div className="hero-bg">
          <img src="/images/image_1140_61.png" alt="Hero Background" />
        </div>

        <div className="hero-content">
          <ul className="hero-title-list">
            <li>
              <Link href="/editors-note/no-other-choice">
                nO other choice <span>2025</span>
              </Link>
            </li>
            <li>
              <Link href="/editors-note/parasite">
                PARASite <span>2019</span>
              </Link>
            </li>
            <li className="active">
              <Link href="/editors-note/past-lives">
                past lives <span>2023</span>
              </Link>
            </li>
            <li>
              <Link href="/editors-note/anora">
                anora <span>2024</span>
              </Link>
            </li>
            <li>
              <Link href="/editors-note/anatomy-of-a-fall">
                anAtomy of a fall <span>2023</span>
              </Link>
            </li>
            <li>
              <Link href="/editors-note/it-was-just-an-accident">
                It Was Just an Accidente <span>2025</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <div className="content-wrapper">
        {/* ALL FILMS */}
        <section className="section all-films">
          <h2 className="section-title">ALL FILMS</h2>
          <div className="grid-2-col">
            <Link href="/editors-note/no-other-choice" className="card">
              <div className="card-img rect-large">
                <img src="/images/page/home/no_other_choice.png" alt="No Other Choice" />
              </div>
              <div className="card-info">
                <span className="card-title">No other choice</span>
              </div>
            </Link>
            <Link href="/editors-note/parasite" className="card">
              <div className="card-img rect-large">
                <img src="/images/page/home/parasite.png" alt="Parasite" />
              </div>
              <div className="card-info">
                <span className="card-title">Parasite</span>
                <img src="/images/page/home/award_icon.png" alt="" className="card-award-icon" />
              </div>
            </Link>
          </div>
        </section>

        {/* DOCS */}
        <section className="section docs-home">
          <h2 className="section-title">Docs</h2>
          <div className="docs-carousel">
            <div className="docs-track">
              <div className="docs-slide-wrapper" style={{ position: "relative" }}>
                <Link href="/docs/past-lives" className="docs-slide">
                  <img
                    src="/images/page/home/past_lives.png"
                    alt="Past Lives"
                    className="docs-slide-img"
                  />
                  <div className="docs-overlay">
                    <span className="docs-label">IN THEATERS JAN 19, 2026</span>
                    <h3 className="docs-movie-title">past lives</h3>
                    <span className="docs-year">2024</span>
                  </div>
                </Link>
                <div
                  className="docs-wishlist"
                  style={{
                    position: "absolute",
                    bottom: "3.125vw",
                    left: "1.6146vw",
                    zIndex: 10,
                  }}
                >
                  <WishlistButton id="past-lives" />
                </div>
              </div>

              <div className="docs-slide-wrapper" style={{ position: "relative" }}>
                <div className="docs-slide">
                  <img
                    src="/images/page/home/spencer.png"
                    alt="Spencer"
                    className="docs-slide-img"
                  />
                  <div className="docs-overlay red">
                    <span className="docs-label">IN THEATERS JAN 19, 2026</span>
                    <h3 className="docs-movie-title">SPencer</h3>
                    <span className="docs-year">2021</span>
                  </div>
                </div>
                <div
                  className="docs-wishlist red"
                  style={{
                    position: "absolute",
                    bottom: "3.125vw",
                    left: "1.6146vw",
                    zIndex: 10,
                  }}
                >
                  <WishlistButton id="spencer" variant="red" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COLLECTIONS */}
        <section className="section collections">
          <h2 className="section-title">COLLECTIONS</h2>
          <Link href="/collections/collections-item" className="collections-container">
            <div className="pink-card">
              <span className="role-label">DIRECTOR OF ANORA</span>
              <h3 className="name-title">
                GREAT
                <br />
                AMERICAN
                <br />
                DREAM
                <br />
                SEAN BAKER
              </h3>
            </div>
            <div className="photo-card">
              <img src="/images/page/home/sean_baker.png" alt="Sean Baker" className="portrait" />
            </div>
          </Link>
        </section>

        {/* AWARD WINNERS */}
        <section className="section awards">
          <h2 className="section-title">AWARd winners</h2>
          <div className="grid-4-col">
            <Link href="/editors-note/anora" className="card">
              <div className="card-img rect-small">
                <img src="/images/page/home/anora.png" alt="Anora" />
              </div>
              <div className="card-caption">
                <span>Anora</span>
                <span className="award-icons">
                  <img
                    src="/images/page/home/academy_triangle.png"
                    alt=""
                    className="academy-icon"
                  />
                  <img src="/images/page/home/award_icon.png" alt="" className="award-badge" />
                </span>
              </div>
            </Link>
            <Link href="/editors-note/triangle-of-sadness" className="card">
              <div className="card-img rect-small">
                <img src="/images/page/home/triangle_of_sadness.png" alt="Triangle of Sadness" />
              </div>
              <div className="card-caption">
                <span>Triangle of Sadness</span>
                <span className="award-icons">
                  <img
                    src="/images/page/home/academy_triangle.png"
                    alt=""
                    className="academy-icon"
                  />
                  <img src="/images/page/home/award_icon.png" alt="" className="award-badge" />
                </span>
              </div>
            </Link>
            <Link href="/editors-note/anatomy-of-a-fall" className="card">
              <div className="card-img rect-small">
                <img src="/images/page/home/anatomy_of_a_fall.png" alt="Anatomy of a Fall" />
              </div>
              <div className="card-caption">
                <span>Anatomy of a Fall</span>
                <span className="award-icons">
                  <img
                    src="/images/page/home/academy_triangle.png"
                    alt=""
                    className="academy-icon"
                  />
                  <img src="/images/page/home/award_icon.png" alt="" className="award-badge" />
                </span>
              </div>
            </Link>
            <Link href="/editors-note/it-was-just-an-accident" className="card">
              <div className="card-img rect-small">
                <img
                  src="/images/page/home/it_was_just_an_accident.png"
                  alt="It Was Just an Accident"
                />
              </div>
              <div className="card-caption">
                <span>It Was Just an Accident</span>
                <span className="award-icons">
                  <img src="/images/page/home/award_icon.png" alt="" className="award-badge" />
                </span>
              </div>
            </Link>
          </div>
        </section>

        <TextHoverList />

        <AboutSection />

        <Footer />
      </div>
    </main>
  );
}
