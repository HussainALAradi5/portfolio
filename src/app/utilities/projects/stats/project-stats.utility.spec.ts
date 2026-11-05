import { PROJECTS } from '../../../constants/projects/projects.constants';
import { ProjectStatus } from '../../../enums/projects/project-status.enum';
import { countLiveDemos } from './count-live-demos.utility';
import { countRepositories } from './count-repositories.utility';

describe('project stats', () => {
  it('counts every repository', () => {
    const expected = PROJECTS.map((project) => project.repositories.length).reduce((a, b) => a + b, 0);
    expect(countRepositories(PROJECTS)).toBe(expected);
  });

  it('counts live projects by status', () => {
    const live = PROJECTS.filter((project) => project.status === ProjectStatus.Live);
    expect(countLiveDemos(PROJECTS)).toBe(live.length);
  });

  it('gives every live project a demo link', () => {
    const live = PROJECTS.filter((project) => project.status === ProjectStatus.Live);
    expect(live.every((project) => project.links.length > 0)).toBe(true);
  });

  it('has unique slugs', () => {
    expect(new Set(PROJECTS.map((project) => project.slug)).size).toBe(PROJECTS.length);
  });
});
