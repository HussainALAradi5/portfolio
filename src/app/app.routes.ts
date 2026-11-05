import { Routes } from '@angular/router';
import { ROUTE_PATHS } from './constants/routes/route-paths.constants';
import { projectExistsGuard } from './middlewares/guards/projects/project-exists.guard';

export const routes: Routes = [
  {
    path: ROUTE_PATHS.home,
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home-page/home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: `${ROUTE_PATHS.projects}/:${ROUTE_PATHS.projectSlugParam}`,
    canActivate: [projectExistsGuard],
    loadComponent: () =>
      import('./pages/projects/project-detail-page/project-detail-page.component').then(
        (m) => m.ProjectDetailPageComponent,
      ),
  },
  {
    path: ROUTE_PATHS.notFound,
    loadComponent: () =>
      import('./pages/system/not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent),
  },
  { path: '**', redirectTo: ROUTE_PATHS.notFound },
];
