# Phase 06: Client screens

**Status:** Done
**Depends on:** Phases 03 and 05

## Goal
A home page that shows everything, pages for projects, experience and skills, and a detail page per project, all following the CV.

## Scope
| Layer | Folders | Items |
| --- | --- | --- |
| Home | `src/app/pages/home/`, `src/app/components/home/` | Hero (Download CV, GitHub, LinkedIn, Email, totals), then the projects, experience and skills sections |
| Section pages | `src/app/pages/projects/projects-page/`, `src/app/pages/experience/experience-page/`, `src/app/pages/skills/skills-page/` | Projects, experience or skills only, opened from the header |
| Projects | `src/app/components/projects/` | Projects section (filter tabs, lazy content, grid), card, cover, tech groups, repository list, gallery |
| Detail | `src/app/pages/projects/project-detail-page/` | Overview, highlights, stack, repositories, screenshots, previous and next |
| Experience | `src/app/components/experience/` | Horizontal timeline and the details card |
| Skills | `src/app/components/skills/` | Skill groups from the CV |
| Shared | `src/app/components/common/`, `src/app/components/layout/` | Section heading, CV download button, image lightbox, header, footer, command palette |
| System | `src/app/pages/system/` | 404 page |

## Tasks
- [x] Cards with cover thumbnail, status, stack badges and repository count
- [x] Detail page with gallery and private-repository labels
- [x] Light and dark themes; phone layout without horizontal scroll
- [x] Blue brand palette in `src/styles.css`, with a navy dark theme lit by soft blue glows and a dot grid behind the hero
- [x] Motion: staggered hero entrance, drifting hero glow, cards that fade up on scroll and lift on hover; all of it off under `prefers-reduced-motion`
- [x] Download CV: `components/common/cv-download-button/` and `services/site/cv-download/`; the button shows a spinner and stays disabled while the PDF in `public/files/cv/` is fetched, and falls back to opening the file if the fetch fails
- [x] Duck Street added as an early project (`constants/projects/data/duck-street.constants.ts`) with screenshots of the live game
- [x] Experience timeline (`components/experience/`, data in `constants/experience/`, periods in `utilities/experience/period/`): a horizontal line of stops, oldest first, showing the CV's dates; selecting a stop (click, arrow, Home or End keys) shows its card with the CV's lines, the length and skills; the current role is selected first and pulses; on phones the line scrolls inside its own box
- [x] Lengths count the months elapsed (Sep 2024 – Sep 2025 is 1 yr; Oct 2023 – Jan 2024 is 3 mos)
- [x] Header links open their own pages: `/projects`, `/experience` and `/skills` show one section each, `/` shows everything; the active link is highlighted and each page sets its tab title (project pages through `middlewares/resolvers/projects/project-title.resolver.ts`)
- [x] Skills (`components/skills/skills-section/`, data in `constants/skills/` copied from the CV): core strengths highlighted, then languages, frameworks, databases, tools and spoken languages; on `/skills` and on the home page
- [x] Every action appears once: the hero holds Download CV, GitHub, LinkedIn and Email; the header only navigates; a contact section, the header GitHub icon and the footer icons that repeated the hero were removed
- [x] Screenshot lightbox (`components/common/image-lightbox/`) on a native modal `<dialog>`: the gallery preview opens it full screen; arrows, side buttons or a swipe move between images; Escape, the close button or a click outside closes it; page scrolling is locked while open and the gallery follows the image on show
- [x] Command palette (`components/layout/command-palette/`, commands from `services/ui/command-palette/`, matching in `utilities/command-palette/`): Ctrl + K, Cmd + K or the header search button opens a search over pages, projects (with their technologies) and actions (Download CV, switch theme); arrows, Enter and Escape work, with combobox and listbox roles

## Acceptance criteria
- All eight projects open from the home page and from search.
- Experience and skills match the CV.
- No action appears twice on a page.
- Desktop and 375px widths work in light and dark themes.

## Verification
| Check | Command | Result |
| --- | --- | --- |
| Screens | Browser at desktop and 375px, light and dark | Passed on 2026-11-05 |
| Horizontal scroll at 375px | `scrollWidth <= innerWidth` in the browser | true on 2026-11-05 and after every change on 2026-11-06 |
| Blue theme and motion | Browser at desktop and 375px, light and dark | Passed on 2026-11-06 |
| Download CV busy state | Slowed `fetch` in the browser, clicked Download CV | Showed "Preparing…" and was disabled, then saved `Hussain Al Aradi - Software Engineer CV.pdf` on 2026-11-06 |
| Timeline matches the CV | Compared every title, date and line with the CV PDF | Match on 2026-11-06 (Safeway start corrected to Nov 2025); site PDF replaced with the current CV |
| Timeline lengths | Period utility specs | Sep–Sep 1 yr, Oct–Jan 3 mos, Feb 2017–Feb 2024 7 yrs, Nov 2025–now 1 yr on 2026-11-06 |
| Horizontal timeline | Headless Edge at 1280px light and dark; browser at 375px | Click and keys change the card; current role centred on load at 375px; no page scroll on 2026-11-06 |
| Section pages | Browser: home, Experience, Projects, a project, back, logo | Each shows only its section; active link and tab title correct on 2026-11-06 |
| Skills | Headless Edge at 1280px on `/skills`, light and dark | Six groups, core first; rows end evenly on 2026-11-06 |
| No duplicated actions | Counted CV buttons and email, LinkedIn, GitHub and Projects links on `/`, `/projects`, `/experience`, `/skills` | One of each on `/`; nothing repeated on any page on 2026-11-06 |
| Lightbox | Browser on `/projects/fun-travels-tour` | Opens on 1 / 4, → shows the next image, Escape closes and unlocks scrolling, thumbnail follows on 2026-11-06 |
| Command palette | Fresh browser tab: Ctrl + K, typed "spring", Enter; header at 375px | Found CareTrack and Fun Travels Tour, opened CareTrack and closed; header fits inside the margin on 2026-11-06 |
| Live site | Browser on the live URL after #24 | Every check above holds; no console errors on 2026-11-06 |
| Unit tests | `npm test -- --watch=false` | 68 passed, exit code 0 on 2026-11-06 |

## Risks and open questions
- Scroll-reveal on cards uses CSS scroll-driven animations; browsers without them (Firefox today) show the cards without the effect.
- CareTrack shows an icon cover until it has screenshots.
- The projects, experience and skills pages carry no CV or contact links; visitors reach them from the home page or search.
