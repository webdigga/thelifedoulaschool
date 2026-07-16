# URL continuity and redirect map

Principle: keep the URL wherever the content survives in recognisable form; 301 everything else to its nearest meaningful equivalent. No indexed URL may 404. Trailing slashes always, matching the old site.

Audited against the live site's actual sitemap (`https://thelifedoulaschool.co.uk/sitemap-0.xml`, 35 URLs) on 2026-07-16. Every URL is accounted for: 21 preserved, 14 redirected.

Update 2026-07-16: the client confirmed the book (now titled _Birthing Joy ~ Releasing Pain_) and supplied current material, so `/book/` is a live page again and the seven book-related URLs now 301 to `/book/` instead of `/`. Later the same day the contact page was removed entirely (no contact details exist to publish), so `/contact/` and `/thank-you/` both 301 to `/`. The count is now 21 preserved, 14 redirected.

## Preserved as-is (21)

| URL                                                      | New role                                                                                                                        |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `/`                                                      | Homepage, new template                                                                                                          |
| `/book/`                                                 | Book page restored: Birthing Joy ~ Releasing Pain                                                                               |
| `/blogs/`                                                | Blog index                                                                                                                      |
| `/faq/`                                                  | FAQ, content adapted to the teaching pivot                                                                                      |
| `/privacy-policy/`                                       | Privacy policy, rewritten for the new analytics-free site                                                                       |
| `/welcome-to-my-blog/`                                   | Blog post, migrated                                                                                                             |
| `/how-to-reset-your-life-in-autumn/`                     | Blog post, migrated                                                                                                             |
| `/walk-away-from-unhappiness-this-christmas/`            | Blog post, migrated                                                                                                             |
| `/guardian-angels-for-beginners/`                        | Blog post, migrated (was book category on the old site, but stands alone as teaching content; judgement call, flagged to David) |
| `/the-dark-night-of-the-soul/`                           | Focus-area page adapted to blog post                                                                                            |
| `/healing-and-shadow-work/`                              | Focus-area page adapted to blog post                                                                                            |
| `/ending-karmic-cycles/`                                 | Focus-area page adapted to blog post                                                                                            |
| `/building-confidence-and-self-belief/`                  | Focus-area page adapted to blog post                                                                                            |
| `/uncovering-your-souls-purpose/`                        | Focus-area page adapted to blog post                                                                                            |
| `/connecting-to-your-guardian-angel/`                    | Focus-area page adapted to blog post                                                                                            |
| `/discovering-intuitive-gifts/`                          | Focus-area page adapted to blog post                                                                                            |
| `/harnessing-universal-energy-for-self-healing/`         | Focus-area page adapted to blog post                                                                                            |
| `/decluttering-and-organising-your-home/`                | Focus-area page adapted to blog post                                                                                            |
| `/creating-an-uplifting-home-environment-on-any-budget/` | Focus-area page adapted to blog post                                                                                            |
| `/setting-and-achieving-goals/`                          | Focus-area page adapted to blog post                                                                                            |
| `/non-medical-wellbeing-review/`                         | Focus-area page adapted to blog post                                                                                            |

## 301 redirects (14), implemented in `public/_redirects`

| Old URL                                       | Destination | Rationale                                                                                               |
| --------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------- |
| `/about-my-life-doula/`                       | `/about/`   | About consolidated                                                                                      |
| `/my-story/`                                  | `/about/`   | My Story folded into About                                                                              |
| `/pricing-my-life-doula/`                     | `/`         | No services, no pricing                                                                                 |
| `/birthing-the-new-you-releasing-the-old/`    | `/book/`    | Book page, as above                                                                                     |
| `/award-recognition-parent-baby-awards-2025/` | `/about/`   | Award page dropped (open question 3)                                                                    |
| `/a-message-from-your-guardian-angel/`        | `/book/`    | Book excerpt, depends on the book                                                                       |
| `/full-book-contents/`                        | `/book/`    | Book chapter listing                                                                                    |
| `/how-to-use-this-book/`                      | `/book/`    | Book chapter                                                                                            |
| `/how-to-use-this-umbrella/`                  | `/book/`    | Book chapter                                                                                            |
| `/introduction-to-acceptance/`                | `/book/`    | Book chapter                                                                                            |
| `/open-and-connect/`                          | `/book/`    | Book chapter                                                                                            |
| `/pause-and-reflect/`                         | `/book/`    | Book chapter                                                                                            |
| `/thank-you/`                                 | `/`         | Old form thank-you page; no forms on the new site                                                       |
| `/contact/`                                   | `/`         | Contact page removed 2026-07-16: with no contact details to publish it served no purpose (David's call) |

The chapter excerpts stay redirected to `/book/`; if David and Becca later want them republished as posts at their old URLs, remove those redirects and create the posts.
