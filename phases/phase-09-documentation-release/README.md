# Phase 09: Documentation and release

**Status:** Done
**Depends on:** Phase 08

## Goal
Document the project, deploy it, and keep it deploying on every push.

## Scope
| Item | Location |
| --- | --- |
| What the site shows, setup, layout, adding a project, updating the CV, deploy | `README.md` |
| Screenshots of the portfolio | `docs/screenshots/`, captured by `scripts/screenshots/capture-screenshots.mjs` |
| Link preview card and meta tags | `scripts/og/`, `public/og-image.png`, `src/index.html` |
| Icons | `public/favicon.svg`, `favicon.ico` (built by `scripts/icons/build-favicon-ico.mjs`), `favicon-32.png`, `apple-touch-icon.png` |
| Phases | `phases/` |
| Deploy | `.github/workflows/deploy.yml` (GitHub Pages), `render.yaml` (alternative) |

## Tasks
- [x] GitHub Pages workflow: install, test, build with the repository base path, 404 fallback, deploy
- [x] Pages source set to GitHub Actions
- [x] README screenshots in light, dark and mobile
- [x] README rewritten for the current site (pages, search, lightbox, experience, skills, CV, previews) with eight screenshots, including the timeline, skills, search and lightbox
- [x] Screenshot script: drives headless Edge over the DevTools protocol to emulate a 375px phone, pick the colour scheme and open the palette or lightbox before capturing
- [x] Merge the open pull requests so the live site updates
- [x] Link previews: Open Graph and Twitter card tags with a 1200x630 card rendered from `scripts/og/og-image.html`; browser theme colour and icons moved to the blue palette

## Acceptance criteria
- https://hussainalaradi5.github.io/portfolio/ serves the latest `master`.
- A failing test stops the deploy.

## Verification
| Check | Command | Result |
| --- | --- | --- |
| First deploy | Actions run 42051985459, attempt 2 | Succeeded on 2026-11-05 |
| Live home page | Browser on the live URL | 7 projects, no broken images on 2026-11-05 |
| Live deep link | Browser on `/portfolio/projects/e-clinic` | Detail page loads on 2026-11-05 |
| Failing test stops the deploy | Run 42200678234 (#14) | Deploy stopped on 2026-11-06; fixed in #15 |
| Console errors | Fresh browser tab on the dev server | `/favicon.ico` 404 fixed; no errors on 2026-11-06 |
| Preview tags in the build | `dist/portfolio/browser/index.html`, `og-image.png` | Present on 2026-11-06 |
| README screenshots | `node scripts/screenshots/capture-screenshots.mjs` against the dev server | Eight screenshots written and checked on 2026-11-06 |

## Risks and open questions
- The site lives under `/portfolio/`. Renaming the repository to `HussainALAradi5.github.io` would give a root address; the workflow already uses the repository name for the base path.
