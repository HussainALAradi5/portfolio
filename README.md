# Portfolio

Personal portfolio of Hussain Al Aradi, built with **Angular 21**, **Spartan UI** (helm components on `@spartan-ng/brain`) and **Tailwind CSS 4**. It presents seven projects with screenshots, tech stack, repositories and live demo links, in light and dark themes.

| Project | Stack |
| --- | --- |
| CareTrack | Spring Boot 4, Angular 21, Flutter, PostgreSQL, Keycloak |
| e-Clinic | Laravel 12, Angular 21, Flutter, PostgreSQL, Redis |
| Fun Travels Tour | Spring Boot 3.5, Next.js 16, Expo, PostgreSQL |
| Books Build Minds | Flask, Next.js 16, Flutter, PostgreSQL |
| TaskFlow | Express 5, Angular 21, MongoDB |
| Fantasy Cards | React |
| Videos Waves | React, Chakra UI, Node.js, MongoDB |

## Run locally

```bash
npm ci
npm start          # http://localhost:4200
npm test -- --watch=false
npm run build      # output: dist/portfolio/browser
```

## Layout (layer-first)

```text
src/app/
├── config/site/            owner profile and social links
├── constants/
│   ├── common/             UI text
│   ├── projects/           project data (one file per project in data/), labels, filters
│   ├── routes/             route paths
│   └── ui/                 icons, theme keys
├── enums/                  projects (tier, status, repository role, tech layer), ui (theme)
├── interfaces/             projects, site (one per file)
├── services/               projects (ProjectService), ui (ThemeService)
├── middlewares/guards/     projects (unknown slugs go to 404)
├── utilities/projects/     filtering, grouping, counts (+ spec)
├── components/             layout, common, home, projects
└── pages/                  home, projects (detail), system (404)
libs/ui/                    Spartan helm components (button, card, badge, separator, tabs, tooltip)
public/images/projects/     screenshots per project
```

### Add or change a project

1. Add screenshots under `public/images/projects/<slug>/`.
2. Create `src/app/constants/projects/data/<slug>.constants.ts` following an existing file.
3. Add it to `PROJECTS` in `src/app/constants/projects/projects.constants.ts` (array order is display order).
4. If it uses a new Lucide icon, register it in `src/app/constants/ui/icons.constants.ts`.

Repositories without a `url` are shown as private.

## Deploy

### GitHub Pages (live site)

Live at **https://hussainalaradi5.github.io/portfolio/**.

`.github/workflows/deploy.yml` runs on every push to `master` (or by hand from the Actions tab): it installs, runs the unit tests, builds with `--base-href /portfolio/`, copies `index.html` to `404.html` so deep links load the app, and deploys to Pages. A failing test stops the deploy.

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

### Render (alternative)

`render.yaml` describes a Render static site at the domain root: it runs `npm ci && npm run build`, serves `dist/portfolio/browser`, and rewrites every path to `index.html`. In the Render dashboard choose **New → Blueprint** and connect this repository; each push to `master` redeploys.
