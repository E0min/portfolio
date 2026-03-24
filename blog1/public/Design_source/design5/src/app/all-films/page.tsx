"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilmCard from "@/components/FilmCard";
import FilmListView from "@/components/FilmListView";
import AboutSection from "@/components/AboutSection";
import TextHoverList from "@/components/TextHoverList";
import "./all-films.css";

export default function AllFilms() {
  const [view, setView] = useState<"grid" | "list">("grid");

  const upcomingFilms = {
    col1: [
      { name: "Arco", img: "/images/page/all_films/arco.png", type: "portrait-tall" },
      { name: "The Devil Wears Prada 2", img: "/images/page/all_films/devil_wears_prada_2.png", type: "landscape" },
      { name: "Monica's News", img: "/images/page/all_films/monicas_news.png", type: "portrait-tall" },
    ],
    col2: [
      { name: "Sirāt", img: "/images/page/all_films/sirat.png", type: "landscape" },
      { name: "5 Centimeters per Second", img: "/images/page/all_films/five_centimeters.png", type: "landscape" },
    ],
    col3: [
      { name: "The Chronology of Water", img: "/images/page/all_films/chronology_of_water.png", type: "portrait-tall" },
      { name: "The Drama", img: "/images/page/all_films/the_drama.png", type: "portrait-tall" },
    ],
  };

  const gridFilms = [
    { name: "ON BECOMING A GUINEA FOWL", img: "/images/page/all_films/on_becoming_guinea_fowl.png" },
    { name: "Parasite", img: "/images/page/home/parasite.png", slug: "parasite", award: true },
    { name: "Emilia Perez", img: "/images/page/all_films/emilia_perez.png" },
    { name: "Spencer", img: "/images/page/home/spencer.png", academy: true },
    { name: "Past Lives", img: "/images/page/home/past_lives.png", slug: "past-lives" },
    { name: "No other choice", img: "/images/page/all_films/no_other_choice.png", slug: "no-other-choice" },
    { name: "Anora", img: "/images/page/home/anora.png", slug: "anora", academy: true, award: true },
    { name: "All the Beauty and the Bloodshed", img: "/images/page/all_films/all_the_beauty.png", academy: true },
    { name: "The Life of Chuck", img: "/images/page/all_films/life_of_chuck.png" },
    { name: "It Was Just an Accident", img: "/images/page/home/it_was_just_an_accident.png", slug: "it-was-just-an-accident", award: true },
    { name: "Memories Of Murder", img: "/images/page/all_films/memories_of_murder.png" },
    { name: "Perfect Days", img: "/images/page/all_films/perfect_days.png", academy: true, award: true },
    { name: "Anatomy of a Fall", img: "/images/page/home/anatomy_of_a_fall.png", slug: "anatomy-of-a-fall", academy: true, award: true },
    { name: "Triangle of Sadness", img: "/images/page/home/triangle_of_sadness.png", slug: "triangle-of-sadness", academy: true, award: true },
    { name: "Sirat", img: "/images/page/all_films/sirat.png", comingSoon: true },
  ];

  const listFilms = [
    { title: "Marty Supreme", dir: "Josh Safdie", genre: "Sports Comedy Drama", year: "2025", img: "marty_supreme.png" },
    { title: "Bugonia", dir: "Yorgos Lanthimos", genre: "Thriller", year: "2025", img: "bugonia.png" },
    { title: "The Exit 8", dir: "Kawamura Genki", genre: "Thriller", year: "2025", img: "the_exit_8.png" },
    { title: "No Other Choice", dir: "Park Chan Wook", genre: "Thriller", year: "2025", img: "it_was_just_an_accident.png", slug: "no-other-choice" },
    { title: "The Phoenician Scheme", dir: "Wes Anderson", genre: "Comedy Drama", year: "2025", img: "the_phoenician_scheme.png" },
    { title: "Titanic", dir: "James Cameron", genre: "Romance", year: "1998", img: "titanic.png" },
    { title: "Pulp Fiction", dir: "Quentin Tarantino", genre: "Crime", year: "1994", img: "pulp_fiction.png" },
    { title: "Parasite", dir: "Bong Joon-ho", genre: "Black Comedy", year: "2019", img: "parasite.png", slug: "parasite" },
    { title: "The Amazing Spider Man", dir: "Marc Webb", genre: "Action", year: "2012", img: "the_amazing_spider_man.png" },
    { title: "It Was Just an Accident", dir: "Jafar Panahi", genre: "Thriller", year: "2025", img: "it_was_just_an_accident.png", slug: "it-was-just-an-accident" },
    { title: "Joker", dir: "Todd Phillips", genre: "Psychological Thriller", year: "2019", img: "joker.png" },
    { title: "Coraline", dir: "Henry Selick", genre: "Dark Fantasy", year: "2009", img: "coraline.png" },
    { title: "The Substance", dir: "Coralie Fargeat", genre: "Body Horror", year: "2024", img: "the_substance.png" },
    { title: "Sirāt", dir: "Olivier Laxe", genre: "Drama", year: "2026", img: "sirat.png" },
    { title: "Elio", dir: "Madeline Sharafian", genre: "Animation", year: "2025", img: "elio.png" },
    { title: "Ratatouille", dir: "Brad Bird", genre: "Animation", year: "2007", img: "ratatouille.png" },
    { title: "Joker: Folie à Deux", dir: "Todd Phillips", genre: "Musical Crime Drama", year: "2024", img: "joker_folie_a_deux.png" },
    { title: "Anora", dir: "Sean Baker", genre: "Romantic Comedy-Drama", year: "2024", img: "anora.png", slug: "anora" },
    { title: "Kill Bill: Vol. 1", dir: "Quentin Tarantino", genre: "Revenge Film", year: "2003", img: "kill_bill.png" },
    { title: "Small Things Like These", dir: "Tim Mielants", genre: "Drama", year: "2024", img: "small_things_like_these.png" },
    { title: "Oldboy", dir: "Park Chan-wook", genre: "Revenge Thriller", year: "2003", img: "oldboy.png" },
    { title: "Pretty Woman", dir: "Garry Marshall", genre: "Romantic Comedy", year: "1990", img: "pretty_woman.png" },
    { title: "The Grand Budapest Hotel", dir: "Wes Anderson", genre: "Comedy Drama", year: "2014", img: "the_grand_budapest_hotel.png" },
    { title: "La La Land", dir: "Damien Chazelle", genre: "Musical", year: "2016", img: "la_la_land.png" },
    { title: "Charlie and the Chocolate Factory", dir: "Tim Burton", genre: "Dark Fairy Tale", year: "2005", img: "charlie_chocolate_factory.png" },
    { title: "Mickey 17", dir: "Bong Joon-ho", genre: "Sci-Fi", year: "2025", img: "mickey_17.png" },
    { title: "Saving Private Ryan", dir: "Steven Spielberg", genre: "War", year: "1998", img: "saving_private_ryan.png" },
    { title: "The Devil Wears Prada", dir: "David Frankel", genre: "Comedy Drama", year: "2006", img: "the_devil_wears_prada.png" },
    { title: "Taxi Driver", dir: "Martin Scorsese", genre: "Psychological Drama", year: "1976", img: "taxi_driver.png" },
    { title: "Amélie", dir: "Jean-Pierre Jeunet", genre: "Romantic Comedy", year: "2001", img: "amelie.png" },
  ];

  return (
    <main>
      <Header />

      <header className="section-header">
        <div className="header-main">
          <img
            src="/images/svg/all_films/ALL FILMS.svg"
            alt="ALL FILMS"
            className="page-title-svg"
          />
          <div className="header-icons">
            <div className="view-toggle">
              <img
                src="/images/svg/all_films/gallery.svg"
                alt="Gallery View"
                className={`view-icon ${view === "grid" ? "active" : ""}`}
                id="btn-grid-view"
                onClick={() => setView("grid")}
              />
              <img
                src="/images/svg/all_films/list.svg"
                alt="List View"
                className={`view-icon ${view === "list" ? "active" : ""}`}
                id="btn-list-view"
                onClick={() => setView("list")}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="content-wrapper">
        {/* Grid View Container */}
        <div id="view-grid" className={view === "grid" ? "" : "hidden"}>
          {/* 1. Upcoming Section */}
          <section className="section hotgirls">
            <h2 className="section-subtitle">Upcoming</h2>
            <div className="hotgirls-three-columns">
              <div className="hg-col">
                {upcomingFilms.col1.map((f, i) => (
                  <div key={i} className="hg-item-wrapper">
                    <div className={`hg-item ${f.type}`}>
                      <img src={f.img} alt={f.name} className="hg-img" />
                    </div>
                    <span className="hg-caption">{f.name}</span>
                  </div>
                ))}
              </div>
              <div className="hg-col center">
                {upcomingFilms.col2.map((f, i) => (
                  <div key={i} className="hg-item-wrapper">
                    <div className={`hg-item ${f.type}`}>
                      <img src={f.img} alt={f.name} className="hg-img" />
                    </div>
                    <span className="hg-caption">{f.name}</span>
                  </div>
                ))}
              </div>
              <div className="hg-col">
                {upcomingFilms.col3.map((f, i) => (
                  <div key={i} className="hg-item-wrapper">
                    <div className={`hg-item ${f.type}`}>
                      <img src={f.img} alt={f.name} className="hg-img" />
                    </div>
                    <span className="hg-caption">{f.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 2. AllFilms Grid Section */}
          <section className="section allfilms-grid-sec">
            <h2 className="section-subtitle">AllFilms</h2>
            <div className="films-grid">
              {gridFilms.map((f, i) => (
                <FilmCard key={i} {...f} />
              ))}
            </div>
          </section>
        </div>

        {/* List View Container */}
        <div id="view-list" className={view === "list" ? "" : "hidden"}>
          <FilmListView films={listFilms} />
        </div>

        <TextHoverList />

        <AboutSection />

        <Footer pillImg="/images/page/all_films/all_the_beauty.png" />
      </div>
    </main>
  );
}
