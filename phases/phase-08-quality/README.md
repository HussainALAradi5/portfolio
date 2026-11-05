# Phase 08: Quality

**Status:** In review (pull requests open)
**Depends on:** Phase 06

## Goal
Fix the findings of the clean-code-standards review and measure the performance changes.

## Scope
| Finding | Change | Branch |
| --- | --- | --- |
| Heavy cover images (2.8 MB on the home page) | WebP with 640px thumbnails | `fix/review-findings` |
| All tabs rendered at once (14 cards for 7 shown) | Lazy tab content | `fix/review-findings` |
| Hardcoded numbers, unnamed shapes, string icon names, enum cast, two sources for "live", status colours in templates, repeated repository URLs | Constants, interfaces, typed icons, tier on filter options, status map, `repositoryUrl` utility | `fix/review-findings` |
| Several functions in one utility file; services without entity folders | One function per file; `services/<group>/<entity>/` | `fix/review-findings` |
| Missing tests | Specs for ProjectService, ThemeService, projectExistsGuard | `fix/review-findings` |
| CareTrack cover text unreadable in dark mode | White text on the gradient | `fix/review-findings` |
| Few security headers on Render | `X-Frame-Options`, `Referrer-Policy` | `fix/review-findings` |

## Acceptance criteria
- Every finding fixed or listed with a reason.
- Build and tests pass.

## Verification
| Item | Location | Before | After |
| --- | --- | --- | --- |
| Home page images | `/` after scrolling | 2,791 KB | 46 KB |
| Cards in the page on load | `/` | 14 | 7 |
| All screenshots | `public/images/projects/` | 10,004 KB | 1,792 KB |
| Unit tests | `npx ng test --watch=false` | 8 passed | 28 passed |

## Risks and open questions
- GitHub Pages can't set response headers; the headers apply only when hosted on Render.
