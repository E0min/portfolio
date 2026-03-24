"use client";

import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="section about">
      <h2 className="section-title">ABOUT</h2>
      <div className="about-grid">
        <div className="about-card">
          <h4>Films</h4>
          <div className="card-bottom vertical-links">
            <Link href="/all-films">All</Link>
            <br />
            <a href="#">Upcoming</a>
          </div>
        </div>
        <div className="about-card">
          <h4>edits</h4>
          <div className="card-bottom vertical-links">
            <Link href="/"><u>Home</u></Link>
            <Link href="/docs">Docs</Link>
            <Link href="/collections">Collections</Link>
          </div>
        </div>
        <div className="about-card">
          <h4>MEan</h4>
          <div className="mean-content">
            <p className="en-desc"><strong>MEAN</strong> is an editorial platform<br />built around selection, interpretation, and record.</p>
            <p className="kr-desc"><strong>MEAN</strong>은 선택, 해석, 기록을 중심으로<br />영화를 다루는 에디토리얼 플랫폼입니다.</p>
          </div>
        </div>
        <div className="social-wrapper">
          <div className="social-row top">
            <div className="social-card"><i className="fab fa-instagram"></i></div>
            <div className="social-card"><i className="fab fa-tiktok"></i></div>
          </div>
          <div className="social-row bottom">
            <div className="social-card"><i className="fa-brands fa-x-twitter"></i></div>
            <div className="social-card"><i className="fab fa-facebook-f"></i></div>
            <div className="social-card"><i className="fab fa-youtube"></i></div>
          </div>
        </div>
      </div>
    </section>
  );
}
