# Phase 01: Discovery and research

**Status:** Done
**Depends on:** —

## Goal
Decide which projects the portfolio shows and collect accurate facts, links and screenshots for each.

## Scope
| Source | Items |
| --- | --- |
| Local workspace `D:\IT\Projects` | READMEs, manifests (`package.json`, `pom.xml`, `requirements.txt`, `composer.json`, `pubspec.yaml`) and git remotes of CareTrack, e-Clinic, Fun Travels Tour, Books Build Minds and TaskFlow |
| GitHub | READMEs and screenshots of Fantasy Cards and Videos Waves; public or private status of every linked repository |
| Live hosts | Demo URLs for e-Clinic, TaskFlow and Fantasy Cards |

## Tasks
- [x] List the seven projects in the order the owner chose
- [x] Record each project's stack and versions from its manifests
- [x] Check which repositories are public (private ones get no link)
- [x] Check which live demos respond
- [x] Pick screenshots for each project (CareTrack has none published)

## Acceptance criteria
- Every fact on the site can be traced to a README, manifest or live URL.
- No link points to a private repository.

## Verification
| Check | Command | Result |
| --- | --- | --- |
| Public repositories | `curl https://api.github.com/users/HussainALAradi5/repos` and the signed-in repository list | 5 repositories private, the rest public, on 2026-11-05 |
| Live demos | `curl -w "%{http_code}"` on each demo URL | e-Clinic, TaskFlow, Fantasy Cards: 200 on 2026-11-05 |
| CareTrack demo | Render dashboard and `curl` on the `render.yaml` example hosts | Not deployed on 2026-11-06 |
| Fun Travels Tour demo | `curl` on the Vercel web app and the Render API catalog | Both 200 on 2026-11-06 |

## Risks and open questions
- CareTrack has a Render Blueprint but no deployment. When it is deployed, add its link and set its status to Live.
