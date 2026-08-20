import Link from "next/link";
import { AppHeader, CompassMark } from "@/components/app-header";
import { categoryLabels, demoExperts } from "@/lib/demo-data";
import type { MomentCategory } from "@/types";

const categories = new Set<MomentCategory>([
  "interview",
  "conversation",
  "relationship",
  "travel",
  "purchase",
  "study",
]);

type ExpertsPageProps = {
  searchParams: Promise<{ category?: string | string[]; title?: string | string[] }>;
};

export default async function ExpertsPage({ searchParams }: ExpertsPageProps) {
  const params = await searchParams;
  const rawCategory = typeof params.category === "string" ? params.category : null;
  const category = rawCategory && categories.has(rawCategory as MomentCategory) ? (rawCategory as MomentCategory) : null;
  const rawTitle = typeof params.title === "string" ? params.title : "Your planned moment";
  const title = rawTitle.slice(0, 120);

  return (
    <main className="shell">
      <AppHeader />

      <section className="page">
        <div className="container">
          {/* Header */}
          <div style={{ marginBottom: 32, borderBottom: "1px solid var(--border-hairline)", paddingBottom: 20 }}>
            <div className="eyebrow" style={{ marginBottom: 4 }}>
              <CompassMark size={16} />
              <span>Astrologer Handoff</span>
            </div>
            <h1 className="h1">When the moment matters, hand it to a human.</h1>
            <p className="lead" style={{ marginTop: 6 }}>
              Compass provides reflective timing and preparation. When a decision needs deeper chart interpretation, you can continue with an astrologer on AstroLive.
            </p>
          </div>

          {/* Active Moment Context Banner */}
          <div
            className="surface-sheet"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 20,
              marginBottom: 32,
              background: "var(--primary-soft)",
              borderColor: "rgba(24, 21, 51, 0.1)",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div style={{ fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--primary)" }}>
                Carrying Context For
              </div>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(22px, 2.4vw, 28px)",
                  fontWeight: 400,
                  margin: "4px 0 4px",
                  color: "var(--primary)",
                }}
              >
                {title}
              </h2>
              <div className="meta">
                {category ? `Category: ${categoryLabels[category]}` : "General life planning context"}
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span
                style={{
                  padding: "5px 12px",
                  background: "#ffffff",
                  borderRadius: "var(--radius-pill)",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--primary)",
                  border: "1px solid rgba(24, 21, 51, 0.1)",
                }}
              >
                Context preserved
              </span>
            </div>
          </div>

          {/* Sample Astrologers Grid */}
          <div style={{ marginBottom: 16 }}>
            <h2 className="h2" style={{ fontSize: 22, marginBottom: 16 }}>
              Sample astrologer profiles
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 16,
              }}
            >
              {demoExperts.map((expert) => {
                const initials = expert.name
                  .split(" ")
                  .slice(1)
                  .join(" ")
                  .slice(0, 2)
                  .toUpperCase() || "AL";

                return (
                  <article
                    className="tile"
                    key={expert.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: 18,
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                        <div
                          style={{
                            width: 42,
                            height: 42,
                            borderRadius: "50%",
                            background: "var(--primary)",
                            color: "#ffffff",
                            display: "grid",
                            placeItems: "center",
                            fontWeight: 700,
                            fontSize: 13.5,
                            letterSpacing: "0.05em",
                            flex: "0 0 auto",
                          }}
                          aria-hidden="true"
                        >
                          {initials}
                        </div>
                        <div>
                          <div className="eyebrow" style={{ fontSize: 10.5, marginBottom: 1 }}>Sample profile</div>
                          <h3 className="h3" style={{ fontSize: 15, margin: 0 }}>
                            {expert.name}
                          </h3>
                        </div>
                      </div>

                      <div style={{ fontSize: 13.5, color: "var(--foreground)", fontWeight: 500, marginBottom: 8 }}>
                        {expert.specialty}
                      </div>

                      <div className="meta" style={{ fontSize: 12.5 }}>
                        {expert.experience} · {expert.languages.join(" · ")}
                      </div>
                    </div>

                    <a
                      className="btn btn-primary btn-sm btn-block"
                      href="https://astrolive.app/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Consult on AstroLive ↗
                    </a>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Action Row */}
          <div
            className="tile"
            style={{
              background: "var(--surface-subtle)",
              borderColor: "var(--border-subtle)",
              marginTop: 28,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>
                Want to refine your timing first?
              </div>
              <div className="meta" style={{ marginTop: 2 }}>
                Your moment context is saved. You can return to the planner or check today&apos;s briefing.
              </div>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <Link className="btn btn-secondary btn-sm" href="/plan">
                Return to planner
              </Link>
              <Link className="btn btn-ghost btn-sm" href="/today">
                Back to Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-row">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <CompassMark size={16} />
            <span style={{ fontSize: 13, fontWeight: 600 }}>AstroLive Compass</span>
          </div>
          <div className="meta">
            Sample astrologer profiles · Outgoing links open AstroLive
          </div>
        </div>
      </footer>
    </main>
  );
}
