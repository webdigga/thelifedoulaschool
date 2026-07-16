# The Life Doula School

Bridging Heaven and Earth. Fully static Astro site for thelifedoulaschool.co.uk, deployed on Cloudflare Pages.

Read `CLAUDE.md` before working on this repo: it carries the standing rules and the open questions register. Supplementary docs live in `docs/`.

## Setup

```sh
# Node 24 (see .nvmrc)
npm ci
npm run dev
```

Husky hooks activate via the `prepare` script once the repo has been `git init`ed (run `npm run prepare` after the first clone if hooks are missing).

## Scripts

| Script                            | Purpose                                             |
| --------------------------------- | --------------------------------------------------- |
| `npm run dev`                     | Dev server                                          |
| `npm run build`                   | Static build to `dist/`                             |
| `npm run test:build`              | Build plus internal link check                      |
| `npm run format` / `format:check` | Prettier                                            |
| `npm run lint`                    | ESLint + Stylelint (token rule enforced)            |
| `npm run check`                   | astro check (types + content schemas)               |
| `npm run contrast:audit`          | WCAG AA audit of every token pairing in every theme |
| `npm run og:generate`             | Regenerate the default OG image from theme tokens   |

## Cloudflare Pages

Build command `npm run build`, output directory `dist`. Redirects and headers ship from `public/_redirects` and `public/_headers`. Preview deployments per branch are used to demo to the client.

## Themes

Swap one `@import` line in `src/styles/theme.css` between `dawn` (default), `dusk`, and `garden` to restyle the entire site. See `docs/design-plan.md`.
