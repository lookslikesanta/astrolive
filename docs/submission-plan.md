# Submission Plan — AstroHack 2026

## Objective

Convert the working prototype into a valid, judge-friendly submission without spending the final hours adding product scope.

## Known submission requirements to preserve

Based on the current AstroHack listing/rules research:

- public working prototype/demo
- public repository
- project report of at least 8 pages
- report should explain the problem, AstroLive teardown, proposed solution, expected impact, success metrics, references, and external/AI tools used
- report filename format follows `AstroLive_TeamName_LeaderName.pdf`
- links must be accessible without permission requests
- deadline: 20 August 2026, 11:59 PM IST

Before final upload, re-open the live submission portal and confirm no field/rule has changed.

## Submission strategy

The submission should tell one coherent story:

> AstroLive already has astrology utilities and astrologers. Compass adds an action layer that creates a daily habit, turns important moments into shareable collaboration, and routes high-intent users to AstroLive experts.

Do not present six unrelated features.

## Report structure

Target 9–10 pages. Minimum is not the target; clarity is.

### Page 1 — Cover

- AstroLive Compass
- short tagline
- team name
- leader name
- AstroHack 2026
- prototype URL
- repository URL

### Page 2 — Executive summary

- current opportunity
- product thesis
- three business outcomes: retention, virality, expert conversion

### Page 3 — AstroLive teardown

Show current product breadth and identify the behavioral gap:

- strong utilities/consultation surfaces
- weaker reason for action-first daily planning
- sharing opportunity

Avoid insulting the existing product.

### Page 4 — Problem and user insight

Explain passive astrology vs action-oriented needs.

Show Jobs-to-be-Done:

- What matters today?
- When should I do this?
- What if another person is involved?

### Page 5 — Solution: Today + Plan

Use screenshots.

Explain retention loop:

`Today → Plan → Act → Return`

### Page 6 — Solution: Shared Moments

Use screenshot.

Explain structural virality:

`Creator → Invite → Shared utility → Invitee activation`

Clarify that sharing is functional, not merely exporting a card.

### Page 7 — Expert handoff + business impact

Use screenshot.

Explain contextual conversion to AstroLive astrologers for higher-stakes moments.

Include future monetization possibilities as secondary only.

### Page 8 — UX and technical architecture

Show compact architecture diagram:

Prototype:

`Next.js UI → deterministic demo signals → local state`

Production:

`AstroLive account → astrology calculation → structured signals → optional AI explanation/localization → Compass → expert handoff`

### Page 9 — Success metrics + experimentation

Proposed metrics:

- onboarding completion
- repeat Today usage / D1 / D7
- moment creation rate
- share invite rate
- invite open rate
- invitee activation
- expert handoff CTR
- consultation conversion from Compass context

Suggested experiments:

- Today headline/action format
- moments surfaced from Today
- share prompt timing
- expert CTA timing

### Page 10 — Limitations, roadmap, sources, AI disclosure

Be explicit:

- prototype uses deterministic demo astrology signals
- production requires trusted astrology calculations
- no production auth/payments/chat were implemented
- AI/external tools used in research/design/development/report
- source list

## Report tone

Use:

- product reasoning
- evidence
- screenshots
- diagrams
- concise copy

Avoid:

- claiming unmeasured retention/revenue gains as facts
- invented user research
- fake analytics
- fake testimonials
- overclaiming astrology accuracy

Use language such as `we hypothesize`, `expected`, `would measure`, and `prototype demonstrates`.

## Public repository README requirements

Before submission, root `README.md` should contain:

- project summary
- challenge framing
- features
- screenshot/GIF if convenient
- local setup
- architecture summary
- prototype limitations
- deployed URL
- report link or report location
- AI/tool disclosure

The `/docs` folder remains deeper source-of-truth documentation.

## AI/tool disclosure ledger

At finalization, disclose actual tools used. Likely categories may include:

- ChatGPT / OpenAI models — product research, ideation, documentation, review
- Codex — implementation assistance if used
- GitHub — source control
- Next.js / React / TypeScript / Tailwind
- Vercel — deployment
- design/reference tools actually used

Do not list a tool simply because it was considered.

## Asset checklist

Required:

- [ ] public production URL
- [ ] public GitHub URL
- [ ] final PDF
- [ ] report filename correct
- [ ] team/leader names consistent
- [ ] screenshots reflect current production build
- [ ] sources and AI disclosure included

Recommended:

- [ ] favicon / simple Compass mark
- [ ] OG image
- [ ] 2–3 minute demo script
- [ ] one backup screen recording if submission permits it

## Final validation procedure

Use a completely logged-out/incognito browser.

1. Open public GitHub repo.
2. Open deployed prototype from README.
3. Run the canonical flow in `qa-and-demo.md`.
4. Download/open final PDF.
5. Click every URL inside the PDF.
6. Confirm report page count.
7. Confirm filename.
8. Confirm submission portal fields and final deadline.
9. Upload/submit.
10. Capture submission confirmation for records.

## Scope after prototype freeze

Once screenshots are captured for the final report, do not make visual/product changes unless fixing a submission-blocking bug. Screenshot/build mismatch creates unnecessary risk.
