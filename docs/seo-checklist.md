# SEO checklist for every page

Mirrors §8 of the project brief. Every new page or content entry must satisfy all of this before it ships.

## Head

- Unique `<title>`, pattern `Page Title | The Life Doula School`, 60 chars or fewer
- Unique meta description, 50 to 160 chars (content schemas enforce this; the build fails otherwise)
- Absolute canonical URL with trailing slash
- Complete `og:*` set (type, url, title, description, site_name, image + width/height/alt) and Twitter `summary_large_image`
- `lang="en-GB"` on `<html>` (handled by BaseLayout)

## Structured data

- WebSite + Person graph is site-wide (BaseLayout), connected by `@id`
- BlogPosting on every post: headline, description, author to Person `@id`, dates, image, mainEntityOfPage
- BreadcrumbList on all nested pages, matching the visible Breadcrumbs component
- FAQPage only where visible content genuinely matches
- VideoObject where videos are embedded with sufficient metadata

## Content

- Exactly one `<h1>`; heading levels never skip
- Visible byline (Rebecca Sarah, linking to `/about/`) and visible dates on posts, matching JSON-LD
- Descriptive link text; no bare "read more"
- Meaningful alt text; empty alt + `aria-hidden` only for decorative SVG
- Internal links: keys to related posts, beliefs to keys, prev/next, breadcrumbs

## Technical

- New URLs: lowercase, hyphenated, trailing slash
- Page removals require a 301 in `public/_redirects` plus `docs/redirects.md` update
- Raster images through `astro:assets` with explicit dimensions
- No new render-blocking or third-party scripts; YouTube only via the facade component
