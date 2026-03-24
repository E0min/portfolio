"use client";

import { useState, useEffect } from "react";

interface WishlistButtonProps {
  id: string;
  variant?: "default" | "red" | "gallery";
}

export default function WishlistButton({ id, variant = "default" }: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Load initial state from localStorage
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("mean_wishlist") || "[]");
    setIsWishlisted(wishlist.includes(id));
  }, [id]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const wishlist = JSON.parse(localStorage.getItem("mean_wishlist") || "[]");
    let newWishlist;
    
    if (isWishlisted) {
      newWishlist = wishlist.filter((item: string) => item !== id);
    } else {
      newWishlist = [...wishlist, id];
    }
    
    localStorage.setItem("mean_wishlist", JSON.stringify(newWishlist));
    setIsWishlisted(!isWishlisted);
  };

  const getColors = () => {
    if (variant === "red") return { primary: "#DD2D2A" };
    if (variant === "gallery") return { primary: "#fff" };
    return { primary: "#FFE642" }; // Default (Home Docs)
  };

  const colors = getColors();

  return (
    <div 
      className={`wishlist-container ${variant}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={toggleWishlist}
      style={{ cursor: "pointer", position: "relative", display: "flex", alignItems: "center", gap: "10px" }}
    >
      {/* Heart Icons */}
      <div className="heart-wrapper" style={{ position: "relative", width: "4.2vw", height: "4.2vw" }}>
        {!isWishlisted ? (
          <i className="fa-regular fa-heart" style={{ fontSize: "3.5vw", color: colors.primary }}></i>
        ) : (
          <i className="fa-solid fa-heart" style={{ fontSize: "3.5vw", color: colors.primary }}></i>
        )}
      </div>

      {/* Remove Text Overlay (Shown only when Wishlisted AND Hovered) */}
      {isWishlisted && isHovered && (
        <div className="wishlist-text" style={{ 
          display: "flex", 
          flexDirection: "column", 
          fontFamily: "var(--font-bebas-neue), sans-serif",
          fontSize: "1.5vw",
          color: colors.primary,
          lineHeight: "1.1",
          letterSpacing: "-0.05em",
          textTransform: "uppercase"
        }}>
          <span>remove</span>
          <span>from</span>
          <span>wishlist</span>
        </div>
      )}
    </div>
  );
}
