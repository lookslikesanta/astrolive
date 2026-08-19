"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { AppHeader } from "@/components/app-header";
import { categoryLabels, sharedGuidance } from "@/lib/demo-data";
import { decodeSharedMoment } from "@/lib/share";

export default function SharedMomentPage() {
  const params = useParams<{ id: string }>();
  const [copied, setCopied] = useState(false);
  const payload = useMemo(() => decodeSharedMoment(params.id), [params.id]);

  const expertHref = useMemo(() => {
    if (!payload) return "/experts";
    const query = new URLSearchParams({ category: payload.category, title: payload.title });
    return `/experts?${query.toString()}`;
  }, [payload]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
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
            <div className="card">
              <div className="eyebrow">Shared Moment</div>
              <h1 className="h2" style={{ marginTop: 12 }}>This shared link is incomplete or no longer valid.</h1>
              <p className="body">No private profile data is required to recover it. Create a new moment instead.</p>
              <Link className="btn btn-primary" href="/plan">Plan a new moment →</Link>
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
        <div className="narrow">
          <div className="page-head">
            <div className="page-head-copy">
              <div className="eyebrow">Together · {categoryLabels[payload.category]}</div>
              <h1 className="h1">{payload.creator} + {payload.collaborator}</h1>
              <p className="lead" style={{ fontSize: 18 }}>
                {payload.title} · {new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${payload.date}T12:00:00`))}
              </p>
            </div>
          </div>

          <article className="result-hero">
            <div className="result-label">Shared Compass</div>
            <h2 className="result-headline">{sharedGuidance.headline}</h2>
            <div className="window-box" style={{ maxWidth: 360 }}>
              <span className="result-label">Shared supportive window</span>
              <strong>{sharedGuidance.sharedWindow}</strong>
            </div>
          </article>

          <div className="card-grid-2" style={{ marginTop: 18 }}>
            <section className="card card-supportive">
              <div className="eyebrow">What works well</div>
              <ul className="list" style={{ marginTop: 16 }}>
                {sharedGuidance.worksWell.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
            <section className="card card-caution" style={{ marginTop: 0 }}>
              <div className="eyebrow">Take care with</div>
              <ul className="list" style={{ marginTop: 16 }}>
                {sharedGuidance.takeCareWith.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          </div>

          <section className="card" style={{ marginTop: 18 }}>
            <div className="card-head">
              <div>
                <div className="eyebrow">Why sharing matters</div>
                <h2 className="h3" style={{ marginTop: 9 }}>The invitation is part of the product loop.</h2>
              </div>
            </div>
            <p className="body">
              A useful shared result gives the invited person a reason to open AstroLive, understand the context, and create their own Compass. The production version could calculate both people&apos;s trusted astrology signals before generating this combined guidance.
            </p>
            <div className="hero-actions">
              <button className="btn btn-secondary" type="button" onClick={copyLink}>{copied ? "Link copied ✓" : "Copy shared link"}</button>
              <Link className="btn btn-primary" href="/onboarding">Create your own Compass →</Link>
              <Link className="btn btn-ghost" href={expertHref}>Ask an expert</Link>
            </div>
            {copied ? <div className="success" style={{ marginTop: 14 }} role="status">This URL can be opened in another browser because it contains only safe moment context—not birth details.</div> : null}
          </section>

          <p className="disclosure">
            Prototype note: combined guidance is deterministic demo content. The share payload includes names and moment details only; private birth profile fields are not encoded in the URL.
          </p>
        </div>
      </section>
    </main>
  );
}
