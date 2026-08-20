"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AppHeader, CompassMark } from "@/components/app-header";
import { demoProfile } from "@/lib/demo-data";
import { writeProfile } from "@/lib/storage";
import type { UserProfile } from "@/types";

const emptyProfile: UserProfile = {
  firstName: "",
  birthDate: "",
  birthTime: "",
  birthPlace: "",
};

function todayIso() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

export default function OnboardingPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>(emptyProfile);
  const [error, setError] = useState("");

  function continueWith(nextProfile: UserProfile) {
    if (!nextProfile.firstName.trim() || !nextProfile.birthDate) {
      setError("Please provide your first name and date of birth.");
      return;
    }
    writeProfile({
      ...nextProfile,
      firstName: nextProfile.firstName.trim().slice(0, 60),
      birthPlace: nextProfile.birthPlace?.trim().slice(0, 120),
    });
    router.push("/today");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    continueWith(profile);
  }

  return (
    <main className="shell">
      <AppHeader />
      <section className="page">
        <div className="narrow">
          {/* Header */}
          <div style={{ marginBottom: 32, textAlign: "center" }}>
            <div className="eyebrow" style={{ marginBottom: 10, justifyContent: "center" }}>
              <CompassMark size={16} />
              <span>Set Your Compass</span>
            </div>
            <h1 className="h1">A small amount of context, no account required.</h1>
            <p className="lead" style={{ margin: "8px auto 0", maxWidth: 520 }}>
              Add a few details to calibrate your daily timing windows, or jump straight in with the demo profile.
            </p>
          </div>

          {/* Quick Start Card */}
          <div
            className="tile"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              marginBottom: 24,
              background: "var(--accent-soft)",
              borderColor: "rgba(196, 130, 26, 0.25)",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div style={{ fontWeight: 700, color: "var(--accent-ink)", fontSize: 14 }}>
                Instant Demo Profile
              </div>
              <div style={{ fontSize: 13, color: "var(--foreground-muted)", marginTop: 2 }}>
                Load demo profile (Aarav, 14 Nov 1998, Lucknow) with one click.
              </div>
            </div>
            <button
              className="btn btn-accent btn-sm"
              type="button"
              onClick={() => continueWith(demoProfile)}
            >
              Use demo profile →
            </button>
          </div>

          {/* Setup Form */}
          <div className="surface-sheet">
            <form className="form-stack" onSubmit={submit}>
              <div className="field">
                <label className="label" htmlFor="firstName">
                  First name <span style={{ color: "var(--accent)" }}>*</span>
                </label>
                <input
                  className="input"
                  id="firstName"
                  autoComplete="given-name"
                  maxLength={60}
                  placeholder="e.g. Aarav"
                  value={profile.firstName}
                  onChange={(event) =>
                    setProfile((current) => ({ ...current, firstName: event.target.value }))
                  }
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: 16,
                }}
              >
                <div className="field">
                  <label className="label" htmlFor="birthDate">
                    Date of birth <span style={{ color: "var(--accent)" }}>*</span>
                  </label>
                  <input
                    className="input"
                    id="birthDate"
                    type="date"
                    max={todayIso()}
                    value={profile.birthDate}
                    onChange={(event) =>
                      setProfile((current) => ({ ...current, birthDate: event.target.value }))
                    }
                  />
                </div>
                <div className="field">
                  <label className="label" htmlFor="birthTime">
                    Birth time <span className="meta">(optional)</span>
                  </label>
                  <input
                    className="input"
                    id="birthTime"
                    type="time"
                    value={profile.birthTime ?? ""}
                    onChange={(event) =>
                      setProfile((current) => ({ ...current, birthTime: event.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="birthPlace">
                  Birthplace <span className="meta">(optional)</span>
                </label>
                <input
                  className="input"
                  id="birthPlace"
                  maxLength={120}
                  placeholder="City, State, Country"
                  value={profile.birthPlace ?? ""}
                  onChange={(event) =>
                    setProfile((current) => ({ ...current, birthPlace: event.target.value }))
                  }
                />
                <div className="help">
                  Used locally to calibrate your timing windows. Stored only in this browser.
                </div>
              </div>

              {error ? (
                <div className="alert-error" role="alert">
                  {error}
                </div>
              ) : null}

              <div style={{ display: "flex", gap: 12, marginTop: 6, flexWrap: "wrap" }}>
                <button className="btn btn-primary" type="submit" style={{ flex: 1 }}>
                  Continue to Today →
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
