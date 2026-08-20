"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { AppHeader, CompassMark } from "@/components/app-header";
import { dailyCompass } from "@/lib/demo-data";
import { readMoments, readProfile } from "@/lib/storage";

const subscribeToClient = () => () => undefined;

export default function TodayPage() {
  const hydrated = useSyncExternalStore(subscribeToClient, () => true, () => false);
  const [showExplanation, setShowExplanation] = useState(false);
  const profile = hydrated ? readProfile() : null;
  const latestMoment = hydrated ? readMoments()[0] ?? null : null;

  const formattedDate = useMemo(
    () =>
      new Intl.DateTimeFormat("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }).format(new Date()),
    [],
  );

  if (!hydrated) {
    return (
      <main className="shell">
        <AppHeader />
        <section className="page">
          <div className="narrow">
            <div className="tile" style={{ textAlign: "center", padding: 48 }}>
              <CompassMark size={32} />
              <p className="body" style={{ marginTop: 14 }}>Orienting your Compass…</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="shell">
        <AppHeader />
        <section className="page">
          <div className="narrow">
            <div className="surface-sheet" style={{ textAlign: "center", padding: "44px 28px" }}>
              <CompassMark size={36} />
              <h1 className="h1" style={{ marginTop: 14, marginBottom: 8 }}>
                No local profile found
              </h1>
              <p className="lead" style={{ margin: "0 auto 20px" }}>
                Add your details or use the demo profile to view your daily timing windows.
              </p>
              <Link className="btn btn-primary" href="/onboarding">
                Set up Compass →
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="shell">
      <AppHeader />

      <section className="page">
        <div className="container">
          {/* Top Date & Greeting */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 20,
              marginBottom: 32,
              flexWrap: "wrap",
              borderBottom: "1px solid var(--border-hairline)",
              paddingBottom: 20,
            }}
          >
            <div>
              <div className="eyebrow" style={{ marginBottom: 4 }}>
                <span>{formattedDate}</span>
                <span>·</span>
                <span>Daily Briefing</span>
              </div>
              <h1 className="h1">
                Good day, <span className="serif-italic">{profile.firstName}</span>.
              </h1>
            </div>

            <Link className="btn btn-primary" href="/plan">
              Plan a moment →
            </Link>
          </div>

          {/* Main Grid: Today's Briefing on Left, Upcoming Focus on Right */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 540px), 1fr))",
              gap: 28,
              alignItems: "start",
            }}
          >
            {/* Left Column: Daily Briefing & Time Rail */}
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {/* Daily Theme Hero */}
              <div className="surface-sheet">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <span className="eyebrow">Today&apos;s Orientation</span>
                  <span className="meta">Calibrated for {profile.firstName}</span>
                </div>

                <h2
                  className="font-display"
                  style={{
                    fontSize: "clamp(26px, 3.5vw, 38px)",
                    fontWeight: 400,
                    lineHeight: 1.14,
                    letterSpacing: "-0.02em",
                    margin: "0 0 14px",
                    color: "var(--primary)",
                  }}
                >
                  {dailyCompass.headline}
                </h2>

                <p className="body" style={{ fontSize: 15.5, lineHeight: 1.6 }}>
                  {dailyCompass.summary}
                </p>

                {/* Lean Into & Take Care With Editorial Lists */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: 20,
                    marginTop: 24,
                    paddingTop: 20,
                    borderTop: "1px solid var(--border-hairline)",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "var(--supportive)",
                        marginBottom: 10,
                      }}
                    >
                      Lean into
                    </div>
                    <ul className="guidance-list">
                      {dailyCompass.leanInto.map((item) => (
                        <li className="guidance-item" key={item}>
                          <span className="guidance-item-bullet supportive" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "var(--caution)",
                        marginBottom: 10,
                      }}
                    >
                      Take care with
                    </div>
                    <ul className="guidance-list">
                      {dailyCompass.takeCareWith.map((item) => (
                        <li className="guidance-item" key={item}>
                          <span className="guidance-item-bullet caution" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Continuous Time Rail */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <h3 className="h3">Timing windows</h3>
                  <span className="meta">Continuous daily progression</span>
                </div>

                <div className="time-rail">
                  {dailyCompass.windows.map((window) => (
                    <div className={`time-slot ${window.tone}`} key={window.label}>
                      <div className="time-slot-label">{window.label}</div>
                      <div className="time-slot-time">{window.time}</div>
                      <div className="time-slot-guidance">{window.guidance}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inline Explanation Disclosure */}
              <div style={{ borderTop: "1px solid var(--border-hairline)", paddingTop: 14 }}>
                <button
                  className="btn btn-ghost btn-sm"
                  type="button"
                  aria-expanded={showExplanation}
                  onClick={() => setShowExplanation((current) => !current)}
                  style={{ padding: "6px 0", color: "var(--foreground-muted)" }}
                >
                  <CompassMark size={14} />
                  <span>{showExplanation ? "Hide astrology context" : "Why this timing?"}</span>
                </button>
                {showExplanation ? (
                  <p className="body" style={{ marginTop: 10, fontSize: 13.5 }}>
                    {dailyCompass.why}
                  </p>
                ) : null}
              </div>
            </div>

            {/* Right Column: Upcoming Focus & Planner Card */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Upcoming Focus */}
              {latestMoment ? (
                <div className="tile">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span className="eyebrow">Upcoming focus</span>
                    <span className="meta">{latestMoment.date}</span>
                  </div>

                  <h3 className="h3" style={{ marginBottom: 4 }}>
                    {latestMoment.title || "Your planned moment"}
                  </h3>

                  <p className="body" style={{ fontSize: 13.5, marginBottom: 14 }}>
                    {latestMoment.result.headline}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      background: "var(--surface-subtle)",
                      borderRadius: "var(--radius-xs)",
                      fontSize: 13,
                    }}
                  >
                    <span style={{ color: "var(--foreground-muted)" }}>Best window</span>
                    <strong style={{ color: "var(--supportive)" }}>{latestMoment.result.bestWindow}</strong>
                  </div>

                  <div style={{ marginTop: 14 }}>
                    <Link className="btn btn-secondary btn-sm btn-block" href="/plan">
                      Plan another moment →
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="tile" style={{ background: "var(--surface-raised)", borderColor: "var(--border-subtle)" }}>
                  <span className="eyebrow" style={{ marginBottom: 6 }}>Moment Planner</span>
                  <h3 className="h3" style={{ margin: "4px 0 8px" }}>
                    Put one meaningful moment on the calendar.
                  </h3>
                  <p className="body" style={{ fontSize: 13.5, marginBottom: 16 }}>
                    Select an upcoming interview, difficult conversation, date, travel, or decision to calculate supportive windows and tailored preparation advice.
                  </p>
                  <Link className="btn btn-primary btn-block" href="/plan">
                    Plan a moment →
                  </Link>
                </div>
              )}

              {/* Astrologer Escalation Bridge */}
              <div
                className="tile"
                style={{
                  background: "var(--primary-soft)",
                  borderColor: "rgba(24, 21, 51, 0.1)",
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 14, color: "var(--primary)", marginBottom: 4 }}>
                  Need deeper guidance?
                </div>
                <p className="body" style={{ fontSize: 13, marginBottom: 12, color: "var(--foreground-muted)" }}>
                  For complex situations, you can continue with an astrologer on AstroLive without starting from zero.
                </p>
                <Link className="btn btn-secondary btn-sm btn-block" href="/experts">
                  Explore astrologers →
                </Link>
              </div>
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
            Reflective daily guidance · Calibrated locally
          </div>
        </div>
      </footer>
    </main>
  );
}
