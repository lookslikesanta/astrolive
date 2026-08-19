# QA and Demo Plan — AstroLive Compass

## Goal

Prevent a polished-looking prototype from failing during judging because of basic navigation, state, mobile, or deployment issues.

## Canonical smoke test

Run on production after every major deployment:

1. Open `/` in private/incognito browsing.
2. Confirm landing loads without authentication.
3. Select `Try the demo`.
4. Select `Use demo profile`.
5. Confirm Today greets Aarav and renders all three windows.
6. Select `Plan a moment`.
7. Choose `Difficult conversation`.
8. Choose valid date/time preference.
9. Generate result.
10. Save result.
11. Select `Add someone`.
12. Enter `Mira`.
13. Create shared moment.
14. Copy link.
15. Open copied link in a second incognito window/tab.
16. Confirm shared guidance renders.
17. Select expert/deeper-guidance CTA.
18. Confirm experts screen contains moment context.

Any failure in this path is release-blocking.

## Browser matrix

Minimum manual checks:

- Chrome desktop
- Chrome mobile emulation
- one real mobile browser if available

Nice to have:

- Safari/iPhone
- Firefox desktop

## Viewport checks

At minimum:

- 360 × 800
- 390 × 844
- 768 × 1024
- 1440 × 900

Check:

- no clipped headings
- no horizontal page overflow
- buttons fit
- cards do not become unreadably dense
- sticky actions do not cover form content
- shared URL/copy controls wrap safely

## Functional test matrix

### Landing

- CTA routes correctly
- no dead links
- prototype disclosure visible but not intrusive

### Onboarding

- required fields validate
- demo profile works
- custom name persists
- refresh does not corrupt state

### Today

- renders without profile crash
- handles missing storage safely
- `Why this?` toggles/accessibility works
- Plan CTA works

### Plan

- all six categories selectable
- result deterministic
- invalid date blocked
- changing category updates result
- save works
- refresh restores saved item if designed to

### Together

- collaborator is escaped/rendered safely
- share id/payload validates
- unknown link shows graceful fallback
- copy success feedback appears
- no sensitive birth fields in share URL

### Experts

- context is present when entered from a moment
- generic fallback works when opened directly
- demo status clear
- external link behavior safe if used

## Accessibility sweep

Manual:

- tab through entire canonical path
- verify focus visible
- submit forms with keyboard
- check labels associated with inputs
- inspect contrast for muted text
- verify supportive/caution states include text/icon meaning
- enable reduced motion and ensure nothing essential disappears

Automated accessibility tools are welcome if fast, but do not treat them as a replacement for manual interaction.

## Resilience checks

- delete localStorage mid-flow and reload
- open `/today` before onboarding
- open malformed `/together/...` id
- hard-refresh every route
- use browser Back after moment generation
- use long collaborator/title strings

## Production checks

Before submission:

- repository is public
- Vercel deployment is production-ready
- no preview password/auth wall
- no environment secret required for core flow
- browser console has no recurring exceptions
- network requests do not expose secrets
- favicon/title/description present
- all report links use production URL

## Screenshot capture plan

Capture clean 1440px desktop screenshots after content freezes:

1. Landing
2. Today
3. Plan result
4. Shared Moment
5. Expert handoff

Also capture one mobile composite or individual mobile screen if report layout benefits.

Use deterministic demo profile so report screenshots match the judge experience.

## Judge demo script

Target: 2–3 minutes.

### 0:00–0:20 — Problem

AstroLive already helps users when they actively seek astrology. Compass adds a reason to return before a crisis: understand today, plan a meaningful moment, and include someone when the moment is shared.

### 0:20–0:50 — Today

Use demo onboarding and show the action-first daily Compass.

### 0:50–1:30 — Plan

Create a Difficult Conversation moment. Show best/caution timing, practical guidance, and `Why this?`.

### 1:30–2:00 — Together

Add Mira and show the generated shared experience. Explain that the invite itself is functional, producing the virality loop.

### 2:00–2:30 — Expert handoff

Open deeper guidance. Explain how AstroLive's existing expert marketplace becomes the high-intent monetization layer.

### 2:30–2:45 — Close

Summarize: retention through Today, structural sharing through Together, monetization through contextual expert escalation.

## Stop-ship failures

Do not submit until fixed:

- production URL inaccessible logged out
- landing cannot reach demo
- plan generation throws
- share link only works in creator's local state when presented as cross-user sharing
- core route 404 on hard refresh
- private/sensitive data encoded in public URL
- report contains broken/placeholder URLs
- UI implies real consultation/payment succeeded when it did not
