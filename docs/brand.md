# AtlasAI Brand Guidelines

> Status: Applied to the web app. The logo, tagline, and palette described here are in
> production use in `apps/web`.

## Logo

The mark is a **tilted wireframe globe pierced by a navigation needle**: a bearing line
launches from the globe's centre toward the upper right, crosses the rim, and ends in an
arrowhead. It reads as "set a course and go" — planning plus motion — rather than a static
map.

### Design rationale

- **Globe + meridian + parallels**, tilted −14°: a globe is the honest, generic symbol for
  "the world"; the tilt breaks the static, encyclopedic feel of a straight-on globe and
  gives the flat wireframe a hint of depth.
- **The needle is the differentiator.** Globes alone are generic; the compass bearing and
  arrowhead carry the product's meaning (intelligent routing, a plan in motion). The needle
  uses the accent color so the eye lands there second, after the globe.
- **Deliberately avoided tropes** of existing travel brands, so the mark does not echo any
  of them: paper planes, location pins dropped on maps, circular swooshes/orbits,
  hot-air balloons, compass roses drawn literally, and globe-with-ring motifs. The needle
  is a straight bearing with a triangular arrowhead — a navigation convention, not any
  company's property.
- **Construction is pure geometry**: one circle, one ellipse, two chords, one line, one
  arrowhead. It survives being drawn at 16 px (favicon) and in single-color print.

### Anatomy

| Element         | Color role         | Notes                                  |
| --------------- | ------------------ | -------------------------------------- |
| Globe wireframe | Foreground/base    | Circle + one meridian + two parallels  |
| Needle + arrow  | Accent (`horizon`) | Crosses the rim; arrowhead is L-shaped |
| Centre dot      | Accent             | The origin of the bearing ("you")      |

### Variants and files

| File                                              | Use                                       |
| ------------------------------------------------- | ----------------------------------------- |
| `apps/web/src/assets/brand/logo-mark.svg`         | Mark, light-on-dark (brand navy surfaces) |
| `apps/web/src/assets/brand/logo-mark-dark.svg`    | Mark, dark-on-light                       |
| `apps/web/src/assets/brand/logo-mark-mono.svg`    | Mark, single color (`currentColor`)       |
| `apps/web/src/assets/brand/logo-lockup-dark.svg`  | Horizontal lockup + tagline on navy       |
| `apps/web/src/assets/brand/logo-lockup-light.svg` | Horizontal lockup + tagline on white      |
| `apps/web/public/favicon.svg`                     | Favicon: mark on a navy tile              |

In React, use the components instead of the static files:

```tsx
import { Logo, LogoLockup } from '@/components/brand';

<Logo size={32} />                          // mark only
<LogoLockup size={28} />                    // mark + wordmark
<LogoLockup size={40} withTagline />        // mark + wordmark + tagline
```

`Logo` and `LogoLockup` accept a `tone` of `auto` (semantic tokens — default),
`light`, `dark`, or `mono`. Prefer `auto`: it follows the active color scheme
automatically. The fixed tones exist for placements on guaranteed backgrounds.

### Usage rules

1. **Clear space**: keep at least the height of the centre dot (≈ 8% of the mark) free on
   all sides.
2. **Minimum size**: 16 px for the mark alone; below 20 px drop the parallels if they
   render muddy — the circle, meridian and needle carry the shape alone.
3. **Don't**: rotate the needle to a different angle, recolor the needle to anything but an
   `atlas-horizon` step, place the light-tone mark on light backgrounds (or vice versa),
   stretch or outline the mark, or add gradients/effects.
4. The wordmark is always `AtlasAI` in the display face (Montserrat semibold) — never
   "Atlas Ai", "atlasai", or "Atlas AI".

## Tagline

**Your World. Intelligently Explored.**

Capitalized as written: sentence-style capitalization on both clauses, ending with a
period. Use it in the footer lockup, marketing surfaces, and page metadata (`<meta
name="description">` in `index.html` already carries it). In running copy, prefer sentence
case paraphrases; the tagline itself is the only place the title-case form appears.

## Color

The palette is defined once, as Tailwind theme tokens in `apps/web/src/index.css`, and is
the single source for both the UI and the brand assets. Brand assets pin hex values
because SVG files cannot read CSS variables; when the palette changes there, these hex
values must be updated in the same change.

| Token               | Hex (dark-scheme value) | Role                                  |
| ------------------- | ----------------------- | ------------------------------------- |
| `atlas-ocean-900`   | `#0b1220`               | Brand navy — logo tile, footer        |
| `atlas-ocean-50`    | `#eef4fb`               | Globe strokes on navy                 |
| `atlas-ocean-300`   | `#86abd5`               | Muted text on navy (tagline)          |
| `atlas-horizon-300` | `#56d0c2`               | Needle on navy / dark scheme accent   |
| `atlas-horizon-600` | `#127d78`               | Needle on light / light scheme accent |
| `atlas-ocean-900`   | `#0b1220`               | Globe strokes on light                |

Semantic UI colors (`--atlas-bg`, `--atlas-text`, `--atlas-accent`, …) map onto this
palette and flip automatically between the dark (default) and light (`prefers-color-scheme`)
schemes — see the comments in `index.css`.

## Typography

- **Display/headings**: Montserrat (geometric sans), loaded as `--font-display` with a
  system fallback. Used for the wordmark, headings, and buttons.
- **Body**: the system UI stack (`--font-sans`) for zero-cost first paint.

No other families are approved. Weight discipline: 600 for the wordmark and headings,
400/500 for body.
