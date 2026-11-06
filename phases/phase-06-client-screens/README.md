# Phase 06: Client screens

**Status:** Done
**Depends on:** Phases 03 and 05

## Goal
Home page with filterable project cards and a detail page per project.

## Scope
| Layer | Folders | Items |
| --- | --- | --- |
| Home | `src/app/pages/home/`, `src/app/components/home/` | Hero with totals, filter tabs (lazy content), project grid |
| Projects | `src/app/components/projects/` | Card, cover, tech groups, repository list, gallery |
| Detail | `src/app/pages/projects/` | Overview, highlights, stack, repositories, screenshots, previous and next |
| System | `src/app/pages/system/` | 404 page |

## Tasks
- [x] Cards with cover thumbnail, status, stack badges and repository count
- [x] Detail page with gallery and private-repository labels
- [x] Light and dark themes; phone layout without horizontal scroll
- [x] Blue brand palette in `src/styles.css`, with a navy dark theme lit by soft blue glows and a dot grid behind the hero
- [x] Motion: staggered hero entrance, drifting hero glow, cards that fade up on scroll and lift on hover; all of it off under `prefers-reduced-motion`

## Acceptance criteria
- All seven projects open from the home page.
- Desktop and 375px widths work in light and dark themes.

## Verification
| Check | Command | Result |
| --- | --- | --- |
| Screens | Browser at desktop and 375px, light and dark | Passed on 2026-11-05; screenshots in `docs/screenshots/` |
| Horizontal scroll at 375px | `scrollWidth > clientWidth` in the browser | false on 2026-11-05 |
| Console errors | Browser console | None on 2026-11-05 |
| Blue theme and motion | Browser at desktop and 375px, light and dark | Passed on 2026-11-06; screenshots in `docs/screenshots/` refreshed |
| Horizontal scroll at 375px after the theme change | `scrollWidth <= innerWidth` in the browser | true on 2026-11-06 |
| Console errors after the theme change | Browser console | None on 2026-11-06 |

## Risks and open questions
- Scroll-reveal on cards uses CSS scroll-driven animations; browsers without them (Firefox today) show the cards without the effect.
- CareTrack shows an icon cover until it has screenshots.
