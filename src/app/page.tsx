import Link from "next/link";
import { AppHeader, CompassMark } from "@/components/app-header";

export default function HomePage() {
  return (
    <main className="shell">
      <AppHeader />

      {/* Hero Section */}
      <section className="section" style={{ paddingTop: 44, paddingBottom: 40 }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
              gap: "40px 56px",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div className="eyebrow">
                <CompassMark size={16} />
                <span>Daily Timing & Planning</span>
              </div>

              <h1 className="display">
                Plan with the day, <span className="serif-italic">not against it.</span>
              </h1>

              <p className="lead">
                AstroLive Compass turns astrology into a practical planning rhythm: understand today,
                choose a supportive window for important moments, include others in shared decisions,
                and connect with an astrologer when you need deeper context.
              </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginTop: 4 }}>
                <Link className="btn btn-primary" href="/onboarding">
                  Try the demo →
                </Link>
                <Link className="btn btn-secondary" href="/plan">
                  Plan a moment
                </Link>
              </div>

              <div className="meta" style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
                <span>1-Click demo profile ready to explore · No account required</span>
              </div>
            </div>

            {/* Editorial Live Preview Panel */}
            <div
              className="surface-midnight"
              style={{ padding: "clamp(24px, 3.5vw, 32px)" }}
              aria-label="Preview of today's Compass guidance"
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255, 255, 255, 0.12)", paddingBottom: 14, marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <CompassMark size={22} />
                  <span style={{ fontWeight: 600, fontSize: 13.5, color: "var(--foreground-on-midnight)" }}>Today&apos;s Compass</span>
                </div>
                <span style={{ fontSize: 11.5, color: "var(--accent)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Live Preview
                </span>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div className="meta" style={{ color: "var(--accent)", marginBottom: 6 }}>
                  Today · Your day
                </div>
                <h2
                  className="font-display"
                  style={{
                    fontSize: "clamp(24px, 3vw, 32px)",
                    fontWeight: 400,
                    lineHeight: 1.15,
                    color: "#ffffff",
                    margin: "0 0 10px",
                  }}
                >
                  A better day for clarity than speed.
                </h2>
                <p style={{ color: "var(--foreground-on-midnight-muted)", fontSize: 14, lineHeight: 1.5, margin: 0 }}>
                  Put patient conversations and focused work earlier. Keep important commitments flexible in the afternoon.
                </p>
              </div>

              {/* Time slots preview */}
              <div style={{ display: "grid", gap: 10, borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "95px 1fr", gap: 12, alignItems: "baseline" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#a5e2df" }}>8:30–11:00 AM</span>
                  <span style={{ fontSize: 13, color: "var(--foreground-on-midnight-muted)" }}>Supportive for planning, preparation, and focused work.</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "95px 1fr", gap: 12, alignItems: "baseline" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#f7cc9c" }}>1:30–3:30 PM</span>
                  <span style={{ fontSize: 13, color: "var(--foreground-on-midnight-muted)" }}>Use more caution with commitments that are hard to reverse.</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "95px 1fr", gap: 12, alignItems: "baseline" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#d5d1ea" }}>6:00–8:00 PM</span>
                  <span style={{ fontSize: 13, color: "var(--foreground-on-midnight-muted)" }}>A steadier window for conversation and reflection.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* From Prediction to Action Contrast Strip */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 40 }}>
        <div className="container">
          <div
            className="surface-sheet"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
              gap: 28,
              background: "var(--surface-raised)",
              borderColor: "var(--border-subtle)",
              padding: "24px 28px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--foreground-subtle)" }}>
                Conventional Astrology
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "var(--foreground-muted)" }}>
                Complex charts & passive horoscopes
              </div>
              <p className="body" style={{ fontSize: 13.5, color: "var(--foreground-subtle)" }}>
                Overwhelming walls of predictions that tell you what might happen, without clear guidance on what to actually do.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6, borderLeft: "2px solid var(--accent)", paddingLeft: 18 }}>
              <div style={{ fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent-ink)" }}>
                AstroLive Compass
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)" }}>
                Clear timing windows & preparation prompts
              </div>
              <p className="body" style={{ fontSize: 13.5 }}>
                Three actionable daily windows, concrete prompts for difficult conversations and key decisions, shared timing, and astrologer escalation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The 4-Step Connected Product Journey */}
      <section className="section" style={{ background: "var(--surface-subtle)", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <div style={{ maxWidth: 620, marginBottom: 36 }}>
            <div className="eyebrow">The Continuous Rhythm</div>
            <h2 className="h2" style={{ marginTop: 8 }}>From a daily check-in to a moment worth sharing.</h2>
            <p className="body" style={{ marginTop: 8 }}>
              Compass bridges personal reflection, practical timing, and astrologer expertise into one connected journey.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 16,
            }}
          >
            <div className="tile" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span className="eyebrow">01 · Morning</span>
                <span style={{ fontSize: 12, color: "var(--foreground-subtle)" }}>Daily</span>
              </div>
              <h3 className="h3">Today</h3>
              <p className="body" style={{ fontSize: 13.5 }}>
                Start with one clear action recommendation and supportive timing windows for the day.
              </p>
            </div>

            <div className="tile" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span className="eyebrow">02 · Planning</span>
                <span style={{ fontSize: 12, color: "var(--foreground-subtle)" }}>Utility</span>
              </div>
              <h3 className="h3">Plan a Moment</h3>
              <p className="body" style={{ fontSize: 13.5 }}>
                Choose a meaningful moment and compare stronger and caution windows with preparation guidance.
              </p>
            </div>

            <div className="tile" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span className="eyebrow">03 · Collaboration</span>
                <span style={{ fontSize: 12, color: "var(--foreground-subtle)" }}>Together</span>
              </div>
              <h3 className="h3">Shared Moments</h3>
              <p className="body" style={{ fontSize: 13.5 }}>
                Invite someone when the moment is shared and unlock combined timing without exposing private birth details.
              </p>
            </div>

            <div className="tile" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span className="eyebrow">04 · Escalation</span>
                <span style={{ fontSize: 12, color: "var(--foreground-subtle)" }}>Guidance</span>
              </div>
              <h3 className="h3">Astrologer Handoff</h3>
              <p className="body" style={{ fontSize: 13.5 }}>
                Continue from your planned moment to an AstroLive astrologer when the decision deserves more depth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Flow Action Sheet */}
      <section className="section">
        <div className="container">
          <div
            className="surface-sheet"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 28,
              flexWrap: "wrap",
            }}
          >
            <div style={{ maxWidth: 540 }}>
              <h2 className="h2" style={{ margin: "0 0 8px" }}>
                From daily clarity to moments that matter.
              </h2>
              <p className="body">
                Today creates a daily rhythm. Shared Moments make timing collaborative. When decisions matter most, connect directly with an astrologer on AstroLive.
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link className="btn btn-primary" href="/onboarding">
                Start with demo profile →
              </Link>
              <Link className="btn btn-secondary" href="/today">
                Go to Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-row">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <CompassMark size={18} />
            <span style={{ fontWeight: 600, color: "var(--foreground)" }}>AstroLive Compass</span>
          </div>
          <div className="meta">
            Reflective astrological guidance for daily planning and meaningful moments.
          </div>
        </div>
      </footer>
    </main>
  );
}
