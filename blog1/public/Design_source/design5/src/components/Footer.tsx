import Link from "next/link";

interface FooterProps {
  pillImg?: string;
  title?: string;
  year?: string;
  director?: string;
}

export default function Footer({ pillImg, title, year, director }: FooterProps) {
  return (
    <footer className="main-footer">
      <div className="footer-logo">
        <div className="footer-logo-wrapper">
          <img src="/images/svg/me n.svg" alt="ME N" className="men-svg" />
          <div className="footer-pill">
            <img
              src={pillImg || "/images/page/home/footer_anatomy.png"}
              alt={title || "Footer Image"}
              className="footer-img-bg"
            />
          </div>
        </div>
      </div>
      {title && (
        <div className="footer-film-info">
          <span
            className="footer-film-title"
            dangerouslySetInnerHTML={{ __html: title.replace("<br>", " ") }}
          />
          <span className="footer-film-detail">
            {year}, Directed by {director || "Various"}
          </span>
        </div>
      )}
    </footer>
  );
}
