# Automiq AI-Potenzialanalyse — Design Architecture

## The Concept: "Command Center"

This isn't another dark SaaS landing page. This is a **mission control interface** — the visitor is looking at the command center of an AI operation that's already running, already delivering results, already transforming businesses. The design makes them feel like they're peering into a live system.

**The unforgettable moment**: When the hero loads, subtle data-stream particles float upward behind the headline like a living neural network. The stats in the benefit boxes count up in real-time. The form glows brighter as fields are filled — as if the system is "activating" for them. By the time they reach the CTA, they feel like they're joining something already in motion, not buying a cold service.

**Tone**: Controlled power. Like a Tesla dashboard — dark, precise, quietly overwhelming in capability. Not flashy. Not desperate. The design says "we don't need to convince you — we'll show you."

---

## Typography Override

The design system specified Space Grotesk + Inter. We're upgrading for distinctiveness:

**Headings: Outfit** — Geometric sans-serif with slightly rounded terminals. More distinctive than Space Grotesk, warmer than Manrope, still reads as precise/technical. The subtle roundness softens the dark interface for conservative KMU owners without losing authority. Excellent German language support.

**Body: DM Sans** — More characterful than Inter while maintaining excellent readability. Slightly geometric, clean, designed for digital interfaces. Handles umlauts perfectly.

