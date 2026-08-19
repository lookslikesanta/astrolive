"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/app-header";
import { demoProfile } from "@/lib/demo-data";
import { writeProfile } from "@/lib/storage";
import type { UserProfile } from "@/types";

const emptyProfile: UserProfile = {
  firstName: "",
  birthDate: "",
  birthTime: "",
  birthPlace: "",
};

export default function OnboardingPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>(emptyProfile);
  const [error, setError] = useState("");

  function continueWith(nextProfile: UserProfile) {
    if (!nextProfile.firstName.trim() || !nextProfile.birthDate) {
      setError("Add your first name and date of birth to continue.");
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
          <div className="page-head">
            <div className="page-head-copy">
              <div className="eyebrow">Set your Compass</div>
              <h1 className="h1">A small amount of context, no account required.</h1>
              <p className="lead" style={{ fontSize: 18 }}>
                In a production version, birth details would feed AstroLive&apos;s trusted astrology calculation layer. This prototype stores your demo profile only in this browser.
              </p>
            </div>
          </div>

          <div className="card" style={{ padding: "clamp(20px,4vw,32px)" }}>
            <form className="form-stack" onSubmit={submit}>
              <div className="field">
                <label className="label" htmlFor="firstName">First name</label>
                <input
                  className="input"
                  id="firstName"
                  autoComplete="given-name"
                  maxLength={60}
                  placeholder="Your name"
                  value={profile.firstName}
                  onChange={(event) => setProfile((current) => ({ ...current, firstName: event.target.value }))}
                />
              </div>

              <div className="card-grid-2">
                <div className="field">
                  <label className="label" htmlFor="birthDate">Date of birth</label>
                  <input
                    className="input"
                    id="birthDate"
                    type="date"
                    value={profile.birthDate}
                    onChange={(event) => setProfile((current) => ({ ...current, birthDate: event.target.value }))}
                  />
                </div>
                <div className="field">
                  <label className="label" htmlFor="birthTime">Birth time <span className="muted">(optional)</span></label>
                  <input
                    className="input"
                    id="birthTime"
                    type="time"
                    value={profile.birthTime ?? ""}
                    onChange={(event) => setProfile((current) => ({ ...current, birthTime: event.target.value }))}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="birthPlace">Birthplace <span className="muted">(optional in demo)</span></label>
                <input
                  className="input"
                  id="birthPlace"
                  maxLength={120}
                  placeholder="City, state, country"
                  value={profile.birthPlace ?? ""}
                  onChange={(event) => setProfile((current) => ({ ...current, birthPlace: event.target.value }))}
                />
                <div className="help">Used only to demonstrate what a future chart calculation would require. It is not sent to a server in this prototype.</div>
              </div>

              {error ? <div className="error" role="alert">{error}</div> : null}

              <div className="hero-actions">
                <button className="btn btn-primary" type="submit">Continue to Today →</button>
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => continueWith(demoProfile)}
                >
                  Use demo profile
                </button>
              </div>
            </form>
          </div>

          <div className="notice" style={{ marginTop: 18 }}>
            <strong>Judge shortcut:</strong> “Use demo profile” loads Aarav from Lucknow so every screenshot and recommendation stays reproducible.
          </div>
        </div>
      </section>
    </main>
  );
}
