import Link from "next/link";
import React from "react";

export interface EditorialRowProps {
  label?: React.ReactNode;
  title: React.ReactNode;
  img: string;
  link?: string;
  reverse?: boolean;
  textSide?: "left" | "right";
  imgSide?: "left" | "right";
  alignRight?: boolean;
  readMore?: boolean;
  titleStyle?: React.CSSProperties;
  className?: string;
}

export default function EditorialRow({
  label,
  title,
  img,
  link,
  reverse,
  textSide = "left",
  imgSide = "right",
  alignRight,
  readMore,
  titleStyle,
  className = "",
}: EditorialRowProps) {
  // Use generic editorial classes, fallback to collection-row for CSS compatibility if needed
  const rowClass = `editorial-row collection-row ${reverse ? "reverse" : ""} ${className}`;
  const textClass = `editorial-text col-text ${textSide}`;
  const labelClass = `editorial-label col-kicker`; // Mapping label to kicker for existing CSS
  const titleClass = `editorial-title col-title ${alignRight ? "align-right" : ""}`;
  const imageClass = `editorial-image col-image ${imgSide}`;
  const readMoreClass = `read-more-arrow`;

  const content = (
    <div className={rowClass}>
      <div className={textClass}>
        {label && <span className={labelClass}>{label}</span>}
        <h2 className={titleClass} style={titleStyle}>
          {title}
        </h2>
        {readMore && (
          <div className="read-more">
            <img src="/images/page/docs/arrow_right.svg" alt="" className={readMoreClass} />
            READ MORE
          </div>
        )}
      </div>
      <div className={imageClass}>
        <img src={img} alt="Editorial content" className="editorial-img collection-img" />
      </div>
    </div>
  );

  if (link && link !== "#") {
    return (
      <Link href={link} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
        {content}
      </Link>
    );
  }

  return <div>{content}</div>;
}