**Accent/Labels: JetBrains Mono** — Used sparingly for stats, counters, the urgency bar number, and form labels. Gives a "live system" feel — monospace = data = real.

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap');
```

| Role | Font | Weight | Size | Tracking |
|------|------|--------|------|----------|
| Display | Outfit | 800 | clamp(44px, 5.5vw, 76px) | -0.03em |
| H1 | Outfit | 700 | clamp(34px, 4vw, 60px) | -0.025em |
| H2 | Outfit | 700 | clamp(28px, 3.5vw, 46px) | -0.02em |
| H3 | Outfit | 600 | clamp(20px, 2.5vw, 30px) | -0.01em |
| Body Large | DM Sans | 400 | clamp(17px, 1.2vw, 20px) | 0 |
| Body | DM Sans | 400 | 16px | 0.005em |
| Body Small | DM Sans | 400 | 14px | 0.01em |
| Stat/Counter | JetBrains Mono | 700 | clamp(32px, 4vw, 56px) | -0.02em |
| Label/Tag | JetBrains Mono | 500 | 11px | 0.08em |
| CTA Button | Outfit | 600 | 16px | 0.03em |

---

## Spatial Composition

### Overall Flow

The page has a **vertical rhythm** that alternates between wide cinematic sections and contained content blocks. Each section has its own atmospheric gradient zone — they bleed into each other at the boundaries creating a seamless, cinematic scroll experience.

```
┌─────────────────────────────────────────────────┐
│ URGENCY BAR — amber pulse, full width, 40px     │
├─────────────────────────────────────────────────┤
│ NAV — floating glass, 80px below top             │
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌──────────────────┐  ┌──────────────────────┐ │
│  │                  │  │                      │ │
│  │  HEADLINE        │  │  LEAD FORM           │ │
│  │  Subheadline     │  │  (glass card)        │ │
│  │                  │  │                      │ │
│  │  ┌────┐ ┌────┐  │  │  Name ___________    │ │
│  │  │ +60%│ │-80%│  │  │  Email __________    │ │
│  │  └────┘ └────┘  │  │  Phone __________    │ │
│  │  ┌────┐ ┌────┐  │  │  Size [dropdown]     │ │
│  │  │24/7│ │ ✓  │  │  │  Revenue [dropdown]  │ │
│  │  └────┘ └────┘  │  │  Pain [dropdown]     │ │
│  │                  │  │                      │ │
│  │  [logos strip]   │  │  [ JETZT BUCHEN ]    │ │
│  └──────────────────┘  └──────────────────────┘ │
│                                                  │
│  ═══ gradient transition ═══════════════════════ │
│                                                  │
│  ┌──────────────────────────────────────────────┐│
│  │  PROBLEM AGITATION                           ││
│  │  "Kennen Sie diese Herausforderungen?"       ││
│  │                                              ││
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐       ││
│  │  │ Pain 1  │ │ Pain 2  │ │ Pain 3  │       ││
│  │  └─────────┘ └─────────┘ └─────────┘       ││
│  └──────────────────────────────────────────────┘│
│                                                  │
│  ═══ gradient transition ═══════════════════════ │
│                                                  │
│  ┌──────────────────────────────────────────────┐│
│  │  3-STEP SOLUTION                             ││
│  │                                              ││
│  │  (1)────────(2)────────(3)                   ││
│  │  Analyse    Empfehlung  Implementierung      ││
│  │  [card]     [card]      [card]               ││
│  └──────────────────────────────────────────────┘│
│                                                  │
│  ═══ gradient transition ═══════════════════════ │
│                                                  │
│  ┌──────────────────────────────────────────────┐│
│  │  TESTIMONIALS                                ││
│  │  [glass card]     [glass card]               ││
│  └──────────────────────────────────────────────┘│
│                                                  │
│  ┌──────────────────────────────────────────────┐│
│  │  FINAL CTA                                   ││
│  │  "Bereit für Ihr AI-Upgrade?"                ││
│  │  [ JETZT BUCHEN ]                            ││
│  └──────────────────────────────────────────────┘│
│                                                  │
│  FOOTER — minimal                                │
└─────────────────────────────────────────────────┘
```

### Container Strategy
- Max width: `1280px` (max-w-7xl)
- Padding: `24px` mobile, `32px` tablet, `48px` desktop
- Hero and CTA sections break the container for full-bleed backgrounds
- Content within always respects the max-width

---

## Section-by-Section Creative Direction

### 1. Urgency Top Bar
**Visual**: Thin amber strip across the very top. A pulsing dot on the left. The seat count uses JetBrains Mono and has a subtle flicker effect (like a live counter).

**Key detail**: The bar has a very subtle shimmer animation — a light streak that passes across it every 4 seconds, creating a sense of live urgency without being obnoxious.

```
[● Nur noch 7 Plätze frei: Sichern Sie sich Ihre AI-Potenzialanalyse zum Sonderpreis!]
```

### 2. Navigation
**Visual**: Floating 12px below urgency bar. Glass effect (surface bg at 0.6 opacity + backdrop-blur). Logo on left ("automiq" in Outfit 700, lowercase, with a cyan dot on the 'i'). Single CTA button on right: "Analyse buchen" in gradient.

**Scroll behavior**: On scroll, nav gets slightly more opaque and a bottom border appears (slate-800). Smooth CSS transition.

**Mobile**: Logo left, hamburger right (but minimal — it's a one-pager, so just a scroll-to-form button instead of a menu).

### 3. Hero Section
**Visual**: The centerpiece. Split layout 55/45 on desktop.

**Left side**:
- Small tag above headline: `[ AI-POTENZIALANALYSE ]` in JetBrains Mono, uppercase, cyan text, glass pill
- Display headline in Outfit 800, white. Key phrase "AI-Revolution" gets a gradient text treatment (blue → cyan)
- Subheadline in DM Sans, slate-400, 20px
- 4 benefit boxes in a 2x2 grid below (see Benefit Boxes section)
- Authority logo strip at the bottom (grayscale, subtle)

**Right side**:
- Lead capture form in a glass card with a prominent glow border effect
- The card has a subtle animated gradient border (conic gradient rotating slowly)
- Form title in Outfit 600
- Fields with dark backgrounds (#0E1320), slate-700 borders, blue-500 glow on focus
- The CTA button spans full width, gradient background, prominent glow

**Background atmosphere**: Three layered radial gradients creating a mesh effect. A very subtle canvas of floating particles (small dots, 0.3 opacity, drifting upward slowly) gives depth without distraction.

### 4. Benefit Boxes (within Hero)
**Visual**: 2x2 grid of glass cards. Each card has:
- A small icon (Lucide, 20px) in a gradient circle
- Stat number in JetBrains Mono bold ("+60%", "-80%", "24/7", "100%")
- Title in Outfit 600
- One-line description in DM Sans, slate-400

**Color coding**: Each card has a different subtle glow accent:
- Mehr Umsatz → emerald glow
- Weniger Kosten → blue glow
- 24/7 Verfügbarkeit → cyan glow
- Zukunftssicher → violet glow

**Animation**: Cards stagger in from below with 0.12s delay. Stat numbers count up from 0 when scrolled into view.

### 5. Authority Logos
**Visual**: Horizontal strip below benefit boxes. "Vertrauen von führenden Unternehmen" in label style (JetBrains Mono, 11px, uppercase, slate-500). Grayscale logos with hover → color. Separated by thin vertical dividers.

### 6. Problem-Agitation Section
**Visual**: The atmosphere shifts — slightly warmer, with a subtle red/amber radial gradient in the background (danger zone feeling). The section has more negative space, letting the pain breathe.

**Layout**:
- Large headline "Kennen Sie diese Herausforderungen?" — split text animation, words reveal one by one
- Below: 3 pain point cards in a row (not glass — solid surface cards with a top red/amber accent line)
  - "Steigende Kosten" — with an upward trend icon
  - "Fachkräftemangel" — with a users-x icon
  - "Veraltete Prozesse" — with a clock icon
- Body paragraph below in slate-400, 18px, max-w-3xl centered

**Key detail**: The pain cards have a very subtle "pulse" shadow effect in amber, making them feel uncomfortable — this is intentional agitation.

### 7. 3-Step Solution Path
**Visual**: The atmosphere shifts to hopeful — blue/cyan gradients return. This section feels like ascending from the problem.

**Layout**:
- Headline centered: "In 3 Schritten zur Transformation"
- Horizontal timeline with three numbered steps connected by a gradient line (blue → cyan)
- Each step: numbered circle (gradient border, number inside in JetBrains Mono) → glass card below
- Cards contain: step title in Outfit 600, description in DM Sans, small relevant icon

**Timeline connector**: A gradient line runs horizontally between the three step circles. On scroll, the line "fills" from left to right (GSAP scroll-linked animation), activating each step sequentially.

**Mobile**: Vertical timeline, steps stacked, line runs vertically on the left.

### 8. Social Proof / Testimonials
**Visual**: Cleaner section, more breathing room. Two testimonial cards side by side.

**Layout**: Each card is a glass card with:
- Large quote mark icon (") in blue-500/0.2 opacity, oversized, positioned top-left
- Quote text in DM Sans italic, 18px, slate-200
- 5 star icons in amber
- Name in Outfit 600, slate-100
- Title + Company in DM Sans, slate-400

**Animation**: Cards slide in from left/right simultaneously.

### 9. Final CTA Section
**Visual**: The climax. Full-bleed section with intensified gradient background — the mesh gradient from the hero returns but stronger. A subtle radial glow emanates from behind the CTA button.

**Layout**:
- "Bereit für Ihr AI-Upgrade?" in Outfit 800, centered, large
- Subheadline in DM Sans, centered, slate-300
- Large CTA button: "Jetzt AI-Potenzialanalyse buchen!" with maximum glow effect
- Below button: "250€ · 90 Min. · 100% Zufriedenheitsgarantie" in JetBrains Mono, slate-500
- The button scrolls to the hero form (smooth scroll via Lenis)

### 10. Footer
**Visual**: Minimal. Surface background. Logo left, legal links right (Impressum, Datenschutz), copyright center. Single line on desktop. No footer bloat.

---

## Motion Strategy (GSAP fromTo — all animations)

### Page Load Sequence (first 2s)
1. `0.0s` — Urgency bar slides down from -40px
2. `0.2s` — Nav fades in from opacity 0
3. `0.4s` — Hero tag pill scales from 0.8 → 1 with opacity
4. `0.5s` — Headline words reveal left → right (stagger 0.04s per word)
5. `0.8s` — Subheadline fades up from y:20
6. `1.0s` — Benefit boxes stagger in (0.12s each)
7. `1.0s` — Form card slides in from x:40 with opacity
8. `1.4s` — Authority logos fade in
9. `1.6s` — Background particles begin drifting

### Scroll Animations
- **Every section headline**: Split text reveal, words appear in sequence
- **Cards/boxes**: Fade up from y:40, stagger 0.1-0.15s
- **Stat counters**: Count from 0 to target number over 1.5s
- **Timeline line**: Fill animation linked to scroll position
- **Testimonials**: Slide in from sides
- **Final CTA button**: Scale pulse (1 → 1.02 → 1) on a loop, subtle

### Micro-interactions
- **Magnetic cursor**: CTA buttons attract the cursor within 80px radius
- **Card hover**: Border brightens, 2px lift (translateY), glow intensifies
- **Button hover**: Gradient shifts 20deg, glow radius doubles
- **Form focus**: Input border transitions to blue-500 with glow
- **Form progress**: As fields are filled, the form card border glow subtly intensifies (0.08 → 0.15 opacity)

### prefers-reduced-motion
All scroll/entrance animations disabled. Hover effects remain but simplified. Counters show final number immediately. Particles hidden.

---

## Background Atmosphere System

### Layer 1: Base Color
`#06080F` — the page canvas

