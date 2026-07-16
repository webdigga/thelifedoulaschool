# Design plan: The Life Doula School

Written before build, per the brief's anti-default calibration process. Self-critique follows the plan; the build follows the revised plan exactly.

## Concept: The Threshold Hour

The site's native vocabulary is bridges, light, gardens, journeys, thresholds. The unifying image is the threshold hour: standing on a bridge at first light, where sky (heaven) and land (earth) meet at the horizon and the light belongs to both. Every design decision derives from it: a palette of night indigo meeting warm linen through a narrow band of gold light; a single arc motif; type that feels calm, lapidary, and human.

## Palette (theme: dawn, default)

Semantic tokens only at the consumption layer. Raw values live only in theme files.

| Token                    | Hex       | Role                                                 |
| ------------------------ | --------- | ---------------------------------------------------- |
| `--color-surface`        | `#f6f3ec` | Warm linen page ground                               |
| `--color-surface-alt`    | `#ece7da` | Alternating section bands, cards                     |
| `--color-ink`            | `#262b38` | Body text, a soft near-black with a night cast       |
| `--color-ink-muted`      | `#555b6e` | Secondary text, captions, dates                      |
| `--color-brand`          | `#3a4a6b` | Dusk indigo: headings, links, buttons, footer ground |
| `--color-brand-contrast` | `#f6f3ec` | Text on brand                                        |
| `--color-accent`         | `#8a6a24` | Dawn gold: small emphasis, markers, active states    |
| `--color-glow`           | `#c9a44f` | Decorative only (motif strokes, never text)          |
| `--color-line`           | `#d9d2c0` | Hairline borders                                     |

Alternative complete themes shipped for demos: `dusk` (night indigo ground, linen ink, brighter gold) and `garden` (green-white ground, moss brand, wisteria accent). Selected by one `@import` line in `src/styles/theme.css`.

## Type roles

- **Display: Marcellus (400).** Calm, lapidary, arc-like letterforms. Used for h1/h2, key names, the wordmark, and diagram numerals. Always sentence case, never all caps, to keep it human rather than monumental.
- **Body: Source Serif 4 (variable).** Warm, sturdy, highly readable at length. Used for prose, navigation, UI, captions. Small labels use tracked small size of the body face, used sparingly.
- Fluid minor-third scale via `clamp()`, generous line heights (1.65 prose), reading measure capped at 68ch.

## Layout concept

Quiet, disciplined, typography-led. Full-bleed hero with the motif; then alternating surface and surface-alt bands with a single centred content column. Cards use soft radii and hairline token borders, no heavy shadows. The footer is a deep indigo band, the one place the dusk side of the palette lives on every page, closing each page at "earth at night". Motion: one considered hero fade-and-rise on load and subtle hover states only, all disabled under `prefers-reduced-motion`.

## Signature element

Version three, after two rejected graphic treatments: there is no drawn motif. The hero is a pure-typography panel on the brand colour with a sparse hand-placed star field of small gold dots (`Hero.astro`), and sections use a small centred gold rule (`SectionDivider.astro`). Both are deliberately unbreakable: plain CSS and dot-only SVG using currentColor, nothing that can degrade to black strokes.

## Self-critique against the banned defaults

1. **Cream + high-contrast serif + terracotta.** The linen ground risks reading "cream default". Revisions: the display face is a single-weight lapidary serif, not a Didone; the accent is deep gold used only in small doses, never terracotta; the identity carrier is the indigo, which also grounds the footer of every page. Links are indigo, not gold, to avoid the boutique-hotel look.
2. **Near-black + acid accent.** Not present; ink is a softened night tone.
3. **Hairline broadsheet.** Body is a sturdy 400-weight serif at a generous size; separation comes from space and the arc divider, not hairline rules everywhere; the only hairlines are card borders in a warm tone.
4. **Marcellus risks reading Roman-inscriptional (too classical or churchy).** Mitigations: sentence case everywhere, no added letter-spacing on headings, asymmetric modern spacing, and pairing with a contemporary variable body face. No other classical cues anywhere (no columns, no ornaments, no centred small caps).
5. **Serif plus serif risks monotony.** Hierarchy is carried by scale, colour (ink vs brand vs muted), and space, and was checked at every heading level.

## Print

Key pages are teaching handouts: print stylesheet hides chrome, sets black-on-white with the same type hierarchy, shows link URLs, and renders the key diagram crisply on one or two pages.
