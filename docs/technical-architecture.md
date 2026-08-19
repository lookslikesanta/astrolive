# Technical Architecture — AstroLive Compass

## Architecture goal

Optimize for a reliable public hackathon prototype, not production completeness.

The MVP must be:

- fast to build
- deterministic
- easy to deploy
- safe to demo
- understandable in a public repository
- evolvable into a real AstroLive product later

## Recommended stack

### Application

- Next.js (App Router)
- TypeScript
- React
- Tailwind CSS
- shadcn/ui only where useful; do not let component-library defaults dictate the design
- Lucide icons

### State

- React state for transient form/UI state
- localStorage for persisted demo profile and moments
- URL params/path ids for shared demo moments

### Deployment

- Vercel

### Testing

- Vitest for deterministic logic if logic warrants unit tests
- Playwright for the canonical demo path if time permits
- browser/manual verification is mandatory regardless

## No backend for MVP

Do not add Supabase, Firebase, PostgreSQL, authentication, server actions requiring persistence, or external astrology APIs before the core demo is complete.

Reasons:

- no real multi-user persistence is necessary to prove the idea
- every external dependency creates failure modes near deadline
- shared moments can be encoded using deterministic local/demo ids
- judges need to experience the concept, not production infrastructure

## Route model

Recommended routes:

```txt
/                     landing
/onboarding           lightweight profile setup
/today                daily Compass
/plan                 Plan a Moment
/together/[id]        shared moment view
/experts              context-aware expert handoff
```

Optional only after MVP:

```txt
/you
/moments/[id]
```

## Folder direction

```txt
src/
  app/
    page.tsx
    onboarding/page.tsx
    today/page.tsx
    plan/page.tsx
    together/[id]/page.tsx
    experts/page.tsx
  components/
    app-shell/
    compass/
    moments/
    together/
    experts/
    ui/
  lib/
    demo-data/
    storage/
    astrology-demo/
    moments/
  types/
    index.ts
```

Exact structure can adapt to the generated project, but domain boundaries should stay clear.

## Core types

```ts
type UserProfile = {
  firstName: string;
  birthDate: string;
  birthTime?: string;
  birthPlace?: string;
};

type MomentCategory =
  | "interview"
  | "conversation"
  | "relationship"
  | "travel"
  | "purchase"
  | "study";

type Moment = {
  id: string;
  category: MomentCategory;
  title?: string;
  date: string;
  preferredPeriod: "morning" | "afternoon" | "evening" | "flexible";
  importance: "normal" | "important";
  result: MomentResult;
  collaborator?: {
    name: string;
  };
};

type GuidanceTone = "supportive" | "balanced" | "caution";

type TimeWindow = {
  label: string;
  time: string;
  tone: GuidanceTone;
  guidance: string;
};

type MomentResult = {
  headline: string;
  bestWindow: string;
  cautionWindow: string;
  guidance: string[];
  why: string;
};
```

## Deterministic generation

Create a pure function:

```ts
generateMomentResult(input: MomentInput): MomentResult
```

For MVP it maps category + a small deterministic seed to fixtures from `content-and-demo-data.md`.

Do not call an LLM for every generation.

Benefits:

- instant results
- reproducible screenshots
- no keys in public repo
- no quota/network errors during judging
- easier testing

## Shared moment strategy

### MVP option A — encoded share payload

Encode only non-sensitive demo moment fields into a compact URL-safe payload.

Pros: links work across devices without backend.

Cons: URL can be inspected; therefore never encode sensitive real birth data.

### MVP option B — seeded ids

Support a small set of known shared ids such as `/together/demo-conversation` and generate a visual copy-link interaction around them.

Pros: safest and simplest.

Cons: less realistic.

### Decision

Prefer **Option A only if it can be implemented safely and quickly without personal data**. Otherwise use Option B. Do not add a database solely to make sharing realistic.

## Storage keys

Use versioned keys:

```txt
astrolive-compass:v1:profile
astrolive-compass:v1:moments
astrolive-compass:v1:settings
```

All storage access should be wrapped in client-safe helper functions and tolerate malformed/absent values.

## Analytics events — production design

No analytics SDK is required for MVP unless already trivial to configure.

Document intended events:

```txt
landing_demo_started
onboarding_completed
today_viewed
moment_started
moment_generated
moment_saved
shared_moment_created
shared_moment_opened
expert_handoff_clicked
```

These events map directly to hackathon success metrics.

## Production architecture evolution

A real AstroLive implementation should evolve to:

```txt
Web/mobile client
  ↓
AstroLive user/account layer
  ↓
Moment service
  ↓
Trusted astrology calculation service
  ↓
Structured signal/rules layer
  ↓
Optional LLM explanation/localization layer
  ↓
Safety + deterministic validation
  ↓
Compass UI / notifications / expert handoff
```

### Where AI belongs

Use an LLM for:

- converting structured signals into plain-language explanations
- controlled tone variants
- multilingual explanation/localization
- summarizing context before expert handoff

Do not use an LLM as the source of astronomical truth.

## Privacy principles

Birth details and relationship information can be sensitive.

Production requirements should include:

- collect only necessary fields
- transparent purpose for birth data
- encrypted persistence
- deletion controls
- strict access rules
- no inclusion of private birth data in public share URLs

For the MVP, local-only storage reduces infrastructure risk but should still be disclosed.

## Security baseline

- no secrets in repo
- no private API keys in `NEXT_PUBLIC_*`
- external links use safe target/rel attributes when opening new tabs
- sanitize/escape any user-provided values through normal React rendering
- validate URL-decoded shared payloads before use
- no `dangerouslySetInnerHTML` for generated content

## Performance target

Keep the app mostly static/client-light:

- avoid unnecessary client components
- avoid heavy astrology animation libraries
- optimize any hero assets
- target fast first load on mobile networks

The visual design should not require WebGL or a 3D library to feel premium.

## Architectural freeze

Do not add backend/AI/API infrastructure until:

1. all six screens work
2. canonical journey works after hard refresh
3. mobile layout works
4. Vercel deployment is stable
5. report screenshots can be captured
