# UI/UX Specification — AstroLive Compass

## UX objective

The experience should feel immediately understandable to a non-expert judge. Astrology concepts are supporting evidence; the interface is organized around decisions and actions.

## Information architecture

Primary conceptual navigation:

- Today
- Plan
- Together
- Experts
- You

For MVP, implement only routes required by the six-screen journey. Do not expose dead navigation.

## Screen 1 — Landing / Judge Explainer

### Purpose

Explain the product in under 15 seconds.

### Required content

- Product name: AstroLive Compass
- Headline focused on planning, not prediction
- One-sentence explanation
- Primary CTA: `Try the demo`
- Secondary explanation of the loop: Today → Plan → Together → Expert
- Three product benefits:
  - Know the tone of your day
  - Plan meaningful moments
  - Include the people who matter
- Small disclosure that prototype guidance uses demo astrology data

### Avoid

- giant astrology wheel as the only visual
- excessive mystical copy
- long marketing page
- fake testimonials

## Screen 2 — Onboarding

### Required fields

- first name
- date of birth
- birth time (optional in prototype)
- birthplace (optional/demo-safe)

### Actions

- `Continue`
- `Use demo profile`

### UX rules

- one compact form, not a long multi-step wizard
- explain why birth details matter
- no account/password creation
- save locally

## Screen 3 — Today / Compass

### Hierarchy

1. greeting + date
2. daily headline
3. concise action recommendation
4. timeline/windows
5. `Why this?` expandable explanation
6. primary CTA: `Plan a moment`
7. saved/upcoming moment if one exists

### Suggested card structure

**Today's Compass**

- Headline: `A better day for clarity than speed.`
- Support line
- `Lean into` chips
- `Take care with` chips

**Your windows**

Morning / Afternoon / Evening timeline with one highlighted supportive window and one caution window.

Do not represent a numerical score as scientifically precise.

## Screen 4 — Plan a Moment

### Form

- category selection cards
- date
- preferred time period
- optional title
- importance toggle

### Result state

Generate result in the same page or a clear second state.

Result sections:

- recommendation headline
- best window
- caution window
- practical guidance
- why explanation
- buttons: `Save`, `Add someone`, `Ask an expert`

The recommendation must feel actionable even if the user ignores the astrology explanation.

## Screen 5 — Shared Moment

### Creator state

- moment summary
- collaborator name
- short explanation of what sharing unlocks
- `Create shared moment`
- generated copy-link control

### Shared view

- both names
- event/moment title
- combined guidance headline
- what works well
- what to be careful about
- shared recommended window
- CTA: `Create your own Compass`
- optional expert CTA

Avoid treating relationship compatibility as a deterministic love score.

## Screen 6 — Experts

### Purpose

Demonstrate a context-aware commercial handoff.

### Layout

- `Need deeper guidance for this moment?`
- compact summary of the current moment
- expert cards with:
  - name
  - specialties
  - language
  - experience/demo rating if clearly marked demo
  - chat/call-style CTA

If linking to real AstroLive surfaces is simple and appropriate, use an external link. Otherwise label interaction as prototype/demo.

## Responsive behavior

### Mobile first

- single-column cards
- sticky bottom primary action only where useful
- minimum 44px interactive targets
- no horizontal scrolling except intentional chip rails
- timeline becomes stacked time blocks

### Desktop

- content max-width around 1100–1200px
- Today may use 2-column composition: main Compass + upcoming/action rail
- forms should remain narrow enough to scan comfortably

## Interaction principles

- every primary CTA must have a visible result
- use skeleton/loading only if delay is intentional; deterministic generation should feel fast
- avoid modal chains
- preserve form state when navigating back
- copy-link action must show success feedback

## Accessibility

- semantic labels for every input
- keyboard accessible controls
- visible focus states
- text/background contrast at WCAG AA target
- icons never carry meaning alone
- respect `prefers-reduced-motion`
- do not rely on green/red alone for supportive/caution states

## Judge usability requirement

A judge must never wonder:

- what the product does
- what to click next
- whether an interaction is real or mocked
- how the feature helps AstroLive

When necessary, small prototype notes are better than misleading realism.
