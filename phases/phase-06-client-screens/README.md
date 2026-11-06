# Phase 06: Client screens

**Status:** Done
**Depends on:** Phases 03 and 05

## Goal
Home page with filterable project cards and a detail page per project.

## Scope
| Layer | Folders | Items |
| --- | --- | --- |
| Home | `src/app/pages/home/`, `src/app/components/home/` | Hero with totals, then the projects and experience sections |
| Section pages | `src/app/pages/projects/projects-page/`, `src/app/pages/experience/experience-page/` | Projects only and experience only, opened from the header |
| Contact section | `npm test`; headless Edge at 1280px light and dark | Renders on all three pages; copy confirmation and reset covered; 54 tests passed on 2026-11-06 |
| Experience | `src/app/components/experience/` | Timeline section and entry card |
| Projects | `src/app/components/projects/` | Projects section (filter tabs, lazy content, grid), card, cover, tech groups, repository list, gallery |
| Detail | `src/app/pages/projects/` | Overview, highlights, stack, repositories, screenshots, previous and next |
| System | `src/app/pages/system/` | 404 page |

## Tasks
- [x] Cards with cover thumbnail, status, stack badges and repository count
- [x] Detail page with gallery and private-repository labels
- [x] Light and dark themes; phone layout without horizontal scroll
- [x] Blue brand palette in `src/styles.css`, with a navy dark theme lit by soft blue glows and a dot grid behind the hero
- [x] Motion: staggered hero entrance, drifting hero glow, cards that fade up on scroll and lift on hover; all of it off under `prefers-reduced-motion`
- [x] Download CV: `components/common/cv-download-button/` (the hero's main action) and `services/site/cv-download/`; the button shows a spinner and stays disabled while the PDF in `public/files/cv/` is fetched, and falls back to opening the file if the fetch fails
- [x] Duck Street added as an early project (`constants/projects/data/duck-street.constants.ts`) with screenshots of the live game
- [x] Experience timeline (`components/experience/`, data in `constants/experience/`, periods in `utilities/experience/period/`): a horizontal line of stops, oldest first; selecting a stop (click, arrow, Home or End keys) shows its card with the CV's lines, dates, length and skills; the current role is selected first and pulses; on phones the line scrolls inside its own box
- [x] One job per area: the header only navigates (Projects, Experience, GitHub, theme) and the hero holds the actions (Download CV, GitHub, LinkedIn, Email), so no button appears twice
- [x] Header links open their own pages: `/projects` shows only projects, `/experience` only the timeline, `/` everything; the active link is highlighted and each page sets its tab title (project pages through `middlewares/resolvers/projects/project-title.resolver.ts`)
- [x] Contact section (`components/common/contact-section/`) at the bottom of the home, projects and experience pages: Email me, LinkedIn, Download CV (not on home, where the hero has it) and a copy-email button through `services/ui/clipboard/`

## Acceptance criteria
- All eight projects open from the home page.
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
| Download CV busy state | Slowed `fetch` in the browser, clicked Download CV | Both buttons showed "Preparing…" and were disabled, then saved `Hussain Al Aradi - Software Engineer CV.pdf` on 2026-11-06 |
| CV service rules | `npm test -- --watch=false` | Busy state, double-click guard and fallback covered; 32 tests passed on 2026-11-06 |
| Experience timeline | Browser at 1280px light and dark, 500px dark; `npm test` | Renders 5 entries, no horizontal scroll at 375px, no console errors; 40 tests passed on 2026-11-06 |
| Header and hero without duplicates | `npm test`; browser at 1280px and 375px | Header shows Projects, Experience, GitHub, theme and fits at 375px; hero shows Download CV first; 42 tests passed on 2026-11-06 |
| Timeline matches the CV | Compared every title, date and line with the CV PDF; `npm test` | Match on 2026-11-06 (Safeway start corrected to Nov 2025); site PDF replaced with the current CV |
| Horizontal timeline | `npm test`; headless Edge at 1280px light and dark; browser at 375px | Click and keys change the card; current role centred on load at 375px; no page scroll; 45 tests passed on 2026-11-06 |
| Section pages | Browser: home, Experience, Projects, a project, back, logo | Each shows only its section, active link and tab title correct; 48 tests passed with exit code 0 on 2026-11-06 |

## Risks and open questions
- Scroll-reveal on cards uses CSS scroll-driven animations; browsers without them (Firefox today) show the cards without the effect.
- CareTrack shows an icon cover until it has screenshots.
