import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, convertToParamMap, provideRouter } from '@angular/router';
import { PROJECTS } from '../../../constants/projects/projects.constants';
import { ROUTE_PATHS } from '../../../constants/routes/route-paths.constants';
import { projectExistsGuard } from './project-exists.guard';

function runGuard(slug: string): boolean | UrlTree {
  const route = { paramMap: convertToParamMap({ [ROUTE_PATHS.projectSlugParam]: slug }) } as ActivatedRouteSnapshot;
  return TestBed.runInInjectionContext(
    () => projectExistsGuard(route, {} as RouterStateSnapshot) as boolean | UrlTree,
  );
}

describe('projectExistsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  it('allows a known project', () => {
    expect(runGuard(PROJECTS[0].slug)).toBe(true);
  });

  it('redirects an unknown slug to the not-found page', () => {
    const result = runGuard('missing');
    expect(result instanceof UrlTree && result.toString()).toBe(`/${ROUTE_PATHS.notFound}`);
  });
});
