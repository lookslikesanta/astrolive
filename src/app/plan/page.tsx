"use client";

import Link from "next/link";
import { FormEvent, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AppHeader, CompassMark } from "@/components/app-header";
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
  const resultRef = useRef<HTMLDivElement>(null);
  const collaboratorInputId = useId();

  const [category, setCategory] = useState<MomentCategory>("conversation");
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
      setError("Please select what kind of moment you are planning.");
      return;
    }
    if (!date) {
      setError("Please select a date for the moment.");
      return;
    }

    const input = {
      category,
      title: title.trim().slice(0, 120) || categoryLabels[category],
      date,
      preferredPeriod,
      importance,
    };

    const newResult: Moment = {
      ...input,
      id: `moment-${Date.now()}`,
      result: generateMomentResult(input),
    };

    setResult(newResult);

    // Smoothly bring the result into view on mobile
    if (typeof window !== "undefined" && window.innerWidth < 900) {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      resultRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  }

  function handleSave() {
    if (!result) return;
    saveMoment(result);
    setSaved(true);
  }

  function createSharedMoment() {
    if (!result) return;
    const cleanName = collaborator.trim().slice(0, 60);
    if (!cleanName) {
      setError("Please enter the other person's name to create a shared moment.");
      return;
    }
    const creatorName = readProfile()?.firstName || "Aarav";
    const encoded = encodeSharedMoment({
      version: 1,
      creator: creatorName,
      collaborator: cleanName,
      category: result.category,
      title: result.title || categoryLabels[result.category],
      date: result.date,
      preferredPeriod: result.preferredPeriod,
      importance: result.importance,
    });
    router.push(`/together/${encoded}`);
  }

  return (
    <main className="shell">
      <AppHeader />

      <section className="page">
        <div className="container">
          {/* Header */}
          <div style={{ marginBottom: 32, borderBottom: "1px solid var(--border-hairline)", paddingBottom: 20 }}>
            <div className="eyebrow" style={{ marginBottom: 4 }}>
              <CompassMark size={16} />
              <span>Plan a Moment</span>
            </div>
            <h1 className="h1">Make the astrology specific enough to act on.</h1>
            <p className="lead" style={{ marginTop: 6 }}>
              Choose what matters, when it is happening, and how flexible you are. Compass returns preparation guidance plus a stronger and caution window.
            </p>
          </div>

          {/* Grid Layout: Form on Left, Result on Right */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
              gap: 32,
              alignItems: "start",
            }}
          >
            {/* Planner Form */}
            <form className="form-stack" onSubmit={generate}>
              {/* Step 1: Category Selection */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <label className="label">
                    1 · What are you planning?
                  </label>
                  <span className="meta">Choose one</span>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
                    gap: 10,
                  }}
                >
                  {categories.map((item) => (
                    <button
                      className={`tile tile-interactive ${category === item ? "selected" : ""}`}
                      type="button"
                      aria-pressed={category === item}
                      key={item}
                      onClick={() => {
                        setCategory(item);
                        setError("");
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 3, color: "var(--foreground)" }}>
                        {categoryLabels[item]}
                      </div>
                      <div style={{ fontSize: 12.5, color: "var(--foreground-muted)", lineHeight: 1.45 }}>
                        {categoryDescriptions[item]}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Context & Preferences */}
              <div className="surface-sheet">
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>
                  2 · Context & Timing Details
                </div>

                <div className="form-stack">
                  <div className="field">
                    <label className="label" htmlFor="title">
                      Moment title <span className="meta">(optional)</span>
                    </label>
                    <input
                      className="input"
                      id="title"
                      maxLength={120}
                      placeholder="e.g. Talk with Mira about moving cities"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                    />
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                      gap: 14,
                    }}
                  >
                    <div className="field">
                      <label className="label" htmlFor="date">
                        Date
                      </label>
                      <input
                        className="input"
                        id="date"
                        type="date"
                        min={localDate()}
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                      />
                    </div>

                    <div className="field">
                      <label className="label">Importance</label>
                      <div className="segment-control">
                        {(["normal", "important"] as Importance[]).map((value) => (
                          <button
                            className={`segment-btn ${importance === value ? "active" : ""}`}
                            type="button"
                            key={value}
                            onClick={() => setImportance(value)}
                          >
                            {value === "normal" ? "Normal" : "Important"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Preferred part of day</label>
                    <div className="segment-control">
                      {periods.map((period) => (
                        <button
                          className={`segment-btn ${preferredPeriod === period.value ? "active" : ""}`}
                          type="button"
                          key={period.value}
                          onClick={() => setPreferredPeriod(period.value)}
                        >
                          {period.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {error ? (
                <div className="alert-error" role="alert">
                  {error}
                </div>
              ) : null}

              <button className="btn btn-primary btn-block" type="submit" style={{ minHeight: 46 }}>
                Generate my Compass →
              </button>
            </form>

            {/* Recommendation Result Column */}
            <div ref={resultRef} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {result ? (
                <>
                  {/* Result Header & Timing Windows */}
                  <div className="surface-sheet">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                      <span className="eyebrow">Your recommendation</span>
                      <span className="meta">{result.date}</span>
                    </div>

                    <h2
                      className="font-display"
                      style={{
                        fontSize: "clamp(24px, 3vw, 34px)",
                        fontWeight: 400,
                        lineHeight: 1.15,
                        margin: "0 0 18px",
                        color: "var(--primary)",
                      }}
                    >
                      {result.result.headline}
                    </h2>

                    {/* Window comparison tiles */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                        gap: 10,
                        marginBottom: 20,
                      }}
                    >
                      <div
                        style={{
                          padding: "12px 14px",
                          borderRadius: "var(--radius-xs)",
                          background: "var(--supportive-soft)",
                          border: "1px solid rgba(26, 91, 93, 0.18)",
                        }}
                      >
                        <div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--supportive-ink)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                          Stronger Window
                        </div>
                        <div style={{ fontSize: 15.5, fontWeight: 700, marginTop: 3, color: "var(--supportive-ink)" }}>
                          {result.result.bestWindow}
                        </div>
                      </div>

                      <div
                        style={{
                          padding: "12px 14px",
                          borderRadius: "var(--radius-xs)",
                          background: "var(--caution-soft)",
                          border: "1px solid rgba(138, 72, 22, 0.18)",
                        }}
                      >
                        <div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--caution-ink)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                          Use More Caution
                        </div>
                        <div style={{ fontSize: 15.5, fontWeight: 700, marginTop: 3, color: "var(--caution-ink)" }}>
                          {result.result.cautionWindow}
                        </div>
                      </div>
                    </div>

                    {/* Preparation Points */}
                    <div style={{ borderTop: "1px solid var(--border-hairline)", paddingTop: 16 }}>
                      <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 10 }}>
                        Prepare like this
                      </div>
                      <ul className="guidance-list">
                        {result.result.guidance.map((item, index) => (
                          <li className="guidance-item" key={index}>
                            <span className="guidance-item-bullet accent" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Why this */}
                    <p className="meta" style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--border-hairline)" }}>
                      {result.result.why}
                    </p>

                    {/* Action Bar */}
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        marginTop: 20,
                        paddingTop: 16,
                        borderTop: "1px solid var(--border-hairline)",
                        flexWrap: "wrap",
                      }}
                    >
                      <button
                        className={`btn ${saved ? "btn-secondary" : "btn-primary"} btn-sm`}
                        type="button"
                        onClick={handleSave}
                      >
                        {saved ? "Saved ✓" : "Save"}
                      </button>

                      <button
                        className="btn btn-secondary btn-sm"
                        type="button"
                        onClick={() => {
                          setAddingSomeone(true);
                          setError("");
                        }}
                      >
                        Add someone
                      </button>

                      <Link className="btn btn-ghost btn-sm" href={expertHref}>
                        Ask an expert
                      </Link>
                    </div>
                  </div>

                  {/* Inline Collaborator Expansion */}
                  {addingSomeone ? (
                    <div className="tile" style={{ background: "var(--accent-soft)", borderColor: "rgba(196, 130, 26, 0.28)" }}>
                      <div style={{ fontWeight: 700, fontSize: 14.5, color: "var(--accent-ink)", marginBottom: 2 }}>
                        Who is part of this moment?
                      </div>
                      <p className="body" style={{ fontSize: 13, color: "var(--foreground-muted)", marginBottom: 12 }}>
                        The shared link contains only moment details and names—never your birth date or time.
                      </p>

                      <div className="field" style={{ marginBottom: 12 }}>
                        <label className="label" htmlFor={collaboratorInputId}>
                          Their first name
                        </label>
                        <input
                          className="input"
                          id={collaboratorInputId}
                          maxLength={60}
                          placeholder="e.g. Mira"
                          value={collaborator}
                          onChange={(event) => setCollaborator(event.target.value)}
                        />
                      </div>

                      <button
                        className="btn btn-accent btn-block btn-sm"
                        type="button"
                        onClick={createSharedMoment}
                      >
                        Create shared moment →
                      </button>
                    </div>
                  ) : null}
                </>
              ) : (
                /* Empty State Guidance */
                <div className="tile" style={{ background: "var(--surface-raised)", padding: 28 }}>
                  <div className="eyebrow" style={{ marginBottom: 6 }}>
                    What you&apos;ll get
                  </div>
                  <h2 className="h3" style={{ margin: "4px 0 8px" }}>
                    A planning answer, not a prediction.
                  </h2>
                  <p className="body" style={{ fontSize: 13.5 }}>
                    Compass will show a stronger window, a caution window, and three concrete preparation prompts.
                  </p>
                  <div
                    className="meta"
                    style={{
                      marginTop: 14,
                      padding: "8px 12px",
                      background: "var(--surface-subtle)",
                      borderRadius: "var(--radius-xs)",
                    }}
                  >
                    Suggested focus: Choose <strong>Difficult conversation</strong>, mark it <strong>Important</strong>, and keep timing flexible.
                  </div>
                </div>
              )}
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
            Practical planning · Reflective guidance
          </div>
        </div>
      </footer>
    </main>
  );
}
