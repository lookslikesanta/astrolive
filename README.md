# AstroLive Compass

AstroLive Compass is an AstroHack 2026 prototype that turns astrology from passive prediction into an action-oriented planning layer.

The core loop is:

`Check today → Plan a moment → Share when relevant → Escalate to an expert when needed`

## Live prototype

Public demo: https://astrolive-compass-478smk.v2.appdeploy.ai/

The canonical source repository remains this Next.js application. For the public hackathon demo, the validated frontend experience was ported to AppDeploy as a frontend-only React/Vite static build using hash navigation so every judge-facing route and Shared Moment link can run without a backend or server-side routing dependency. See [`docs/deployment-evidence.md`](./docs/deployment-evidence.md) for deployment and QA evidence.

## Prototype journey

1. **Landing** — explains the product opportunity.
2. **Onboarding** — lightweight local profile; no account required.
3. **Today** — action-first daily guidance and timing windows.
4. **Plan a Moment** — generates deterministic guidance for six moment categories.
5. **Shared Moment** — creates a URL-safe cross-browser experience without exposing birth details.
6. **Experts** — shows the contextual handoff into AstroLive's human consultation layer.

## Why this direction

The concept is designed around four AstroHack opportunities:

- **Retention:** a useful daily Compass creates a recurring reason to return.
- **Structural virality:** Shared Moments create a natural invitation loop.
- **Revenue:** meaningful/high-intent moments can lead into expert consultation.
- **Differentiation:** action-first planning is distinct from another horoscope, Kundli, or generic astrology chatbot.

## Technical approach

Canonical repository:

- Next.js App Router
- TypeScript
- Tailwind CSS + project-specific design tokens/styles
- browser localStorage for demo profile and saved moments
- deterministic fixture-based astrology guidance
- safe Base64URL shared-moment payload containing moment context only
- no authentication, database, paid API, or LLM dependency in the judge path

Public AppDeploy build:

- frontend-only React/Vite static deployment
- same deterministic guidance and localStorage model
- hash navigation for static routing and shareable Shared Moment URLs
- no AppDeploy backend, secrets, database, auth, or AI SDK dependency

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

Validation:

```bash
npm run lint
npm run build
```

## Prototype disclosure

The hackathon build uses deterministic demo astrology signals, not a production birth-chart engine. Astrology guidance is presented as reflective planning guidance rather than certainty.

The expert profiles in the prototype are sample/demo profiles unless explicitly replaced with verified real AstroLive data.

## Production evolution

A real implementation would use a trusted astrology calculation service to generate structured signals, then optionally use an LLM for plain-language explanation and multilingual localization. The LLM would not be the source of astronomical truth.

## Documentation

The complete product brief, research, UI/UX specification, architecture, implementation plan, QA plan, submission plan, sources, deployment evidence, and chronological development evidence live in [`/docs`](./docs/README.md).
