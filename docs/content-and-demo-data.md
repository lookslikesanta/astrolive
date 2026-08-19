# Content and Demo Data — AstroLive Compass

## Purpose

The prototype needs to feel personalized without pretending to run a production astrology engine. This document defines deterministic demo content so screens remain internally consistent and development does not invent copy independently.

## Demo profile

Use one canonical quick-start profile:

```ts
{
  firstName: "Aarav",
  birthDate: "1998-11-14",
  birthTime: "09:20",
  birthPlace: "Lucknow, Uttar Pradesh, India"
}
```

The user may enter their own data, but prototype astrology output may map to the same deterministic fixture family unless a simple seeded variant is implemented.

## Daily Compass fixture

### Headline

`A better day for clarity than speed.`

### Summary

`Use the earlier part of the day to organize, review, and have conversations that need patience. Avoid forcing quick decisions simply to clear them from your list.`

### Lean into

- planning
- honest conversations
- focused work

### Take care with

- rushed commitments
- impulse purchases

### Windows

```ts
[
  {
    label: "Morning",
    time: "8:30 AM – 11:00 AM",
    tone: "supportive",
    guidance: "Good for planning, preparation, and focused work."
  },
  {
    label: "Afternoon",
    time: "1:30 PM – 3:30 PM",
    tone: "caution",
    guidance: "Keep important decisions reversible where possible."
  },
  {
    label: "Evening",
    time: "6:00 PM – 8:00 PM",
    tone: "balanced",
    guidance: "Better for conversations and reflection than heavy execution."
  }
]
```

### Why this

`Your demo chart signals are being translated into practical timing guidance. In a production version, AstroLive would calculate the underlying planetary positions deterministically and use an explanation layer to make them easier to act on.`

## Moment categories and fixtures

### Interview / meeting

Headline: `Prepare early, then keep the conversation flexible.`

Best window: `9:20 AM – 10:50 AM`

Caution window: `2:00 PM – 3:15 PM`

Guidance:

- Review the two points you most want remembered.
- Keep ten minutes of buffer before the meeting.
- Avoid changing your core position only because the conversation becomes tense.

### Difficult conversation

Headline: `Choose clarity over winning the conversation.`

Best window: `6:10 PM – 7:30 PM`

Caution window: `1:40 PM – 3:00 PM`

Guidance:

- Start with what you want to resolve.
- Ask one clarifying question before defending your view.
- Leave room to continue later if emotions rise.

### Date / relationship

Headline: `Keep the plan simple enough for the conversation to lead.`

Best window: `6:30 PM – 8:10 PM`

Caution window: `3:00 PM – 4:00 PM`

Guidance:

- Prefer a relaxed plan over an over-scheduled one.
- Say what you actually mean instead of testing reactions.
- Do not treat one awkward moment as the meaning of the whole evening.

### Travel

Headline: `Preparation matters more than squeezing the schedule.`

Best window: `8:00 AM – 10:30 AM`

Caution window: `2:10 PM – 3:30 PM`

Guidance:

- Leave buffer for delays.
- Confirm documents, fuel/charge, and route before departure.
- Avoid stacking another time-sensitive commitment immediately after arrival.

### Purchase / decision

Headline: `Compare first; commit after the urgency fades.`

Best window: `10:00 AM – 11:30 AM`

Caution window: `1:30 PM – 3:30 PM`

Guidance:

- Compare the option against your original requirement.
- Separate a limited-time offer from a genuinely limited opportunity.
- For expensive decisions, sleep on it when practical.

### Study / focus

Headline: `Use a protected block instead of chasing motivation.`

Best window: `8:30 AM – 10:45 AM`

Caution window: `2:00 PM – 3:00 PM`

Guidance:

- Start with the hardest defined task.
- Keep the phone physically away for one block.
- Finish by writing the next starting point.

## Shared Moment fixture

Example:

- Creator: Aarav
- Collaborator: Mira
- Moment: Difficult conversation

Headline:

`The strongest window is one where both of you can slow the pace.`

Works well:

- stating the issue directly
- allowing pauses
- agreeing on one next step

Take care with:

- reading silence as rejection
- bringing unrelated old issues into the same conversation

Shared window:

`6:20 PM – 7:20 PM`

## Expert demo data

Use clearly demo/sample profiles unless the team decides to source real AstroLive astrologers with permission/public data.

```ts
[
  {
    id: "expert-1",
    name: "Astrologer Meera",
    specialty: "Relationships & life guidance",
    languages: ["Hindi", "English"],
    experience: "8+ years"
  },
  {
    id: "expert-2",
    name: "Astrologer Arjun",
    specialty: "Career & decision timing",
    languages: ["Hindi", "English"],
    experience: "10+ years"
  },
  {
    id: "expert-3",
    name: "Astrologer Kavya",
    specialty: "Vedic astrology & compatibility",
    languages: ["Hindi", "English"],
    experience: "7+ years"
  }
]
```

## Copy rules

### Use

- supportive window
- caution window
- consider
- may be useful
- reflection
- guidance
- stronger/weaker timing

### Avoid

- guaranteed
- definitely will happen
- lucky enough to win
- your relationship will fail
- you will become rich
- health diagnosis/prediction
- financial certainty
- fear-based upsell copy

## Prototype disclosure

A concise disclosure should appear in an appropriate location:

`Hackathon prototype: guidance is generated from deterministic demo astrology signals, not a production birth-chart engine.`

Do not repeat this warning on every card; keep the product usable while remaining honest.