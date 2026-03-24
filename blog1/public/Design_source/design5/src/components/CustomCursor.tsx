"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [cursorColor, setCursorColor] = useState("#C45481");
  const [rotation, setRotation] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // 1. Detect cursor color from site title
    const updateCursorColor = () => {
      const siteTitle = document.querySelector(".site-title") || 
                        document.querySelector(".showcase-site-title") || 
                        document.querySelector(".editor-site-title") ||
                        document.querySelector(".page-title-svg");
      
      if (siteTitle) {
        const computed = getComputedStyle(siteTitle).color;
        if (computed && computed !== "rgba(0, 0, 0, 0)") {
          setCursorColor(computed);
        }
      }
    };

    updateCursorColor();

    // 2. Mouse Move and Visibility
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    // 3. Cursor Tilt Logic (Rotation)
    const handleInteractiveEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveSelector = 'a, button, .social-card, .film-card, .gallery-item, .list-row, .view-icon, .show-more, .showcase-show-more, .large-text-list li, .showcase-text-list li, .tab, .hg-item';
      
      if (target.closest(interactiveSelector)) {
        const dir = (target.closest(interactiveSelector) as HTMLElement).getAttribute('data-cursor-dir');
        if (dir === 'left') {
          setRotation(90);
        } else {
          setRotation(-90);
        }
      }
    };

    const handleInteractiveLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveSelector = 'a, button, .social-card, .film-card, .gallery-item, .list-row, .view-icon, .show-more, .showcase-show-more, .large-text-list li, .showcase-text-list li, .tab, .hg-item';
      
      if (target.closest(interactiveSelector)) {
        setRotation(0);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", handleInteractiveEnter);
    document.addEventListener("mouseout", handleInteractiveLeave);

    // Re-check color on route change (since it's a SPA)
    const observer = new MutationObserver(updateCursorColor);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", handleInteractiveEnter);
      document.removeEventListener("mouseout", handleInteractiveLeave);
      observer.disconnect();
    };
  }, [visible]);

  if (!isMounted) return null;

  const cursorSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="114" height="117" viewBox="0 0 114 117" fill="none"><path d="M57.25 0.75V115.75M57.25 115.75L0.75 60.75M57.25 115.75L112.75 60.75" stroke="${cursorColor}" stroke-width="1.5" stroke-linecap="round"/></svg>`;

  return (
    <div
      className="custom-cursor"
      style={{
        display: visible ? "block" : "none",
        left: `${position.x}px`,
        top: `${position.y}px`,
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(cursorSVG)}")`,
        position: "fixed",
        pointerEvents: "none",
        zIndex: 9999,
        width: "114px",
        height: "117px",
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        transition: "transform 0.2s ease, opacity 0.2s ease",
      }}
    />
  );
}
