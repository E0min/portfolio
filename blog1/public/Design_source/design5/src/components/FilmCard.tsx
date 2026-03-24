import Link from "next/link";

interface FilmCardProps {
  name: string;
  img: string;
  slug?: string;
  academy?: boolean;
  award?: boolean;
  comingSoon?: boolean;
}

export default function FilmCard({ name, img, slug, academy, award, comingSoon }: FilmCardProps) {
  const CardContent = (
    <>
      <div className={`film-img ${comingSoon ? "coming-soon" : ""}`}>
        <img src={img} alt={name} />
        {comingSoon && <span className="coming-soon-label">Comming Soon</span>}
      </div>
      <div className="film-title-row">
        <span className="film-title">{name}</span>
        <span className="film-icons">
          {academy && <img src="/images/page/home/academy_triangle.png" alt="" className="film-academy-icon" />}
          {award && <img src="/images/page/home/award_icon.png" alt="" className="film-award-badge" />}
        </span>
      </div>
    </>
  );

  return slug ? (
    <Link href={`/editors-note/${slug}`} className="film-card">
      {CardContent}
    </Link>
  ) : (
    <div className="film-card">
      {CardContent}
    </div>
  );
}
