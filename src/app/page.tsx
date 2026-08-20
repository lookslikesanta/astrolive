import Link from "next/link";
import { AppHeader, CompassMark } from "@/components/app-header";

const loop = [
  ["01", "Today", "Turn the day into one clear action, not a wall of predictions."],
  ["02", "Plan", "Choose a meaningful moment and compare stronger and weaker windows."],
  ["03", "Together", "Invite someone when the moment is shared and unlock combined guidance."],
  ["04", "Expert", "Escalate high-intent decisions into AstroLive's human consultation layer."],
];

export default function HomePage() {
  return (
    <main className="shell">
      <AppHeader />
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">AstroHack 2026 prototype</div>
            <h1 className="display">Plan with the day, not against it.</h1>
            <p className="lead">
              AstroLive Compass turns astrology into a practical planning layer: understand today,
              choose a better window for what matters, include someone when the moment is shared,
              and ask a human expert when the decision deserves more depth.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/onboarding">Try the demo →</Link>
              <a className="btn btn-secondary" href="#how-it-works">See how it works</a>
            </div>
            <p className="meta">
              No signup required. The judge flow uses deterministic demo astrology signals so the
              prototype stays reproducible and transparent.
            </p>
          </div>

          <div className="hero-panel" aria-label="Preview of today's Compass">
            <div className="panel-content">
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 34 }}>
                  <CompassMark />
                  <span style={{ color: "#d8d5ec", fontWeight: 700 }}>Today&apos;s Compass</span>
                </div>
                <div className="result-label">Today · Your day</div>
                <div style={{ fontSize: "clamp(32px,4vw,52px)", lineHeight: 1.02, fontWeight: 820, letterSpacing: "-.04em", marginTop: 14 }}>
                  A better day for clarity than speed.
                </div>
                <p style={{ color: "#d8d5ec", lineHeight: 1.55, marginTop: 18, maxWidth: 470 }}>
                  Put patient conversations and focused work earlier. Keep important decisions reversible in the afternoon.
                </p>
              </div>
              <div>
                <div className="hero-window">
                  <div className="hero-time">8:30–11</div>
                  <div className="hero-note">Supportive for planning, preparation, and focused work.</div>
                </div>
                <div className="hero-window">
                  <div className="hero-time">1:30–3:30</div>
                  <div className="hero-note">Use more caution with commitments that are hard to reverse.</div>
                </div>
                <div className="hero-window">
                  <div className="hero-time">6:00–8:00</div>
                  <div className="hero-note">A steadier window for conversation and reflection.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="how-it-works">
        <div className="container">
          <div style={{ display: "grid", gap: 16, marginBottom: 34 }}>
            <div className="eyebrow">One connected product loop</div>
            <h2 className="h2">From a daily check-in to a moment worth sharing.</h2>
            <p className="lead" style={{ fontSize: 18 }}>
              Compass adds a behavioral layer on top of AstroLive&apos;s existing astrology utilities and expert marketplace instead of duplicating them.
            </p>
          </div>
          <div className="loop">
            {loop.map(([number, title, copy]) => (
              <div className="loop-item" key={number}>
                <div className="loop-number">{number}</div>
                <div className="loop-title">{title}</div>
                <div className="loop-copy">{copy}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="card card-strong" style={{ padding: "clamp(28px,5vw,52px)", borderRadius: 28 }}>
            <div className="card-grid-2" style={{ alignItems: "end" }}>
              <div>
                <div className="result-label">From daily clarity to moments that matter</div>
                <h2 className="h2" style={{ marginTop: 14, color: "white" }}>
                  Plan with the day, share with others, and consult with experts.
                </h2>
              </div>
              <div>
                <p style={{ color: "#d8d5ec", lineHeight: 1.65, marginTop: 0 }}>
                  Today gives you a daily orientation. Shared Moments make timing collaborative. When a decision needs deeper guidance, seamlessly connect with verified astrologers.
                </p>
                <Link className="btn btn-dark" href="/onboarding">Start with the demo profile →</Link>
              </div>
            </div>
          </div>
          <p className="disclosure">
            Hackathon prototype: guidance is generated from deterministic demo astrology signals, not a production birth-chart engine. Astrology is presented as reflective guidance, not certainty.
          </p>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-row">
          <span>AstroLive Compass · AstroHack 2026</span>
          <span>Action-first astrology for meaningful moments.</span>
        </div>
      </footer>
    </main>
  );
}
