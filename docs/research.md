# Research — AstroLive, Market Patterns, and Product Opportunity

## Purpose

This document captures the research that informs the prototype. It is not a comprehensive market study; it exists to justify product choices and provide material for the hackathon report.

## AstroLive today

AstroLive currently positions itself as a broad astrology platform with multiple utilities and consultation surfaces, including astrologer chat/calls/live sessions, horoscope, Panchang, Kundli-related features, reports, pooja-related services, commerce, and content.

### Product implication

The whitespace is not "more astrology features." The stronger opportunity is a behavior layer that connects existing capabilities into a repeatable user loop.

A new generic horoscope screen would overlap with existing functionality. A generic AI astrologer would also compete directly with AstroLive's human expert marketplace and would not create a uniquely defensible habit.

## Adjacent product patterns

### CHANI

Useful pattern: daily astrology as a ritual.

CHANI demonstrates that astrology can support repeated daily engagement when users receive a structured, personalized interpretation rather than treating astrology only as an emergency consultation product.

What to borrow conceptually:

- recurring daily check-in
- clear hierarchy of what matters today
- personalized guidance

What not to copy:

- editorial voice
- visual identity
- exact content structure

### Co–Star

Useful pattern: astrology as a social object.

Co–Star demonstrates that social relationships can make astrology inherently shareable. Friend and compatibility contexts turn private interpretations into conversation starters.

What to borrow conceptually:

- another person creates a reason to invite/share
- shared interpretation can be a product feature rather than a generic share button

What not to copy:

- social graph mechanics
- product tone
- relationship score presentation

### AstroTalk and similar Indian consultation platforms

Useful pattern: high-intent astrology questions can convert into paid human consultation.

The category has trained users to seek human astrologers for consequential questions. AstroLive Compass should not fight that behavior. It should improve the context preceding the consultation and make the handoff feel relevant.

## Core opportunity

The strongest product opportunity is the intersection of three behaviors:

1. Daily utility — a lightweight reason to return.
2. Planning — astrology translated into a specific decision or moment.
3. Sharing — planning becomes collaborative when another person matters.

This leads to the product thesis:

> Astrology should not only tell users what the stars mean. It should help users decide what to do next.

## Why "Plan a Moment" is stronger than another horoscope

A generic horoscope is passive. A planned moment has intent.

Examples:

- interview
- important meeting
- difficult conversation
- date
- trip
- purchase
- launch/post
- study session
- family discussion
- celebration

Each moment gives the product context to create a recommendation and gives AstroLive a natural point to offer expert help if the stakes are high.

## Why Shared Moments can create structural virality

Most share buttons are distribution features: a user exports content to a social network.

Shared Moments instead make another person part of the product output.

Proposed loop:

1. User A plans a moment.
2. User A chooses "Add someone."
3. Product creates an invite link.
4. User B opens a lightweight shared view.
5. User B optionally adds basic details.
6. The shared guidance becomes richer.
7. User B is introduced to AstroLive Compass and can create their own moment.

The invite is therefore functional, not promotional.

## Retention hypothesis

Today/Compass can create a daily loop when it stays concise and changes meaningfully from day to day.

The prototype does not need to prove retention. It needs to demonstrate a plausible loop and define how it would be measured.

Candidate metrics:

- onboarding completion rate
- Today view repeat rate (D1/D7)
- percentage of Today viewers who create a moment
- moments created per weekly active user
- shared-moment invite rate
- invite open rate
- invited-user activation rate
- expert handoff click-through rate

## Monetization hypothesis

Do not paywall the core prototype.

Potential monetization paths for a real product:

1. Expert consultations triggered from high-intent moments.
2. Premium deep-dive moment reports.
3. Subscription for richer planning/history/advanced guidance.
4. Couple/family planning products later.

For the hackathon prototype, only expert handoff needs to be demonstrated.

## AI position

AI is not the product idea by itself.

A production version could use an LLM to transform deterministic astrology data and structured rules into accessible, localized explanations. It should not invent planetary facts or calculate astrology without a trusted calculation layer.

Recommended production architecture:

`birth/event inputs → deterministic astrology calculation → structured signals → LLM explanation layer → safety/content rules → UI`

Prototype architecture can replace the calculation layer with deterministic fixtures.

## Localization opportunity

Astrology is culturally and linguistically broad in India. A future version should support Hindi and regional languages, but hackathon scope should remain English-first unless localization is trivial after the core flow is complete.

An LLM could later assist with tone-aware localization, while critical astrology terms should come from curated glossaries rather than unconstrained translation.

## Product risks

### Trust

Users may interpret recommendations as certainty.

Mitigation:

- use language such as "supportive window," "consider," and "reflection"
- avoid promises about health, wealth, relationships, or guaranteed outcomes
- show a concise "why" behind recommendations

### Astrology credibility

Mock results could look arbitrary.

Mitigation:

- explicitly label the hackathon prototype as using demo astrology data where appropriate
- maintain internally consistent fixtures
- document the production calculation architecture

### Over-complexity

Astrology products easily accumulate charts, houses, planets, scores, and jargon.

Mitigation:

- progressive disclosure
- action summary first
- details optional

## Research conclusion

Do not build a miniature clone of AstroLive's current product.

Build a focused product layer that makes AstroLive useful before a consultation, repeatedly useful between consultations, and naturally shareable when another person is involved.