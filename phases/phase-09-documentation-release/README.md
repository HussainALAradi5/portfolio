# Phase 09: Documentation and release

**Status:** In review (pull requests open)
**Depends on:** Phase 08

## Goal
Document the project, deploy it, and keep it deploying on every push.

## Scope
| Item | Location |
| --- | --- |
| Setup, layout, adding a project, deploy | `README.md` |
| Screenshots of the portfolio | `docs/screenshots/` |
| Phases | `phases/` |
| Deploy | `.github/workflows/deploy.yml` (GitHub Pages), `render.yaml` (alternative) |

## Tasks
- [x] GitHub Pages workflow: install, test, build with the repository base path, 404 fallback, deploy
- [x] Pages source set to GitHub Actions
- [x] README screenshots in light, dark and mobile
- [ ] Merge the open pull requests so the live site updates

## Acceptance criteria
- https://hussainalaradi5.github.io/portfolio/ serves the latest `master`.
- A failing test stops the deploy.

## Verification
| Check | Command | Result |
| --- | --- | --- |
| First deploy | Actions run 42051985459, attempt 2 | Succeeded on 2026-11-05 |
| Live home page | Browser on the live URL | 7 projects, no broken images on 2026-11-05 |
| Live deep link | Browser on `/portfolio/projects/e-clinic` | Detail page loads on 2026-11-05 |

## Risks and open questions
- The site lives under `/portfolio/`. Renaming the repository to `HussainALAradi5.github.io` would give a root address; the workflow already uses the repository name for the base path.
