import { Routes } from '@angular/router';
import { PAGE_NAMES } from './constants/routes/page-titles.constants';
import { ROUTE_PATHS } from './constants/routes/route-paths.constants';
import { projectExistsGuard } from './middlewares/guards/projects/project-exists.guard';
import { projectTitleResolver } from './middlewares/resolvers/projects/project-title.resolver';
import { formatPageTitle } from './utilities/routes/page-title/format-page-title.utility';

export const routes: Routes = [
  {
    path: ROUTE_PATHS.home,
    pathMatch: 'full',
    title: formatPageTitle(PAGE_NAMES.home),
    loadComponent: () => import('./pages/home/home-page/home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: ROUTE_PATHS.projects,
    pathMatch: 'full',
    title: formatPageTitle(PAGE_NAMES.projects),
    loadComponent: () =>
      import('./pages/projects/projects-page/projects-page.component').then((m) => m.ProjectsPageComponent),
  },
  {
    path: `${ROUTE_PATHS.projects}/:${ROUTE_PATHS.projectSlugParam}`,
    canActivate: [projectExistsGuard],
    title: projectTitleResolver,
    loadComponent: () =>
      import('./pages/projects/project-detail-page/project-detail-page.component').then(
        (m) => m.ProjectDetailPageComponent,
      ),
  },
  {
    path: ROUTE_PATHS.experience,
    title: formatPageTitle(PAGE_NAMES.experience),
    loadComponent: () =>
      import('./pages/experience/experience-page/experience-page.component').then((m) => m.ExperiencePageComponent),
  },
  {
    path: ROUTE_PATHS.notFound,
    title: formatPageTitle(PAGE_NAMES.notFound),
    loadComponent: () =>
      import('./pages/system/not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent),
  },
  { path: '**', redirectTo: ROUTE_PATHS.notFound },
];
