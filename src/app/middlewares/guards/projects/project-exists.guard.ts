import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ROUTE_PATHS } from '../../../constants/routes/route-paths.constants';
import { ProjectService } from '../../../services/projects/project/project.service';

/** Sends unknown project slugs to the not-found page. */
export const projectExistsGuard: CanActivateFn = (route) => {
  const slug = route.paramMap.get(ROUTE_PATHS.projectSlugParam) ?? '';
  return inject(ProjectService).hasProject(slug) || inject(Router).parseUrl(`/${ROUTE_PATHS.notFound}`);
};
