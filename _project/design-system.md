# Automiq AI-Potenzialanalyse — Design System

## Brand Identity

**Automiq** — AI automation consultancy for DACH KMUs. Sells a 250€ AI-Potenzialanalyse that identifies automation opportunities in SMB workflows. The brand must balance **cutting-edge tech authority** with **German business trustworthiness**. Think: "We're the serious AI partner, not the hype machine."

## Visual Direction

**Dark mode** — appropriate for tech/AI niche. Inspired by premium SaaS dark interfaces (Darktech X reference). Deep navy backgrounds with aurora/mesh gradient accents. Glass-morphic cards. Subtle glow effects. The overall feel is **premium, intelligent, controlled** — not flashy cyberpunk.

---

## Color Palette

| Role | Hex | Tailwind | Usage |
|------|-----|----------|-------|
| **Background** | `#06080F` | `bg-[#06080F]` | Page base — near-black with blue undertone |
| **Surface** | `#0E1320` | `bg-[#0E1320]` | Cards, elevated panels, nav |
| **Surface Elevated** | `#151B2E` | `bg-[#151B2E]` | Hover states, active cards |
| **Primary** | `#3B82F6` | `blue-500` | Primary actions, links, highlights |
| **Primary Light** | `#60A5FA` | `blue-400` | Hover states, secondary emphasis |
| **Accent Cyan** | `#06B6D4` | `cyan-500` | Accent glow, gradient endpoint |
| **CTA** | `#10B981` → `#06B6D4` | emerald-500 → cyan-500 | CTA buttons (gradient) |
| **Urgency** | `#F59E0B` | `amber-500` | Top bar, scarcity elements |
| **Text Primary** | `#F1F5F9` | `slate-100` | Headlines, primary text |
| **Text Secondary** | `#94A3B8` | `slate-400` | Body text, descriptions |
| **Text Muted** | `#64748B` | `slate-500` | Labels, captions |
| **Border** | `#1E293B` | `slate-800` | Card borders, dividers |
| **Border Glass** | `rgba(255,255,255,0.08)` | — | Glass card borders |
| **Success** | `#22C55E` | `green-500` | Checkmarks, positive stats |

### Gradient System

```css
/* Hero background mesh gradient */
--gradient-hero: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59,130,246,0.15), transparent),
                 radial-gradient(ellipse 60% 40% at 80% 50%, rgba(6,182,212,0.1), transparent),
                 radial-gradient(ellipse 50% 30% at 20% 80%, rgba(139,92,246,0.08), transparent);

/* CTA button gradient */
--gradient-cta: linear-gradient(135deg, #3B82F6, #06B6D4);

/* Card glass effect */
--glass-bg: rgba(14,19,32,0.6);
--glass-border: rgba(255,255,255,0.08);
--glass-blur: 12px;

/* Urgency bar */
--gradient-urgency: linear-gradient(90deg, #F59E0B, #EF4444);
```

---

## Typography

### Font Pairing: Space Grotesk + Inter

