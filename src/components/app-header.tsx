import Link from "next/link";

export function CompassMark() {
  return (
    <span className="compass-mark" aria-hidden="true">
      <span className="compass-needle" />
    </span>
  );
}

export function AppHeader() {
  return (
    <header className="site-header">
      <div className="container header-row">
        <Link className="brand" href="/">
          <CompassMark />
          <span>AstroLive <span className="brand-sub">Compass</span></span>
        </Link>
        <nav className="nav" aria-label="Primary navigation">
          <Link href="/today">Today</Link>
          <Link href="/plan">Plan</Link>
          <Link href="/experts">Experts</Link>
          <Link className="btn btn-primary" href="/onboarding">Try demo</Link>
        </nav>
      </div>
    </header>
  );
}
