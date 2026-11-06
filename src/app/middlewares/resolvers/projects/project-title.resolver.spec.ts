import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, convertToParamMap } from '@angular/router';
import { PAGE_NAMES } from '../../../constants/routes/page-titles.constants';
import { PROJECTS } from '../../../constants/projects/projects.constants';
import { ROUTE_PATHS } from '../../../constants/routes/route-paths.constants';
import { formatPageTitle } from '../../../utilities/routes/page-title/format-page-title.utility';
import { projectTitleResolver } from './project-title.resolver';

describe('projectTitleResolver', () => {
  const resolve = (slug: string) =>
    TestBed.runInInjectionContext(() =>
      projectTitleResolver(
        { paramMap: convertToParamMap({ [ROUTE_PATHS.projectSlugParam]: slug }) } as ActivatedRouteSnapshot,
        {} as RouterStateSnapshot,
      ),
    );

  it('names the tab after the project', () => {
    const [project] = PROJECTS;
    expect(resolve(project.slug)).toBe(formatPageTitle(project.name));
  });

  it('falls back to the projects title for an unknown slug', () => {
    expect(resolve('missing')).toBe(formatPageTitle(PAGE_NAMES.projects));
  });
});
