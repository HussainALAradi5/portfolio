import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PAGE_NAMES } from '../../../constants/routes/page-titles.constants';
import { ROUTE_PATHS } from '../../../constants/routes/route-paths.constants';
import { ProjectService } from '../../../services/projects/project/project.service';
import { formatPageTitle } from '../../../utilities/routes/page-title/format-page-title.utility';

/** Browser-tab title for a project page, e.g. "Duck Street · Hussain Al Aradi". */
export const projectTitleResolver: ResolveFn<string> = (route) => {
  const slug = route.paramMap.get(ROUTE_PATHS.projectSlugParam) ?? '';
  return formatPageTitle(inject(ProjectService).findBySlug(slug)?.name ?? PAGE_NAMES.projects);
};
