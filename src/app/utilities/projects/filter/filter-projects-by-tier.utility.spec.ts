import { PROJECTS } from '../../../constants/projects/projects.constants';
import { ProjectTier } from '../../../enums/projects/project-tier.enum';
import { filterProjectsByTier } from './filter-projects-by-tier.utility';

describe('filterProjectsByTier', () => {
  it('returns every project without a tier', () => {
    expect(filterProjectsByTier(PROJECTS)).toBe(PROJECTS);
  });

  it('keeps only the given tier', () => {
    const early = filterProjectsByTier(PROJECTS, ProjectTier.Early);
    expect(early.length).toBeGreaterThan(0);
    expect(early.every((project) => project.tier === ProjectTier.Early)).toBe(true);
  });
});
