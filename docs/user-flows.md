# User Flows — AstroLive Compass

## Goal

Define exactly how judges and users move through the MVP so implementation does not drift into disconnected screens.

## Flow A — First-time judge

1. Open `/`.
2. Read one-line value proposition.
3. See three proof points: daily utility, plan important moments, shared guidance.
4. Select `Try the demo`.
5. Enter lightweight onboarding details.
6. Land on Today.
7. Inspect today's headline, energy windows, and recommended action.
8. Select `Plan a moment`.
9. Choose a moment category and date/window.
10. Generate recommendation.
11. Select `Add someone`.
12. Create shared link.
13. Open shared preview.
14. Select `Talk to an astrologer` for deeper guidance.

Success: judge understands habit, virality, and monetization without explanation from the team.

## Flow B — Returning demo user

1. Open app.
2. Local state detects completed onboarding.
3. Go directly to Today.
4. See saved planned moment summary.
5. Start another moment or open existing shared moment.

## Flow C — Plan a Moment

Inputs:

- moment category
- title (optional)
- date
- preferred period (morning / afternoon / evening / flexible)
- importance level (normal / important)

Moment categories for MVP:

- Interview / meeting
- Difficult conversation
- Date / relationship
- Travel
- Purchase / decision
- Study / focus

Output:

- concise recommendation headline
- best demo window
- caution window
- 2–3 practical suggestions
- short `Why this?` explanation
- CTA: save
- CTA: add someone
- CTA: deeper guidance from expert

## Flow D — Shared Moment

1. User creates a moment.
2. Select `Add someone`.
3. Enter collaborator name only for MVP; optional birth details can be simulated.
4. App creates stable local/demo share id.
5. Show copyable URL pattern `/together/[id]`.
6. Shared view explains the moment and gives combined guidance.
7. Invitee sees a light CTA to `Create your own Compass`.

The share screen must be understandable without requiring the invitee to sign in.

## Flow E — Expert handoff

Triggers:

- moment marked important
- user selects `Get deeper guidance`
- caution state is prominent

Handoff screen contains:

- context summary of the user's moment
- why an expert may help
- 3 sample astrologer cards using demo data
- AstroLive-style actions such as chat/call, but they may remain demo CTAs

Do not simulate a fake completed payment or fake live consultation.

## State transitions

### User state

`new → onboarded → returning`

### Moment state

`draft → generated → saved → shared`

### Share state

`created → opened → invitee-activated`

Only the first two share states need real prototype behavior; activation can be represented in analytics documentation.

## Empty/error states

- Invalid date: explain and prevent generation.
- Missing required onboarding field: inline validation.
- Unknown shared id: friendly `This shared moment is unavailable` state with CTA to demo.
- localStorage unavailable: app should still work for current session using in-memory defaults.

## Demo shortcut

A `Use demo profile` action is allowed during onboarding so judges can reach the core experience quickly.

Demo profile should be deterministic and documented in `content-and-demo-data.md`.
