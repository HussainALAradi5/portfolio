import { PROJECTS } from '../../constants/projects/projects.constants';
import { TECH_LAYER_ORDER } from '../../constants/projects/project-labels.constants';
import { ProjectFilter } from '../../enums/projects/project-filter.enum';
import { ProjectTier } from '../../enums/projects/project-tier.enum';
import { TechLayer } from '../../enums/projects/tech-layer.enum';
import {
  countLiveDemos,
  countRepositories,
  filterProjects,
  findProjectNeighbours,
  groupTechByLayer,
} from './project.utility';

describe('project utilities', () => {
  it('returns every project for the All filter', () => {
    expect(filterProjects(PROJECTS, ProjectFilter.All)).toHaveLength(PROJECTS.length);
  });

  it('filters by tier', () => {
    const early = filterProjects(PROJECTS, ProjectFilter.Early);
    expect(early.length).toBeGreaterThan(0);
    expect(early.every((project) => project.tier === ProjectTier.Early)).toBe(true);
  });

  it('groups tech in layer order and skips empty layers', () => {
    const groups = groupTechByLayer(
      [
        { layer: TechLayer.Data, name: 'MongoDB' },
        { layer: TechLayer.Frontend, name: 'React' },
        { layer: TechLayer.Frontend, name: 'CSS' },
      ],
      TECH_LAYER_ORDER,
    );
    expect(groups).toEqual([
      { layer: TechLayer.Frontend, items: ['React', 'CSS'] },
      { layer: TechLayer.Data, items: ['MongoDB'] },
    ]);
  });

  it('finds neighbours at the edges and for unknown slugs', () => {
    const first = findProjectNeighbours(PROJECTS, PROJECTS[0].slug);
    expect(first.previous).toBeUndefined();
    expect(first.next).toBe(PROJECTS[1]);
    expect(findProjectNeighbours(PROJECTS, 'missing')).toEqual({});
  });

  it('has unique slugs', () => {
    const slugs = new Set(PROJECTS.map((project) => project.slug));
    expect(slugs.size).toBe(PROJECTS.length);
  });

  it('counts repositories and live demos', () => {
    expect(countRepositories(PROJECTS)).toBeGreaterThanOrEqual(PROJECTS.length);
    expect(countLiveDemos(PROJECTS)).toBeGreaterThan(0);
  });
});
