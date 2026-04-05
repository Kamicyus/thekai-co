# DESIGN.md — The Kai Design System

> Design language reference for [thekai.co](https://thekai.co).
> AI-native creative studio. Dark, cinematic, minimal — with electric accents.

---

## 1. Visual Theme & Atmosphere

The Kai visual identity is built on **cinematic darkness** with **electric neon-green sparks**. The overall feel is a deep-space observatory — dark voids, subtle grid textures, orbiting planets, and pinwheel motifs that rotate slowly like mechanical clockwork.

**Keywords:** dark mode, editorial, understated luxury, sci-fi observatory, Apple-tier restraint.

The site never feels busy. Negative space is sacred. Color is used surgically — the spark green (#D8FB32) appears only where the eye should land. Everything else recedes into charcoal and gray gradients.

---

## 2. Color Palette

### Core Tokens (CSS Custom Properties)

```css
:root {
  --background:  #0A0A0A;   /* Primary background — near-black */
  --foreground:  #F5F5F5;   /* Primary text — warm white */
  --charcoal:    #1A1A1A;   /* Elevated surface */
  --spark:       #D8FB32;   /* Brand accent — electric lime */
  --spark-dark:  #B4F030;   /* Hover/pressed state of spark */
  --purple:      #5532FA;   /* Secondary accent — deep violet */
  --gray-600:    #666666;   /* Tertiary text, icons */
  --gray-400:    #999999;   /* Secondary text, placeholders */
  --gray-200:    #E0E0E0;   /* Rarely used, high-contrast text */
  --border:      #1F2937;   /* Default border color */
  --card-bg:     #141414;   /* Card/panel background */
}
```

### Semantic Usage

| Role | Value | Usage |
|------|-------|-------|
| Page background | `#0A0A0A` | Body, sections |
| Footer background | `#0F0F0F` | Slightly lighter than body |
| Hero gradient | `radial-gradient(ellipse at top, #020A1B 0%, #0A0A0A 70%)` | Deep navy into black |
| Card overlay | `from-[#0A0A0A]/30 via-[#0A0A0A]/70 to-[#0A0A0A]/95` | Text readability over images |
| Selection highlight | `rgba(216, 251, 50, 0.3)` | Text selection |
| Gradient text | `linear-gradient(135deg, #D8FB32 0%, #5532FA 100%)` | Special headings (spark to purple) |
| CTA glow | `rgba(216, 251, 50, 0.15)` | Button box-shadow |
| Hover border | `#D8FB32` at 20-30% opacity | Card/button hover states |
| Scrollbar thumb | `#333333` → `#555555` on hover | Custom thin scrollbar |

### Color Rules
- **Never** use pure white (`#FFFFFF`). Maximum brightness is `#F5F5F5`.
- **Never** use spark green for large surfaces. It is an accent — dots, icons, borders, CTAs only.
- Purple (`#5532FA`) is a gradient partner, never used standalone on backgrounds.
- Text on dark backgrounds: `#F5F5F5` (primary), `#999999` (secondary), `#666666` (tertiary/muted).

---

## 3. Typography

### Font Stack

| Token | Font Family | Role |
|-------|-------------|------|
| `--font-body` / `--font-dm-sans` | **DM Sans** | Body text, UI labels, nav links |
| `--font-sans` / `--font-inter` | **Inter** | Fallback sans, utility text |
| `--font-serif` / `--font-playfair` | **DM Serif Display** | Section headings, decorative text, italic accents |
| `--font-mono` / `--font-jetbrains-mono` | **JetBrains Mono** | Code blocks, technical content |

All fonts loaded via `next/font/google` with `display: "swap"` and `latin` + `latin-ext` subsets.

### Type Scale

| Element | Size | Weight | Font | Tracking |
|---------|------|--------|------|----------|
| Hero logo text | Responsive (100px → 230px height) | — | Custom PNG + pinwheel | — |
| Hero "The" prefix | 22px → 36px | 400 | Serif, italic | — |
| Section headings (h2) | `text-3xl` → `lg:text-[40px]` | 700 (bold) | Serif | `-0.02em` |
| Card titles (h3) | `text-base` → `lg:text-lg` | 600 (semibold) | Sans | `-0.3px` |
| Body / descriptions | `text-sm` → `text-base` | 400 | DM Sans | Normal |
| Subtitle / tagline | `text-sm` → `text-lg` | 400, italic | Serif | `0.05em` |
| Nav links | `text-sm` | 500 (medium) | Sans | Normal |
| Footer headings | `text-sm` | 600, uppercase | Sans | `wide` |
| Stat labels | `text-xs` | 400 | Sans | Normal |
| CTA buttons | `text-base` / `text-sm` | 600 | Sans | Normal |

### Typography Rules
- Section headings always use **serif** (`font-serif`).
- Body and UI always use **sans** (`font-body` / DM Sans).
- Italic serif is reserved for taglines, decorative whisper text, and the "The" prefix.
- `-webkit-font-smoothing: antialiased` is applied globally.

---

## 4. Component Styles

### Primary Button (CTA)

```
bg-[#D8FB32] text-[#0A0A0A]
font-semibold rounded-[10px]
px-8 py-3.5
hover:bg-[#B4F030] hover:scale-[1.02]
transition-all duration-200
shadow-[0_0_30px_rgba(216,251,50,0.15)]
```

- Always dark text on spark background.
- Subtle glow shadow. Scale-up on hover (1.02).
- Border radius: `10px` (consistent across all buttons).

### Secondary / Ghost Button

```
border border-[#1F2937] text-[#F5F5F5]
font-semibold rounded-[10px]
px-8 py-3.5
hover:border-[#D8FB32]/30 hover:bg-[#D8FB32]/5 hover:scale-[1.02]
transition-all duration-200
```

- Transparent with border. On hover: spark-tinted border + faint spark background fill.

### Service Card

```
border border-[#1F2937] rounded-[16px]
p-5 lg:p-6
hover:border-[#D8FB32]/20
hover:shadow-[0_0_40px_rgba(216,251,50,0.06)]
hover:scale-[1.01]
transition-all duration-300
overflow-hidden
```

- Background image with dark gradient overlay (`from-[#0A0A0A]/30 via-70% to-95%`).
- Icon container: `w-12 h-12 rounded-xl bg-[#0A0A0A]/60 backdrop-blur-sm border border-[#1F2937]/50`.
- On hover: icon bg becomes `bg-[#D8FB32]/10`, pinwheel spins in corner, arrow text fades in.
- Border radius: `16px` for cards (larger than buttons).

### Navbar

```
fixed top-0 z-50
h-20 (80px)
max-w-[1280px] mx-auto px-6 lg:px-8
```

- Transparent by default. On scroll: `bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-[#1F2937]/50`.
- Logo height: 44px.
- Nav link style: `text-sm font-medium text-[#999999] hover:text-[#F5F5F5]`.
- Mobile menu: fullscreen overlay `bg-[#0A0A0A]/98 backdrop-blur-xl`, staggered fade-in links.

### Scroll Indicator

```
w-6 h-10 rounded-full border-2 border-[#333333]
```

- Mouse-shaped container with a bouncing spark-colored dot inside.
- Dot: `w-1.5 h-1.5 bg-[#D8FB32] rounded-full`, animates `y: [0, 8, 0]`.

### Language Switcher

- Active locale: `text-[#D8FB32]`.
- Inactive: `text-[#666666] hover:text-[#999999]`.
- Separator: `text-[#333333]` pipe character.

---

## 5. Spacing & Layout

### Container

```
max-w-[1280px] mx-auto px-6 lg:px-8
```

- Global content width: **1280px**.
- Horizontal padding: `24px` (mobile) / `32px` (desktop).

### Section Spacing

| Section | Padding |
|---------|---------|
| Hero | `min-h-screen`, content vertically centered with `mt-28 sm:mt-24` |
| Standard sections | `py-24 lg:py-32` |
| Footer | `py-16 lg:py-20` |
| Footer bottom bar | `mt-16 pt-8` |

### Grid System

- Services: `grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4`
- Footer: `grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16`

### Internal Spacing Patterns

| Pattern | Value |
|---------|-------|
| Section title to content | `mb-16 lg:mb-20` |
| Heading to subtitle | `mb-4` |
| Card padding | `p-5 lg:p-6` |
| Icon to text | `mb-3` |
| Title to description | `mb-1.5` |
| CTA button gap | `gap-4` (flex) |
| Nav link gap | `gap-8` |
| Social icon gap | `gap-4` |
| List item spacing | `space-y-3` |

---

## 6. Shadow System

Shadows in The Kai are **glow-based**, not drop-shadow based. They use the spark color with very low opacity to create a subtle luminous halo.

| Usage | Shadow |
|-------|--------|
| Primary CTA button | `0 0 30px rgba(216,251,50,0.15)` |
| Card hover | `0 0 40px rgba(216,251,50,0.06)` |
| Pinwheel logo glow | `drop-shadow(0 0 12px rgba(216,251,50,0.4))` |
| Planet glow (Neptune) | `0 0 25px rgba(91,141,239,0.3)` |
| Planet glow (Jupiter) | `0 0 28px rgba(212,167,106,0.2)` |
| Scrollbar | None |
| Navbar (scrolled) | None (uses `backdrop-blur-xl` instead) |

### Shadow Rules
- No traditional `box-shadow` with offset. All shadows are centered glows (`0 0 Xpx`).
- Shadow color always matches the element's accent (spark for UI, planet color for planets).
- Shadow opacity is extremely low (0.06 to 0.25 range).

---

## 7. Animation & Motion

### Framework
**Framer Motion** (`framer-motion`) — all animations are client-side, wrapped in `"use client"` components.

### FadeIn Component

```tsx
<FadeIn direction="up" delay={0} duration={0.5}>
```

| Prop | Default | Options |
|------|---------|---------|
| `direction` | `"up"` | `"up"`, `"down"`, `"left"`, `"right"`, `"none"` |
| `delay` | `0` | seconds |
| `duration` | `0.5` | seconds |
| Easing | — | `[0.25, 0.1, 0.25, 1]` (custom cubic-bezier) |
| Trigger | — | `whileInView`, `viewport: { once: true, margin: "-50px" }` |
| Offset | — | 30px in the specified direction |

### StaggerChildren Component

```tsx
<StaggerChildren staggerDelay={0.08}>
  <StaggerItem>...</StaggerItem>
</StaggerChildren>
```

- Parent triggers children sequentially with configurable delay.
- Each child: `opacity: 0, y: 30` → `opacity: 1, y: 0` over 0.5s.
- Same custom easing as FadeIn: `[0.25, 0.1, 0.25, 1]`.
- Viewport trigger: `once: true, margin: "-50px"`.

### Hero Entrance Sequence

| Element | Delay | Duration |
|---------|-------|----------|
| Logo block | 0.35s | 0.6s |
| "The" prefix | 0.6s | 0.5s |
| Subtitle | 0.5s | 0.5s |
| Tagline | 0.7s | 0.5s |
| CTA buttons | 0.65s | 0.5s |
| Scroll indicator | 1.2s | 0.5s |

### Continuous Animations

| Animation | Duration | Easing |
|-----------|----------|--------|
| Pinwheel rotation | 60s | `linear`, infinite |
| Pinwheel reverse rotation | 60s | `linear`, infinite (reverse) |
| Logo pinwheel (i-dot) | 20s | `linear`, infinite |
| Grid background pulse | 8s | `ease-in-out`, infinite (opacity 0.03 ↔ 0.06) |
| Scroll indicator bounce | 1.5s | `easeInOut`, infinite, `y: [0, 8, 0]` |
| Hover pinwheel spin | 3s | `linear`, infinite |

### Planet Orbit System

Planets orbit the hero center point at different radii, speeds, and starting angles:

| Planet | Size | Orbit Radius | Duration | Opacity | Start Angle |
|--------|------|-------------|----------|---------|-------------|
| Neptune | 40px | 520px | 140s | 0.45 | 0deg |
| Saturn (+ ring) | 36px | 460px | 110s | 0.40 | 72deg |
| Jupiter | 48px | 400px | 90s | 0.40 | 200deg |
| Mars | 28px | 480px | 65s | 0.40 | 290deg |
| Green moon (Kai) | 20px | 360px | 50s | 0.20 | 145deg |

All planets: `repeat: Infinity, ease: "linear"`. Hidden on mobile (`hidden sm:block`).

### Transition Defaults

```
transition-colors duration-200    /* links, icons */
transition-all duration-200       /* buttons */
transition-all duration-300       /* cards */
transition-opacity duration-300   /* reveal elements */
transition-opacity duration-500   /* background images */
```

### Mobile Menu Animation
- Overlay: fade in/out, 0.2s.
- Links: staggered `y: 20` → `0`, delay = `i * 0.05 + 0.1`.
- Hamburger: morphs to X via rotation (`rotate: 45` / `-45`) with Framer Motion.

---

## 8. Brand Elements

### Pinwheel Motif

The **pinwheel** (cark) is the core brand symbol. It is a 5-petal SVG windmill shape rendered by the `DecorativePinwheel` component.

```tsx
<DecorativePinwheel
  size={100}      // px
  opacity={0.05}  // very subtle by default
  color="#D8FB32" // spark green
  rotate={0}      // static rotation offset in degrees
  animate={false} // enables continuous spin (60s)
  reverse={false} // counter-clockwise
  hoverSpin={false} // spins on parent group-hover
  hoverScale={false} // scales 1.25x on parent group-hover
/>
```

**Pinwheel placement rules:**
- Used as **background watermarks** at very low opacity (0.03 - 0.08).
- Placed in **section corners** as subtle decoration.
- Appears on the **logo i-dot**, rotating continuously.
- Spins in **card corners** on hover (small, 18px).
- Behind **social icons** on hover in footer.
- **Never** used as a foreground element or at full opacity.

### Logo System

- **Primary logo:** `kai-carkli.svg` — includes static pinwheel (used in navbar + footer).
- **Hero logo:** `kai-carksiz.png` — without pinwheel (custom animated pinwheel added via code on the i-dot).
- **Animated cark:** `cark.png` — standalone pinwheel image for the hero i-dot animation.
- Logo height: `44px` (navbar), `38px` (footer), `100px-230px` (hero, responsive).

### Planet System

Realistic CSS-painted planets orbit the hero section, creating an observatory / cosmos atmosphere. Each planet has:
- Radial gradient for 3D sphere lighting (highlight at 35% 30%).
- Atmospheric bands (Jupiter, Saturn).
- Special features (Saturn ring, Jupiter's Great Red Spot, Mars polar cap).
- Colored glow via `box-shadow`.
- One planet is spark-green colored ("Kai moon") — subtle brand tie-in.

---

## 9. Design Rules & Anti-patterns

### Do

- Use generous negative space between sections.
- Keep text hierarchy clean: serif headings, sans body.
- Use spark green sparingly — it should feel like a **flash**, not a **flood**.
- Animate on viewport entry (`whileInView`), trigger **once**.
- Keep hover states subtle: slight scale (1.01-1.02), border color shift, opacity reveals.
- Use `backdrop-blur` for overlays instead of solid backgrounds.
- Apply `overflow-hidden` on sections with decorative elements that extend beyond bounds.
- Use `pointer-events-none` on all decorative/background elements.

### Do Not

- **No pure white backgrounds.** Ever. The lightest surface is `#141414`.
- **No colored backgrounds** (no spark-green sections, no purple sections).
- **No drop shadows with offset.** Only centered glows.
- **No border-radius above 16px** on cards. Buttons use 10px.
- **No autoplay animations on scroll** (use `viewport: { once: true }`).
- **No opacity above 0.08** on decorative pinwheels (except hover reveals).
- **No heavy font weights (800/900)** — maximum is 700 (bold) for headings.
- **No underlined links.** Hover states use color change only.
- **No horizontal rules.** Use `border-t border-[#1F2937]` borders instead.
- **No icon-only buttons** without `aria-label`.

---

## 10. Responsive Behavior

### Breakpoints (Tailwind defaults)

| Prefix | Min Width |
|--------|-----------|
| `xs` | 475px (custom) |
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

### Key Responsive Patterns

| Element | Mobile | Desktop |
|---------|--------|---------|
| Navbar | Hamburger menu (fullscreen overlay) | Horizontal links + CTA |
| Hero logo | `h-[100px]` | `h-[200px]` → `xl:h-[230px]` |
| Hero pinwheel (bg) | 280px | 550px |
| Planet orbits | `hidden` | `sm:block` |
| Section padding | `py-24` | `lg:py-32` |
| Service grid | 1 column | 2 cols at xs, 4 cols at md |
| Footer grid | 1 column | 3 columns at md |
| CTA buttons | Stacked (`flex-col`) | Side-by-side (`sm:flex-row`) |
| Radial glow | 300px | `sm:600px` |
| Language switcher | Inside mobile menu | Inline in navbar |
| Decorative pinwheels (small) | Some hidden | All visible |

### Mobile-First Principles
- Content is always readable at 320px width.
- Decorative elements (planets, large pinwheels) are hidden on mobile to preserve performance.
- Touch targets are minimum 44px.
- Mobile menu locks body scroll (`overflow: hidden`) when open.
- Font sizes scale smoothly via Tailwind responsive prefixes, never via `clamp()`.

---

## Appendix: Custom CSS Animations

```css
/* Grid background pulse */
@keyframes gridPulse {
  0%, 100% { opacity: 0.03; }
  50% { opacity: 0.06; }
}

/* Pinwheel rotations */
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes spin-slow-reverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

/* Service card mockup scroll */
@keyframes scrollSite {
  0%, 8% { transform: translateY(0); }
  92%, 100% { transform: translateY(calc(-100% + 320px)); }
}
```

### Grid Background

```css
.grid-bg {
  background-image:
    linear-gradient(rgba(216, 251, 50, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(216, 251, 50, 0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  animation: gridPulse 8s ease-in-out infinite;
}
```

### Scrollbar

```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #0A0A0A; }
::-webkit-scrollbar-thumb { background: #333333; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #555555; }
```

---

*Last updated: 2026-04-02*
