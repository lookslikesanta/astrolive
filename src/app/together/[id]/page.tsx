"use client";

import Link from "next/link";
import { use, useMemo, useState } from "react";
import { AppHeader, CompassMark } from "@/components/app-header";
import { categoryLabels, sharedGuidance } from "@/lib/demo-data";
import { decodeSharedMoment } from "@/lib/share";

export default function SharedMomentPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [copied, setCopied] = useState(false);
  const payload = useMemo(() => decodeSharedMoment(resolvedParams.id), [resolvedParams.id]);

  const expertHref = useMemo(() => {
    if (!payload) return "/experts";
    const query = new URLSearchParams({ category: payload.category, title: payload.title });
    return `/experts?${query.toString()}`;
  }, [payload]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  if (!payload) {
    return (
      <main className="shell">
        <AppHeader />
        <section className="page">
          <div className="narrow">
            <div className="surface-sheet" style={{ textAlign: "center", padding: "44px 28px" }}>
              <CompassMark size={32} />
              <h1 className="h2" style={{ marginTop: 14, marginBottom: 8 }}>
                This shared link is incomplete or no longer valid
              </h1>
              <p className="body" style={{ marginBottom: 20 }}>
                No private profile information is required to recover it. You can plan a new moment instead.
              </p>
              <Link className="btn btn-primary" href="/plan">
                Plan a new moment →
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const formattedDate = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${payload.date}T12:00:00`));

  return (
    <main className="shell">
      <AppHeader />

      <section className="page">
        <div className="narrow">
          {/* Top Header */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div className="eyebrow" style={{ justifyContent: "center", marginBottom: 6 }}>
              <CompassMark size={16} />
              <span>Together · {categoryLabels[payload.category]}</span>
            </div>

            <h1 className="h1">
              {payload.creator} <span className="serif-italic">&</span> {payload.collaborator}
            </h1>

            <p className="lead" style={{ margin: "6px auto 0", fontSize: 17 }}>
              {payload.title} · {formattedDate}
            </p>
          </div>

          {/* Shared Guidance Canvas */}
          <div className="surface-sheet" style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span className="eyebrow">Shared Compass</span>
              <span className="meta">Combined Timing</span>
            </div>

            <h2
              className="font-display"
              style={{
                fontSize: "clamp(24px, 3.2vw, 34px)",
                fontWeight: 400,
                lineHeight: 1.15,
                color: "var(--primary)",
                margin: "0 0 18px",
              }}
            >
              {sharedGuidance.headline}
            </h2>

            {/* Shared Window Box */}
            <div
              style={{
                display: "inline-flex",
                flexDirection: "column",
                gap: 3,
                padding: "10px 18px",
                background: "var(--supportive-soft)",
                borderRadius: "var(--radius-xs)",
                border: "1px solid rgba(26, 91, 93, 0.18)",
                marginBottom: 20,
              }}
            >
              <span style={{ fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--supportive-ink)" }}>
                Shared Supportive Window
              </span>
              <span style={{ fontSize: 17, fontWeight: 700, color: "var(--supportive-ink)" }}>
                {sharedGuidance.sharedWindow}
              </span>
            </div>

            {/* Two Column Strengths & Cautions */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 20,
                paddingTop: 18,
                borderTop: "1px solid var(--border-hairline)",
              }}
            >
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--supportive)", marginBottom: 10 }}>
                  What works well
                </div>
                <ul className="guidance-list">
                  {sharedGuidance.worksWell.map((item, index) => (
                    <li className="guidance-item" key={index}>
                      <span className="guidance-item-bullet supportive" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div style={{ fontSize: 12.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--caution)", marginBottom: 10 }}>
                  Things to watch
                </div>
                <ul className="guidance-list">
                  {sharedGuidance.takeCareWith.map((item, index) => (
                    <li className="guidance-item" key={index}>
                      <span className="guidance-item-bullet caution" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Action Row for Creator & Invitee */}
          <div
            className="tile"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
              background: "var(--surface-subtle)",
              marginBottom: 16,
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>
                Shared moment with {payload.collaborator}
              </div>
              <div className="meta" style={{ marginTop: 2 }}>
                Copy this link to share, or create your own Compass.
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button
                className="btn btn-secondary btn-sm"
                type="button"
                onClick={copyLink}
              >
                {copied ? "Link copied ✓" : "Copy shared link"}
              </button>
              <Link className="btn btn-primary btn-sm" href="/onboarding">
                Create your own Compass →
              </Link>
              <Link className="btn btn-ghost btn-sm" href={expertHref}>
                Ask an expert
              </Link>
            </div>
          </div>

          {copied ? (
            <div className="alert-success" role="status" style={{ textAlign: "center", marginBottom: 16 }}>
              Link copied. This URL contains only safe moment details—never private birth information.
            </div>
          ) : null}
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
            Shared moment planning · Safe URL encoding
          </div>
        </div>
      </footer>
    </main>
  );
}
