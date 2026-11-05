# Phase 05: Client foundation

**Status:** Done
**Depends on:** Phase 02

## Goal
App shell, routing, guards and theme handling.

## Scope
| Layer | Folders | Items |
| --- | --- | --- |
| Routes | `src/app/app.routes.ts` | Lazy home, project detail and not-found pages |
| Middlewares | `src/app/middlewares/guards/projects/` | `projectExistsGuard` sends unknown slugs to 404 |
| Services | `src/app/services/ui/` | ThemeService (stored or system theme), RouteProgressService |
| Layout | `src/app/components/layout/` | Header, footer, route progress bar |

## Tasks
- [x] Lazy-load every page
- [x] Bind the `:slug` route parameter as a component input
- [x] Apply the theme before Angular starts to avoid a flash
- [x] Show a progress bar for navigations slower than 150 ms

## Acceptance criteria
- Unknown project URLs show the 404 page.
- Theme choice survives a reload.

## Verification
| Check | Command | Result |
| --- | --- | --- |
| Guard and services | `npx ng test --watch=false` | Passed on 2026-11-05 |
| Deep link and 404 | Browser: `/projects/e-clinic`, `/projects/does-not-exist` | Detail page and 404 page on 2026-11-05 |

## Risks and open questions
- None.