| Role | Font | Weight | Size | Tracking |
|------|------|--------|------|----------|
| **Display** | Space Grotesk | 700 | clamp(48px, 6vw, 80px) | -0.03em |
| **H1** | Space Grotesk | 700 | clamp(36px, 4.5vw, 64px) | -0.02em |
| **H2** | Space Grotesk | 600 | clamp(28px, 3.5vw, 48px) | -0.02em |
| **H3** | Space Grotesk | 600 | clamp(22px, 2.5vw, 32px) | -0.01em |
| **Body Large** | Inter | 400 | clamp(18px, 1.2vw, 20px) | 0 |
| **Body** | Inter | 400 | 16px | 0 |
| **Body Small** | Inter | 400 | 14px | 0.01em |
| **Label** | Inter | 600 | 12px | 0.05em |
| **CTA Button** | Space Grotesk | 600 | 16px | 0.02em |

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
```

**Why Space Grotesk**: Geometric, modern, tech-forward — but still readable and serious. Not playful like Poppins, not generic like Plus Jakarta. Has personality without being distracting. Perfect for German business context where typography must feel precise.

**Why Inter**: Industry-standard body font. Excellent readability, handles German umlauts perfectly, designed for screens.

---

## Effects & Atmosphere

### Glass Cards
```css
.glass-card {
  background: rgba(14, 19, 32, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}
```

### Grain Overlay
```css
.grain::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* noise texture */
  opacity: 0.03;
  pointer-events: none;
  z-index: 9999;
}
```

### Glow Effects
- CTA buttons: `box-shadow: 0 0 30px rgba(59,130,246,0.3)`
- Hover amplify: `box-shadow: 0 0 50px rgba(59,130,246,0.5)`
- Stat numbers: `text-shadow: 0 0 20px rgba(6,182,212,0.5)`

### Motion (GSAP fromTo only)
- Scroll reveals: `opacity: 0, y: 40` → `opacity: 1, y: 0` (0.8s, power2.out)
- Stat counters: Animate numbers on scroll-enter
- Staggered card reveals: 0.15s stagger
- Benefit boxes: Scale from 0.95 → 1 with opacity
- Form: Slide in from right on desktop
- Urgency bar: Subtle pulse animation on the countdown/seats number

### Micro-interactions
- Magnetic cursor on CTA buttons
- Button hover: gradient shift + glow intensify
- Card hover: border brightens to rgba(255,255,255,0.15), subtle lift
- Form inputs: border glow on focus (blue-500)

---

## Component Patterns

### Top Urgency Bar
- Full-width, amber/orange gradient background
- Pulsing dot indicator
- "Nur noch X Plätze" with animated number
- Sticky at top, small height (~40px)

### Navigation
- Floating nav with glass effect
- Logo left, minimal links center (if any — it's a one-pager), CTA right
- Becomes opaque on scroll

### Hero Section (Split Layout)
- **Left (60%)**: Display headline, subheadline, 4 benefit boxes (2x2 grid)
- **Right (40%)**: Lead capture form in glass card
- Background: Mesh gradient with subtle aurora effect
- Authority logos below benefits

### Benefit Boxes
- Glass card style, icon + title + description
- Icons: Lucide icons (TrendingUp, Wallet, Clock, Shield)
- Subtle colored top-border accent per card (blue, cyan, emerald, violet)

### Problem-Agitation Section
- Dark section with slightly different bg shade
- Large headline with split-text reveal animation
- Body text with highlighted pain points

### 3-Step Solution Path
- Horizontal timeline with numbered steps
- Glass cards for each step
- Connected by a gradient line
- Step numbers in gradient circles

### Testimonials
- Glass cards with quote icon
- Star rating, name, title, company
- Subtle slide-in animation

### Final CTA Section
- Full-bleed gradient background (blue → cyan, subtle)
- Large headline + subheadline
- Centered CTA button with maximum glow
- Repeat of "Jetzt buchen" form or scroll-to-top-form

### Lead Capture Form
- Glass card container
- Clean input fields with dark bg, subtle border
- Focus state: blue glow border
- Dropdown selects styled consistently
- CTA button: Full gradient, prominent
- Privacy text below in muted color

---

## Spacing Scale

```
4px  — micro gaps (icon-text)
8px  — tight spacing (form labels)
16px — component internal padding
24px — between related elements
32px — section internal gaps
48px — between subsections
80px — between major sections (mobile: 48px)
120px — between hero and first section (mobile: 64px)
```

---

## Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Mobile | < 768px | Single column, form below hero, stacked benefits, vertical timeline |
| Tablet | 768-1024px | 2-col hero (50/50), 2x2 benefits |
| Desktop | 1024-1440px | Split hero (60/40), full timeline |
| Large | > 1440px | max-w-7xl container, centered |

---

## Anti-Patterns — DO NOT

- No colored left-border indicators on cards
- No emoji icons — use Lucide SVGs only
- No generic AI purple/pink gradients
- No gsap.from() with opacity: 0
- No pre-built component libraries
- No heavy 3D elements that slow the page
- No stock photography — use abstract graphics/gradients
- No cluttered sections — generous negative space
- No pure black (#000) backgrounds — always use dark navy tones
