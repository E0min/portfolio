"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./FilmListView.css";

interface FilmItem {
  title: string;
  dir: string;
  genre: string;
  year: string;
  img: string;
  slug?: string;
}

interface FilmListViewProps {
  films: FilmItem[];
}

// Sub-component for individual rows
function FilmListRow({
  title,
  dir,
  genre,
  year,
  img,
  slug,
  onMouseEnter,
  onMouseLeave,
}: FilmItem & { onMouseEnter: (img: string) => void; onMouseLeave: () => void }) {
  const RowContent = (
    <>
      <div className="list-col title">{title}</div>
      <div className="list-col meta">
        <div className="label">DIRECTOR</div>
        <div className="value">{dir}</div>
      </div>
      <div className="list-col meta">
        <div className="label">GENRE</div>
        <div className="value">{genre}</div>
      </div>
      <div className="list-col meta">
        <div className="label">RELEASE DATE</div>
        <div className="value">{year}</div>
      </div>
    </>
  );

  const handleMouseEnter = () => {
    onMouseEnter(`/images/page/all_films/posters/${img}`);
  };

  return slug ? (
    <Link
      href={`/editors-note/${slug}`}
      className="list-row"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {RowContent}
    </Link>
  ) : (
    <div
      className="list-row"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {RowContent}
    </div>
  );
}

export default function FilmListView({ films }: FilmListViewProps) {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorImg, setCursorImg] = useState("");
  const [cursorVisible, setCursorVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!isMounted) {
    return <div className="list-view-content" style={{ minHeight: "100vh" }}></div>;
  }

  return (
    <div className="list-view-content">
      {films.map((item, idx) => (
        <FilmListRow
          key={idx}
          {...item}
          onMouseEnter={(img) => {
            setCursorImg(img);
            setCursorVisible(true);
          }}
          onMouseLeave={() => setCursorVisible(false)}
        />
      ))}

      {/* Cursor Follow Image */}
      <div
        id="cursor-img"
        style={{
          display: cursorVisible ? "block" : "none",
          left: cursorPos.x + 20,
          top: cursorPos.y + 20,
          opacity: cursorVisible ? 1 : 0,
        }}
      >
        <img 
          src={cursorImg} 
          alt="" 
          className="cursor-poster-img" 
        />
      </div>
    </div>
  );
}
