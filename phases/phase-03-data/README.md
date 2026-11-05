# Phase 03: Data

**Status:** Done (static typed data, no database)
**Depends on:** Phase 02

## Goal
Describe every project as typed data that the screens read through one service.

## Scope
| Layer | Folders | Items |
| --- | --- | --- |
| Interfaces | `src/app/interfaces/projects/` | Project, ProjectRepository, ProjectScreenshot, ProjectTech, ProjectLink and view shapes |
| Data | `src/app/constants/projects/data/` | One file per project; `projects.constants.ts` sets the display order |
| Images | `public/images/projects/<slug>/` | Full WebP and `.thumb.webp` per screenshot, made by `npm run images:optimize` |
| Service | `src/app/services/projects/project/` | ProjectService: find all, by tier, by slug, neighbours |

## Tasks
- [x] One data file per project
- [x] Repository links built from the name; private repositories flagged with `isPrivate`
- [x] Screenshots converted to WebP with thumbnails

## Acceptance criteria
- Slugs are unique; every live project has a demo link.
- Images total under 2 MB.

## Verification
| Check | Command | Result |
| --- | --- | --- |
| Data rules | `project-stats.utility.spec.ts` | Passed on 2026-11-05 |
| Image size | `npm run images:optimize` | 10,004 KB to 1,792 KB on 2026-11-05 |

## Risks and open questions
- The data is static. Moving it to an API later only changes ProjectService.