### Layer 2: Mesh Gradients (per section)
Each section has positioned radial gradients that create colored atmospheric zones:
- **Hero**: Blue top-center + cyan right + violet bottom-left
- **Problem**: Amber/red center, very subtle
- **Solution**: Blue bottom + cyan top-right
- **CTA**: Full blue-cyan mesh, intensified

### Layer 3: Grain Overlay
Fixed-position SVG noise texture at 3% opacity across the entire page. Adds organic warmth to the digital dark surface.

### Layer 4: Particles (Hero + CTA only)
Small dots (2-3px), very low opacity (0.15-0.3), drifting upward slowly. Canvas-based for performance. ~30 particles max. Pauses when tab not visible.

---

## Color Palette Refinement

Keeping the design system palette with one addition:

| New Addition | Hex | Usage |
|---|---|---|
| **Danger/Agitation** | `#EF4444` (red-500) | Problem section accents, pain card top borders |
| **Violet Accent** | `#8B5CF6` (violet-500) | Fourth benefit card, gradient accent |

---

## Responsive Behavior

### Mobile (< 768px)
- Urgency bar: text truncated, smaller font
- Nav: Logo + single CTA button (no hamburger needed)
- Hero: Single column — headline → subheadline → benefits (2x1 stacked pairs) → form below
- Form card: Full width, no slide-in animation (just fade up)
- Problem cards: Horizontal scroll or stacked
- Timeline: Vertical, line on left side
- Testimonials: Stacked, full width
- Final CTA: Reduced headline size, full-width button
- All word-break/hyphens rules for German text

### Tablet (768-1024px)
- Hero: 50/50 split, tighter spacing
- Benefits: 2x2 grid maintained
- Timeline: Horizontal maintained but cards narrower
- Testimonials: Side by side maintained

### Desktop (1024+)
- Hero: 55/45 split
- Full spatial composition as designed
- All animations active

---

## Technical Notes

- **Stack**: Vite + React + TypeScript + Tailwind CSS v4
- **GSAP**: fromTo() only, ScrollTrigger for scroll animations
- **Lenis**: Smooth scroll, handles anchor links
- **Lucide React**: All icons
- **No component libraries**: Everything custom
- **Images**: WebP only, lazy loaded
- **Font loading**: display=swap, preconnect to Google Fonts
- **Form submission**: POST to configurable endpoint (TBD)
- **Accessibility**: WCAG AA minimum, keyboard navigation, aria labels, focus rings
