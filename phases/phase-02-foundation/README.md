# Phase 02: Foundation

**Status:** Done
**Depends on:** Phase 01

## Goal
Shared building blocks every screen uses: UI kit, theme, constants, enums and utilities.

## Scope
| Layer | Folders | Items |
| --- | --- | --- |
| UI kit | `libs/ui/` | Spartan helm: button, card, badge, separator, tabs, tooltip, progress |
| Styles | `src/styles.css` | Tailwind CSS 4, Spartan zinc theme with light and dark tokens |
| Config | `src/app/config/site/` | Owner profile and social links |
| Constants | `src/app/constants/` | UI text, route paths, icons, theme keys, display limits |
| Enums and types | `src/app/enums/`, `src/app/types/` | Project tier, status, repository role, tech layer, theme mode, icon names |
| Utilities | `src/app/utilities/` | Filtering, grouping, neighbours, stats, repository links, thumbnails |

## Tasks
- [x] Install `@spartan-ng/brain` and generate helm components with `@spartan-ng/cli`
- [x] Generate the zinc theme into `src/styles.css`
- [x] Register icons once (`APP_ICONS`) and type icon names against them
- [x] One utility function per file, each with a spec

## Acceptance criteria
- Components contain no hardcoded text, numbers or URLs.
- Every utility has a unit test.

## Verification
| Check | Command | Result |
| --- | --- | --- |
| Build | `npx ng build` | Passed on 2026-11-05 |
| Unit tests | `npx ng test --watch=false` | 28 passed on 2026-11-05 |

## Risks and open questions
- None.
