"use client";

import { useState } from "react";
import "@/app/home.css"; // Reuse the styles we added

export default function TextHoverList() {
  const [hoverImg, setHoverImg] = useState("");
  const [listHoverOpacity, setListHoverOpacity] = useState(0);

  const textListFilms = [
    { name: "The Room Next Door", year: 2024, img: "hover/the_room_next_door.png" },
    { name: "On Becoming a Guinea Fowl", year: 2025, img: "hover/on_becoming_guinea_fowl.png" },
    { name: "Immaculate", year: 2024, img: "hover/immaculate.png" },
    { name: "Oldboy", year: 2003, img: "hover/oldboy.png" },
    { name: "Materialists", year: 2025, img: "hover/materialists.png" },
    { name: "The Zone of Interest", year: 2024, img: "hover/the_zone_of_interest.png" },
    { name: "Father Mother Sister Brother", year: 2026, img: "hover/father_mother_sister_brother.png" },
  ];

  return (
    <section className="section text-list-sec">
      <ul className="large-text-list">
        {textListFilms.map((film, index) => (
          <li
            key={index}
            onMouseEnter={() => {
              setHoverImg(`/images/page/all_films/${film.img}`);
              setListHoverOpacity(1);
            }}
            onMouseLeave={() => setListHoverOpacity(0)}
          >
            {film.name} <sup>{film.year}</sup>
          </li>
        ))}
      </ul>
      <div className="show-more">
        <img
          src="/images/page/all_films/show_more_arrow.svg"
          alt=""
          className="show-more-arrow"
        />
        <span>SHOW MORE</span>
      </div>

      <div
        className={`list-hover-img ${listHoverOpacity ? "visible" : ""}`}
        style={{ opacity: listHoverOpacity }}
      >
        <img src={hoverImg} alt="" className="hover-preview-img" />
      </div>
    </section>
  );
}
