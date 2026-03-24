import Link from "next/link";

interface HeaderProps {
  isHome?: boolean;
  customColor?: string;
  activeMenu?: string;
}

export default function Header({ isHome, customColor, activeMenu }: HeaderProps) {
  const style = customColor ? { color: customColor } : {};
  const linkStyle = (menu: string) => ({
    ...(customColor ? { color: customColor } : {}),
    ...(activeMenu === menu ? { textDecoration: "underline" } : {})
  });

  return (
    <header className={`section-header ${isHome ? "home-header-overlay" : ""}`}>
      <div className="top-nav">
        <Link href="/" className="site-title" style={style}>
          Mean girls
        </Link>
        <nav className="mini-nav">
          <Link href="/all-films" style={linkStyle("all-films")}>All Films</Link>
          <Link href="/collections" style={linkStyle("collections")}>Collections</Link>
          <Link href="/docs" style={linkStyle("docs")}>Docs</Link>
          <a href="#" style={style}>About</a>
        </nav>
      </div>
    </header>
  );
}
