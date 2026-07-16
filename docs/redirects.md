# URL continuity and redirect map

Principle: keep the URL wherever the content survives in recognisable form; 301 everything else to its nearest meaningful equivalent. No indexed URL may 404. Trailing slashes always, matching the old site.

Audited against the live site's actual sitemap (`https://thelifedoulaschool.co.uk/sitemap-0.xml`, 35 URLs) on 2026-07-16. Every URL below is accounted for: 21 preserved, 14 redirected.

## Preserved as-is (21)

| URL                                                      | New role                                                                                                                        |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `/`                                                      | Homepage, new template                                                                                                          |
| `/blogs/`                                                | Blog index                                                                                                                      |
| `/faq/`                                                  | FAQ, content adapted to the teaching pivot                                                                                      |
| `/contact/`                                              | Contact, email only until details confirmed                                                                                     |
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

| Old URL                                       | Destination | Rationale                                         |
| --------------------------------------------- | ----------- | ------------------------------------------------- |
| `/about-my-life-doula/`                       | `/about/`   | About consolidated                                |
| `/my-story/`                                  | `/about/`   | My Story folded into About                        |
| `/pricing-my-life-doula/`                     | `/`         | No services, no pricing                           |
| `/book/`                                      | `/`         | No book page at launch (open question 2)          |
| `/birthing-the-new-you-releasing-the-old/`    | `/`         | Book page, as above                               |
| `/award-recognition-parent-baby-awards-2025/` | `/about/`   | Award page dropped (open question 3)              |
| `/a-message-from-your-guardian-angel/`        | `/`         | Book excerpt, depends on the book                 |
| `/full-book-contents/`                        | `/`         | Book chapter listing                              |
| `/how-to-use-this-book/`                      | `/`         | Book chapter                                      |
| `/how-to-use-this-umbrella/`                  | `/`         | Book chapter                                      |
| `/introduction-to-acceptance/`                | `/`         | Book chapter                                      |
| `/open-and-connect/`                          | `/`         | Book chapter                                      |
| `/pause-and-reflect/`                         | `/`         | Book chapter                                      |
| `/thank-you/`                                 | `/contact/` | Old form thank-you page; no forms on the new site |

If the book is confirmed (open question 2), revisit the seven book-related redirects: restore `/book/` as a page and consider republishing the chapter excerpts as posts at their old URLs.
