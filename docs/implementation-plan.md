# Implementation Plan — AstroLive Compass

## Objective

Ship the six-screen vertical slice before polishing optional ideas.

## Build order

### Slice 0 — Project setup

Tasks:

- initialize Next.js + TypeScript + Tailwind
- establish fonts, root layout, metadata
- create design tokens
- create shared container/button/card/input primitives
- add lint/typecheck scripts
- deploy blank shell to Vercel early

Acceptance:

- app builds locally
- deployment succeeds
- mobile viewport has no horizontal overflow

### Slice 1 — Landing + onboarding

Tasks:

- landing hero and product loop
- `Try the demo`
- onboarding form
- `Use demo profile`
- local profile storage

Acceptance:

- fresh visitor can enter demo
- profile survives refresh
- validation works

### Slice 2 — Today / Compass

Tasks:

- daily fixture provider
- headline/action card
- timing windows
- `Why this?` disclosure
- CTA to Plan

Acceptance:

- profile name is reflected
- all fixture content is deterministic
- supportive/caution states are accessible

### Slice 3 — Plan a Moment

Tasks:

- category selection
- date/period/importance controls
- pure deterministic result generator
- result card
- save locally

Acceptance:

- every category produces a valid result
- saved moment survives refresh
- invalid inputs cannot generate

### Slice 4 — Shared Moment

Tasks:

- collaborator name
- safe shared payload or known demo id
- copy-link interaction
- `/together/[id]` page
- invitee CTA

Acceptance:

- copied link opens in a private window
- no birth data appears in URL
- invalid ids fail gracefully

### Slice 5 — Expert handoff

Tasks:

- carry moment context
- expert explanation
- three demo expert cards
- clearly mark prototype actions

Acceptance:

- judge understands revenue connection
- no fake payment/consultation success

### Slice 6 — Integration polish

Tasks:

- consistent shell/navigation
- back states
- empty states
- responsive refinement
- reduced motion
- accessibility sweep
- favicon/OG metadata

Acceptance:

- full journey works without developer tools
- zero dead primary CTAs

### Slice 7 — Verification + submission assets

Tasks:

- production deploy
- test incognito
- mobile + desktop screenshots
- report content/screenshots
- README public-facing summary
- source/AI disclosure
- final PDF

Acceptance:

- all public URLs accessible while logged out
- report meets minimum page requirement
- repository public

## Time-protection rules

If behind schedule, remove in this order:

1. decorative animation
2. optional profile/history
3. rich sharing implementation; fall back to known demo link
4. advanced tests beyond canonical smoke path
5. extra landing sections

Never remove:

- working deployment
- onboarding
- Today
- Plan
- shared concept
- expert handoff
- report compliance

## Branching recommendation

Given the short hackathon window, use small branches/slices only if they help review speed. Avoid complex GitFlow.

Suggested:

- `feat/s0-foundation`
- `feat/s1-onboarding`
- `feat/s2-today`
- etc.

Alternatively use one implementation branch with clean commits if time pressure makes PR overhead counterproductive.

## Coding constraints

- no new dependency without a concrete requirement
- no backend before MVP gate
- no external API key requirement for judge flow
- no `any` for core domain models
- no duplicated fixture content across pages
- no page-specific bespoke styling that violates design tokens without reason

## Review gate after each slice

Check:

1. Does the feature support the canonical journey?
2. Does it add a new failure dependency?
3. Does mobile work?
4. Is the product idea clearer after this change?
5. Can we delete anything before adding more?

## Definition of build complete

Build phase ends when the production URL can be opened from a logged-out browser and the entire canonical path completes with deterministic results. At that point, stop adding product scope and switch entirely to QA/report/submission work.