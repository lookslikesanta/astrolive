import Link from "next/link";
import { AppHeader } from "@/components/app-header";
import { categoryLabels, demoExperts } from "@/lib/demo-data";
import type { MomentCategory } from "@/types";

const categories = new Set<MomentCategory>([
  "interview",
  "conversation",
  "relationship",
  "travel",
  "purchase",
  "study",
]);

type ExpertsPageProps = {
  searchParams: Promise<{ category?: string | string[]; title?: string | string[] }>;
};

export default async function ExpertsPage({ searchParams }: ExpertsPageProps) {
  const params = await searchParams;
  const rawCategory = typeof params.category === "string" ? params.category : null;
  const category = rawCategory && categories.has(rawCategory as MomentCategory) ? (rawCategory as MomentCategory) : null;
  const rawTitle = typeof params.title === "string" ? params.title : "Your current moment";
  const title = rawTitle.slice(0, 120);

  return (
    <main className="shell">
      <AppHeader />
      <section className="page">
        <div className="container">
          <div className="page-head">
            <div className="page-head-copy">
              <div className="eyebrow">Deeper guidance</div>
              <h1 className="h1">When the moment matters, hand it to a human.</h1>
              <p className="lead" style={{ fontSize: 18 }}>
                Compass should not pretend every meaningful decision can be resolved by a generated card. This is the natural handoff into AstroLive&apos;s existing expert marketplace.
              </p>
            </div>
          </div>

          <div className="card card-strong" style={{ marginBottom: 20 }}>
            <div className="card-grid-2" style={{ alignItems: "center" }}>
              <div>
                <div className="result-label">Current context</div>
                <h2 className="h2" style={{ color: "white", marginTop: 10 }}>{title}</h2>
              </div>
              <div>
                <p style={{ color: "#d8d5ec", lineHeight: 1.6, marginTop: 0 }}>
                  {category ? `Compass has already identified this as ${categoryLabels[category].toLowerCase()} context. A production handoff could summarize the structured signals and user questions so the astrologer starts with useful context.` : "Open this page from a planned or shared moment and the relevant context follows you into the expert layer."}
                </p>
                <div className="pill-row">
                  <span className="pill" style={{ background: "rgba(255,255,255,.08)", borderColor: "rgba(255,255,255,.13)", color: "white" }}>Context preserved</span>
                  <span className="pill" style={{ background: "rgba(212,154,56,.12)", borderColor: "rgba(212,154,56,.26)", color: "#f7dfad" }}>Human escalation</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card-grid-3">
            {demoExperts.map((expert) => (
              <article className="card expert-card" key={expert.id} style={{ marginTop: 0 }}>
                <div className="avatar" aria-hidden="true">{expert.name.split(" ").at(-1)?.slice(0, 2).toUpperCase()}</div>
                <div>
                  <div className="eyebrow">Sample profile</div>
                  <h2 className="h3" style={{ marginTop: 8 }}>{expert.name}</h2>
                  <p className="body" style={{ marginBottom: 12 }}>{expert.specialty}</p>
                  <div className="expert-meta">
                    <span>{expert.experience}</span>
                    <span>{expert.languages.join(" · ")}</span>
                  </div>
                </div>
                <a className="btn btn-primary btn-block" href="https://astrolive.app/" target="_blank" rel="noreferrer">Open AstroLive experts ↗</a>
              </article>
            ))}
          </div>

          <section className="card card-highlight" style={{ marginTop: 20 }}>
            <div className="card-grid-2" style={{ alignItems: "center" }}>
              <div>
                <div className="eyebrow">Business loop</div>
                <h2 className="h3" style={{ marginTop: 8 }}>Daily utility earns attention; high-intent moments create monetization opportunity.</h2>
              </div>
              <div>
                <p className="body">The prototype deliberately does not fake payment, chat, or video success. It demonstrates where the handoff belongs and what context should travel with it.</p>
                <div className="hero-actions">
                  <Link className="btn btn-primary" href="/plan">Plan another moment</Link>
                  <Link className="btn btn-secondary" href="/today">Back to Today</Link>
                </div>
              </div>
            </div>
          </section>

          <p className="disclosure">All expert names and experience shown here are sample/demo profiles for the hackathon prototype, not claims about real AstroLive astrologers. The external CTA opens AstroLive itself; no consultation is simulated as completed.</p>
        </div>
      </section>
    </main>
  );
}
