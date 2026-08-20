"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/app-header";
import {
  categoryDescriptions,
  categoryLabels,
  generateMomentResult,
} from "@/lib/demo-data";
import { encodeSharedMoment } from "@/lib/share";
import { readProfile, saveMoment } from "@/lib/storage";
import type {
  Importance,
  Moment,
  MomentCategory,
  PreferredPeriod,
} from "@/types";

const categories = Object.keys(categoryLabels) as MomentCategory[];
const periods: { value: PreferredPeriod; label: string }[] = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
  { value: "flexible", label: "Flexible" },
];

function localDate() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

export default function PlanPage() {
  const router = useRouter();
  const [category, setCategory] = useState<MomentCategory | null>(null);
  const [date, setDate] = useState(localDate);
  const [preferredPeriod, setPreferredPeriod] = useState<PreferredPeriod>("flexible");
  const [importance, setImportance] = useState<Importance>("normal");
  const [title, setTitle] = useState("");
  const [result, setResult] = useState<Moment | null>(null);
  const [saved, setSaved] = useState(false);
  const [addingSomeone, setAddingSomeone] = useState(false);
  const [collaborator, setCollaborator] = useState("");
  const [error, setError] = useState("");

  const expertHref = useMemo(() => {
    if (!result) return "/experts";
    const params = new URLSearchParams({
      category: result.category,
      title: result.title || categoryLabels[result.category],
    });
    return `/experts?${params.toString()}`;
  }, [result]);

  function generate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(false);
    setAddingSomeone(false);
    setError("");

    if (!category) {
      setError("Choose what kind of moment you are planning.");
      return;
    }
    if (!date) {
      setError("Choose a date for the moment.");
      return;
    }

    const input = {
      category,
      title: title.trim().slice(0, 120) || categoryLabels[category],
      date,
      preferredPeriod,
      importance,
    };
    const newResult = {
      ...input,
      id: `moment-${Date.now()}`,
      result: generateMomentResult(input),
    };
    setResult(newResult);

    setTimeout(() => {
      if (typeof window !== "undefined" && window.innerWidth < 900) {
        document.querySelector(".result-hero")?.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  }

  function save() {
    if (!result) return;
    saveMoment(result);
    setSaved(true);
  }

  function createSharedMoment() {
    if (!result) return;
    const cleanName = collaborator.trim().slice(0, 60);
    if (!cleanName) {
      setError("Add the other person's name to create a shared moment.");
      return;
    }
    const encoded = encodeSharedMoment({
      version: 1,
      creator: readProfile()?.firstName || "Aarav",
      collaborator: cleanName,
      category: result.category,
      title: result.title || categoryLabels[result.category],
      date: result.date,
      preferredPeriod: result.preferredPeriod,
      importance: result.importance,
    });
    if (typeof window !== "undefined") {
      window.location.href = `/together/${encoded}`;
    } else {
      router.push(`/together/${encoded}`);
    }
  }

  return (
    <main className="shell">
      <AppHeader />
      <section className="page">
        <div className="container">
          <div className="page-head">
            <div className="page-head-copy">
              <div className="eyebrow">Plan a Moment</div>
              <h1 className="h1">Make the astrology specific enough to act on.</h1>
              <p className="lead" style={{ fontSize: 18 }}>
                Choose what matters, when it is happening, and how flexible you are. Compass returns preparation guidance plus a stronger and weaker window.
              </p>
            </div>
          </div>

          <div className="today-grid">
            <form className="form-stack" onSubmit={generate}>
              <section className="card">
                <div className="card-head">
                  <div>
                    <div className="eyebrow">1 · The moment</div>
                    <h2 className="h3" style={{ marginTop: 7 }}>What are you planning?</h2>
                  </div>
                </div>
                <div className="option-grid">
                  {categories.map((item) => (
                    <button
                      className={`option-card ${category === item ? "selected" : ""}`}
                      type="button"
                      aria-pressed={category === item}
                      key={item}
                      onClick={() => {
                        setCategory(item);
                        setError("");
                        setResult(null);
                      }}
                    >
                      <div className="option-title">{categoryLabels[item]}</div>
                      <div className="option-copy">{categoryDescriptions[item]}</div>
                    </button>
                  ))}
                </div>
              </section>

              <section className="card">
                <div className="eyebrow">2 · Context</div>
                <div className="form-stack" style={{ marginTop: 18 }}>
                  <div className="field">
                    <label className="label" htmlFor="title">Moment title <span className="muted">(optional)</span></label>
                    <input className="input" id="title" maxLength={120} placeholder="e.g. Talk with Mira about moving cities" value={title} onChange={(event) => setTitle(event.target.value)} />
                  </div>
                  <div className="card-grid-2">
                    <div className="field">
                      <label className="label" htmlFor="date">Date</label>
                      <input className="input" id="date" type="date" min={localDate()} value={date} onChange={(event) => setDate(event.target.value)} />
                    </div>
                    <div className="field">
                      <label className="label">Importance</label>
                      <div className="segment" style={{ gridTemplateColumns: "1fr 1fr" }}>
                        {(["normal", "important"] as Importance[]).map((value) => (
                          <button className={importance === value ? "active" : ""} type="button" key={value} onClick={() => setImportance(value)}>
                            {value === "normal" ? "Everyday" : "Important"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Preferred part of day</label>
                    <div className="segment">
                      {periods.map((period) => (
                        <button className={preferredPeriod === period.value ? "active" : ""} type="button" key={period.value} onClick={() => setPreferredPeriod(period.value)}>
                          {period.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {error ? <div className="error" role="alert">{error}</div> : null}
              <button className="btn btn-primary btn-block" type="submit">Generate my Compass →</button>
            </form>

            <aside className="sticky-rail">
              {result ? (
                <>
                  <article className="result-hero">
                    <div className="result-label">Your recommendation</div>
                    <h2 className="result-headline" style={{ fontSize: "clamp(30px,3.5vw,44px)" }}>{result.result.headline}</h2>
                    <div className="window-pair">
                      <div className="window-box"><span className="result-label">Stronger window</span><strong>{result.result.bestWindow}</strong></div>
                      <div className="window-box"><span className="result-label">Use more care</span><strong>{result.result.cautionWindow}</strong></div>
                    </div>
                  </article>

                  <div className="card">
                    <div className="eyebrow">Prepare like this</div>
                    <ul className="list" style={{ marginTop: 16 }}>
                      {result.result.guidance.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>

                  <div className="card">
                    <div className="eyebrow">Why this?</div>
                    <p className="body">{result.result.why}</p>
                    <div className="hero-actions">
                      <button className="btn btn-secondary" type="button" onClick={save}>{saved ? "Saved ✓" : "Save"}</button>
                      <button className="btn btn-primary" type="button" onClick={() => { setAddingSomeone(true); setError(""); }}>Add someone</button>
                      <Link className="btn btn-ghost" href={expertHref}>Ask an expert</Link>
                    </div>
                  </div>

                  {addingSomeone ? (
                    <div className="card card-highlight">
                      <div className="eyebrow">Together</div>
                      <h3 className="h3" style={{ marginTop: 9 }}>Who is part of this moment?</h3>
                      <p className="body">The shared link contains only safe moment context and names—never your birth details.</p>
                      <div className="field">
                        <label className="label" htmlFor="collaborator">Their first name</label>
                        <input className="input" id="collaborator" maxLength={60} placeholder="Mira" value={collaborator} onChange={(event) => setCollaborator(event.target.value)} />
                      </div>
                      <button className="btn btn-primary btn-block" type="button" style={{ marginTop: 14 }} onClick={createSharedMoment}>Create shared moment →</button>
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="card card-highlight">
                  <div className="eyebrow">What you&apos;ll get</div>
                  <h2 className="h3" style={{ marginTop: 9 }}>A planning answer, not a prediction.</h2>
                  <p className="body">Compass will show a stronger window, a caution window, and three concrete preparation prompts.</p>
                  <div className="notice">For the fastest judge path, choose <strong>Difficult conversation</strong>, mark it important, and keep timing flexible.</div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
