import { PROJECTS } from '../../../constants/projects/projects.constants';
import { ProjectTier } from '../../../enums/projects/project-tier.enum';
import { filterProjectsByTier } from './filter-projects-by-tier.utility';

describe('filterProjectsByTier', () => {
  it('returns every project without a tier', () => {
    expect(filterProjectsByTier(PROJECTS)).toBe(PROJECTS);
  });

  it('keeps only the given tier', () => {
    const games = filterProjectsByTier(PROJECTS, ProjectTier.Game);
    expect(games.length).toBeGreaterThan(0);
    expect(games.every((project) => project.tier === ProjectTier.Game)).toBe(true);
  });
});
