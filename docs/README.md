# AstroLive Compass — Project Documentation

> Status: planning / pre-development  
> Hackathon: AstroHack 2026 — Build the Next Universe  
> Submission deadline: 20 August 2026, 11:59 PM IST  
> Repository role: source of truth for prototype, report, and submission decisions

## Project goal

Build the smallest credible AstroHack submission that demonstrates a real product opportunity for AstroLive while remaining feasible to implement and polish before the deadline.

The product direction is **AstroLive Compass + Shared Moments**: an action-first astrology planning layer that creates daily habit, contextual sharing, and a natural handoff to AstroLive's human astrologers.

## Canonical build scope

The required prototype is a six-screen vertical slice:

1. Landing / judge explainer
2. Lightweight onboarding
3. Today / Compass
4. Plan a Moment
5. Shared Moment
6. Expert handoff

Everything else is optional until this path works end-to-end.

## Documentation map

Read in this order before development:

1. [`product-brief.md`](./product-brief.md) — product thesis, scope, jobs, and non-goals.
2. [`research.md`](./research.md) — AstroLive/category research and opportunity reasoning.
3. [`user-flows.md`](./user-flows.md) — canonical judge/user journeys and state transitions.
4. [`ui-ux.md`](./ui-ux.md) — information architecture, screen requirements, UX behavior, responsive rules.
5. [`design-system.md`](./design-system.md) — visual direction, tokens, components, motion, accessibility.
6. [`content-and-demo-data.md`](./content-and-demo-data.md) — demo personas, deterministic astrology fixtures, copy rules.
7. [`technical-architecture.md`](./technical-architecture.md) — stack, routes, state model, data contracts, production evolution.
8. [`implementation-plan.md`](./implementation-plan.md) — slices, acceptance criteria, sequence, freeze rules.
9. [`qa-and-demo.md`](./qa-and-demo.md) — test matrix, judge demo path, browser/device checks.
10. [`submission-plan.md`](./submission-plan.md) — report outline, compliance, assets, final submission checklist.
11. [`sources.md`](./sources.md) — research/source ledger for report citations and AI disclosure.

## Decision hierarchy

If documents conflict, use this priority:

1. `README.md` scope and freeze rules
2. `product-brief.md`
3. `implementation-plan.md`
4. `user-flows.md` + `ui-ux.md`
5. `technical-architecture.md`
6. design/content supporting docs

Do not expand scope because a supporting document suggests an optional idea.

## Freeze rules

Until the six-screen vertical slice is deployed and verified:

- no authentication backend
- no database
- no real astrology calculation engine
- no payments
- no dashboard/admin
- no chat/video implementation
- no complex profile system
- no speculative AI chatbot
- no extra routes just to make the project look larger

Use deterministic demo data and local browser state to make the experience interactive and internally coherent.

## Product loop

`Today → Plan → Share/Act → Return`

Commercial escalation:

`High-intent moment → Need deeper guidance → AstroLive expert`

## Navigation model

Conceptual product navigation:

`Today · Plan · Together · Experts · You`

The hackathon prototype does not need every navigation destination implemented. Unimplemented destinations must not be dead links; hide or mark them as future concepts instead.

## Definition of done

The prototype is submission-ready when a fresh visitor can:

- understand the concept on the landing page
- complete onboarding without an account
- see a personalized Today state
- choose and generate a planned moment
- create/open a shared moment
- reach a relevant expert handoff
- complete the journey on mobile and desktop without broken states

And the repository contains:

- public working code
- public deployment URL
- minimum 8-page report PDF
- disclosed AI/external tools
- documented research sources
- final submission links checked in incognito/private browsing

## Development gate

**Do not start implementation until these docs are reviewed once as a set.** After review, freeze the MVP scope and execute `implementation-plan.md` slice by slice.
