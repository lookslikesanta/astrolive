# Deployment Evidence — AstroLive Compass

Date: 19 August 2026  
Public URL: https://astrolive-compass-478smk.v2.appdeploy.ai/  
AppDeploy app id: `astrolive-compass-478smk`

## Why AppDeploy was used

The canonical AstroLive Compass implementation in this repository is a Next.js App Router application. The connected Vercel tooling available during the hackathon could inspect/deploy an existing project but did not expose creation/import of a new GitHub-backed project. AppDeploy was therefore used to obtain a public judge-accessible prototype without delaying the submission.

AppDeploy does not directly import this GitHub repository. To keep the public demo frontend-only and reproducible, the already validated product experience was ported to AppDeploy's React/Vite static scaffold.

## Deployment architecture

Canonical repository:

`Next.js App Router → deterministic demo guidance → localStorage`

Public AppDeploy build:

`React/Vite static UI → deterministic demo guidance → localStorage`

The AppDeploy build uses hash navigation rather than server routes so the complete flow and Shared Moment URLs work from static hosting.

No AppDeploy backend, database, authentication, secrets, AI SDK, paid API, or realtime service is used.

## Preserved product capabilities

The public build preserves the judge-facing MVP:

1. Landing / product thesis
2. Lightweight demo onboarding
3. Today / daily Compass
4. Plan a Moment across six categories
5. Deterministic stronger/caution windows and preparation guidance
6. Save to browser localStorage
7. Add a collaborator
8. Privacy-safe Shared Moment URL
9. Shared guidance
10. Context-preserving expert handoff
11. Clearly labeled sample expert profiles
12. Malformed-share and missing-profile fallback states

Private birth profile fields are not encoded into Shared Moment URLs.

## AppDeploy QA

Deployment reached terminal status: **ready**.

AppDeploy reported:

- deployment build completed successfully
- E2E QA suite status: **passed**
- frontend errors: none reported
- network errors: none reported
- desktop QA screenshot captured
- mobile QA screenshot captured

The AppDeploy test suite covered:

- canonical Landing → Onboarding → Today → Plan → Shared Moment → Experts journey
- incomplete-onboarding validation on mobile
- direct Today route with no local profile
- malformed Shared Moment handling on mobile

## Relationship to repository CI

Before the AppDeploy port, the canonical Next.js application had already passed GitHub Actions validation:

- ESLint
- TypeScript / optimized production build
- desktop Chromium canonical journey at 1440×900
- Pixel 7 mobile canonical journey
- no-horizontal-overflow assertions
- no browser console or unhandled page errors during the canonical journey

The AppDeploy deployment is therefore a public hosting adaptation of an already browser-validated product flow, not a separate product direction.

## Report-ready takeaway

The deployment strategy prioritizes a reliable public submission under the hackathon deadline while preserving transparency. The repository remains the canonical engineering artifact; AppDeploy provides the public static judge experience. The technical adaptation—Next.js routes to a React/Vite hash-routed static build—is explicitly disclosed rather than presented as a direct repository deployment.
