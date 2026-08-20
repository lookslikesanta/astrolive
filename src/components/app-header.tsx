import Link from "next/link";

export function CompassMark({ size = 30 }: { size?: number }) {
  return (
    <span
      className="compass-mark"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span
        className="compass-mark-inner"
        style={{ width: size * 0.54, height: size * 0.54 }}
      />
      <span
        className="compass-mark-needle"
        style={{ height: size * 0.56 }}
      />
      <span className="compass-mark-center" />
    </span>
  );
}

export function AppHeader() {
  return (
    <header className="site-header">
      <div className="container header-row">
        <Link className="brand" href="/" aria-label="AstroLive Compass Home">
          <CompassMark size={28} />
          <span>
            AstroLive <span className="brand-accent">Compass</span>
          </span>
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          <Link className="nav-link" href="/today">
            Today
          </Link>
          <Link className="nav-link" href="/plan">
            Plan
          </Link>
          <Link className="nav-link" href="/experts">
            Experts
          </Link>
          <Link className="btn btn-primary btn-sm" href="/onboarding" style={{ marginLeft: 6 }}>
            Try demo
          </Link>
        </nav>
      </div>
    </header>
  );
}
