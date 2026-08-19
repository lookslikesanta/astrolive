"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { AppHeader } from "@/components/app-header";
import { dailyCompass } from "@/lib/demo-data";
import { readMoments, readProfile } from "@/lib/storage";

const subscribeToClient = () => () => undefined;

export default function TodayPage() {
  const hydrated = useSyncExternalStore(subscribeToClient, () => true, () => false);
  const [showWhy, setShowWhy] = useState(false);
  const profile = hydrated ? readProfile() : null;
  const latestMoment = hydrated ? readMoments()[0] ?? null : null;

  const formattedDate = useMemo(
    () => new Intl.DateTimeFormat("en-IN", { weekday: "long", day: "numeric", month: "long" }).format(new Date()),
    [],
  );

  if (!hydrated) {
    return (
      <main className="shell"><AppHeader /><section className="page"><div className="narrow"><div className="card">Loading your Compass…</div></div></section></main>
    );
  }

  if (!profile) {
    return (
      <main className="shell">
        <AppHeader />
        <section className="page">
          <div className="narrow">
            <div className="card">
              <div className="eyebrow">No local profile yet</div>
              <h1 className="h2" style={{ marginTop: 12 }}>Start with a lightweight profile.</h1>
              <p className="body">Today is intentionally safe when opened directly. Add your details or use the demo profile to continue.</p>
              <Link className="btn btn-primary" href="/onboarding">Set up Compass →</Link>
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
          <div className="page-head">
            <div className="page-head-copy">
              <div className="eyebrow">{formattedDate}</div>
              <h1 className="h1">Good afternoon, {profile.firstName}.</h1>
              <p className="lead" style={{ fontSize: 18 }}>One useful reading of the day—translated into what to do with it.</p>
            </div>
            <Link className="btn btn-primary" href="/plan">Plan a moment →</Link>
          </div>

          <div className="today-grid">
            <div>
              <article className="result-hero">
                <div className="result-label">Today&apos;s Compass</div>
                <h2 className="result-headline">{dailyCompass.headline}</h2>
                <p style={{ color: "#d8d5ec", lineHeight: 1.65, fontSize: 17, maxWidth: 720 }}>{dailyCompass.summary}</p>
                <div className="card-grid-2" style={{ marginTop: 24 }}>
                  <div>
                    <div className="result-label">Lean into</div>
                    <div className="pill-row" style={{ marginTop: 10 }}>
                      {dailyCompass.leanInto.map((item) => <span className="pill" style={{ background: "rgba(255,255,255,.09)", borderColor: "rgba(255,255,255,.13)", color: "white" }} key={item}>{item}</span>)}
                    </div>
                  </div>
                  <div>
                    <div className="result-label">Take care with</div>
                    <div className="pill-row" style={{ marginTop: 10 }}>
                      {dailyCompass.takeCareWith.map((item) => <span className="pill" style={{ background: "rgba(212,154,56,.12)", borderColor: "rgba(212,154,56,.28)", color: "#f7dfad" }} key={item}>{item}</span>)}
                    </div>
                  </div>
                </div>
              </article>

              <section className="card" style={{ marginTop: 18 }}>
                <div className="card-head">
                  <div>
                    <div className="eyebrow">Timing</div>
                    <h2 className="h3" style={{ marginTop: 7 }}>Your windows</h2>
                  </div>
                  <span className="meta">Guidance, not certainty</span>
                </div>
                <div className="timeline">
                  {dailyCompass.windows.map((window) => (
                    <div className={`timeline-row ${window.tone}`} key={window.label}>
                      <div className="timeline-label">{window.label}</div>
                      <div className="timeline-time">{window.time}</div>
                      <div className="timeline-guidance">{window.guidance}</div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="card">
                <button
                  className="btn btn-ghost"
                  type="button"
                  aria-expanded={showWhy}
                  onClick={() => setShowWhy((value) => !value)}
                >
                  {showWhy ? "Hide explanation" : "Why this?"}
                </button>
                {showWhy ? <p className="body" style={{ marginBottom: 0 }}>{dailyCompass.why}</p> : null}
              </section>
            </div>

            <aside className="sticky-rail">
              <div className="card card-highlight">
                <div className="eyebrow">Next useful action</div>
                <h2 className="h3" style={{ marginTop: 10 }}>Put one meaningful moment on the calendar.</h2>
                <p className="body">Compass becomes more valuable when it can translate a specific decision into timing and preparation.</p>
                <Link className="btn btn-primary btn-block" href="/plan">Plan a moment →</Link>
              </div>

              {latestMoment ? (
                <div className="card">
                  <div className="eyebrow">Saved moment</div>
                  <h3 className="h3" style={{ marginTop: 10 }}>{latestMoment.title || "Your planned moment"}</h3>
                  <p className="body">{latestMoment.result.headline}</p>
                  <div className="meta">Best window · {latestMoment.result.bestWindow}</div>
                </div>
              ) : (
                <div className="card">
                  <div className="eyebrow">Nothing saved yet</div>
                  <p className="body" style={{ marginBottom: 0 }}>Your most recent planned moment will appear here after you save one.</p>
                </div>
              )}

              <p className="disclosure">Hackathon prototype: the daily state uses deterministic demo astrology signals rather than a production chart engine.</p>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
