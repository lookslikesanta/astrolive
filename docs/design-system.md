# Design System — AstroLive Compass

## Design intent

The product should feel calm, modern, premium, and trustworthy—not like a generic neon-purple astrology template.

The visual language should communicate:

- clarity
- calm guidance
- warmth
- subtle celestial character
- contemporary Indian consumer product quality

## Visual direction

Use a restrained cosmic/editorial system rather than literal zodiac decoration everywhere.

Recommended foundation:

- warm off-white / near-black surfaces
- one deep indigo or midnight accent family
- one warm gold/saffron highlight used sparingly
- soft neutral borders
- subtle radial gradients only where they create hierarchy

Do not overuse stars, moons, constellation lines, glassmorphism, or glowing purple cards.

## Color tokens

Exact values may be tuned during implementation after browser review. Keep semantic roles stable.

```css
--background: warm off-white;
--surface: white;
--surface-subtle: light neutral;
--foreground: near-black;
--muted-foreground: mid neutral;
--border: soft neutral;
--primary: deep indigo/midnight;
--primary-foreground: near-white;
--accent: warm gold/saffron;
--supportive: calm teal/blue family;
--caution: amber/earth family;
```

Do not encode meaning through color alone.

## Typography

Use one high-quality sans-serif family for the application. A restrained serif/display face may be used only for hero/editorial emphasis if it does not complicate loading.

Hierarchy:

- Display: landing headline only
- H1: page identity
- H2: major card/section heading
- Body: 16px target on mobile
- Small/meta: minimum readable size; avoid tiny 11–12px interface copy

Typography should feel product-first, not occult-themed.

## Spacing

Use a 4px base grid with primary spacing steps:

`4, 8, 12, 16, 24, 32, 48, 64`

Rules:

- cards: 20–24px internal padding desktop, 16–20px mobile
- major section gaps: 32–64px
- related label/control gap: 8px

## Radius

- inputs/buttons: medium radius
- cards: 16–24px
- chips: pill only when semantically appropriate

Do not make every rectangular element a giant rounded pill.

## Shadows and borders

Prefer borders and surface contrast over heavy shadows.

Use shadows only for:

- elevated floating controls
- dropdowns
- intentional layered cards

## Core components

### Button

Variants:

- primary
- secondary
- ghost
- text/link

Primary CTA should be visually dominant once per section.

### Card

Variants:

- standard
- highlighted/primary
- supportive state
- caution state
- interactive selection

### Chip

Use for categories, themes, and compact status—not for primary navigation.

### Input

- text
- date
- time/period selection
- segmented control

### Timeline block

Represents Morning / Afternoon / Evening with:

- label
- time range
- short guidance
- semantic supportive/caution treatment

### Moment card

Contains:

- category icon
- title
- date/time
- compact status
- next action

### Expert card

Contains:

- avatar placeholder or real permitted image
- name
- specialty
- language
- consultation CTA

## Iconography

Use one consistent outline icon set already compatible with the frontend stack (for example Lucide).

Avoid emoji as permanent product icons.

## Celestial motif

Use a minimal Compass mark made from circular/orbital geometry, cardinal direction cues, or a restrained star point.

The visual motif may appear in:

- landing hero
- daily Compass card
- loading/transition micro-animation

It should not compete with content.

## Motion

Motion should clarify state.

Allowed:

- small card entrance/fade
- timeline highlight transition
- selected-category feedback
- copy-link confirmation
- subtle Compass rotation/settle on generation

Avoid:

- constant floating stars
- long page-load animations
- cursor-follow effects
- large parallax systems

Target transitions: approximately 150–300ms for interface changes.

## Accessibility design rules

- target WCAG AA contrast
- focus ring visible on all interactive controls
- hover cannot be the only discoverability mechanism
- supportive/caution states include labels/icons, not color alone
- minimum tap area about 44px
- reduced-motion mode disables non-essential animation

## Reference test

Before accepting a screen, ask:

1. Would this still feel credible if every zodiac/star illustration were removed?
2. Is the next action visually obvious?
3. Is there too much decorative astrology and too little useful product information?
4. Does it feel like one coherent system across all six screens?

If the first answer is no, redesign the screen.