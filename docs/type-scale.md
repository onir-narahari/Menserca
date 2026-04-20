# MENSERCA — type scale & section intro (implementation spec)

This document locks the **CSS variable mapping** used in `css/tokens.css`. It mirrors the design specification: one H1 per page, H2 for every major band, H3 for cards and clusters.

## Scale roles

| Token / element | CSS variable | Usage |
|-----------------|--------------|--------|
| H1 | `--fs-h1` + `--lh-tight` + `--letter-spacing-h1` | Hero headline, capability page title |
| H2 | `--fs-h2` + `--lh-heading` | Section titles (homepage bands, interior sections) |
| H3 | `--fs-h3` + `--lh-heading` | Card titles, accordion cluster titles, metric labels |
| Lead / intro | `--fs-lead` + `--lh-body` | One line under H2 (≤ ~200 chars in design) |
| Body | `--fs-body` + `--lh-body` | Paragraphs, bullets |
| Caption / eyebrow | `--fs-caption` + uppercase optional | Eyebrows, card meta, KPI qualifiers |

## Relative ratios (design intent)

- **H2** visually ~62–70% of **H1** — achieved via `clamp()` ranges above.
- **H3** ~85–92% of **H2** — card grid alignment uses single H3 step.

## Paragraph measure

- Prose max width: **`min(100%, var(--measure-prose))`** ≈ 65–72 characters.
- Hero subhead: same well, max **90%** of content well where needed.

## Section intro pattern (every H2 band)

1. Optional **eyebrow** (caption, steel color, tracking).
2. **H2** — title only.
3. **One supporting line** — `.section-intro` uses lead size; keep to one or two short lines in content.
4. **Spacing** — `--space-intro-to-content` (24–40px) before cards/grids.

Implemented in HTML as:

```html
<header class="section-head">
  <p class="eyebrow">…</p>
  <h2>…</h2>
  <p class="section-intro">…</p>
</header>
```

## Text over imagery

- Homepage hero uses **`.hero__media` + `.hero__overlay`** — full-bleed placeholder; headline and CTAs sit directly on the darkened image (no boxed dock). Buttons use accent; body lines stay light-on-dark for contrast.
