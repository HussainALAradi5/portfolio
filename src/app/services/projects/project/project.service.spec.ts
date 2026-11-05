import { TestBed } from '@angular/core/testing';
import { PROJECTS } from '../../../constants/projects/projects.constants';
import { ProjectTier } from '../../../enums/projects/project-tier.enum';
import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(() => {
    service = TestBed.inject(ProjectService);
  });

  it('returns every project in display order', () => {
    expect(service.findAll()).toEqual(PROJECTS);
  });

  it('finds a project by slug', () => {
    expect(service.findBySlug(PROJECTS[1].slug)).toBe(PROJECTS[1]);
    expect(service.findBySlug('missing')).toBeUndefined();
  });

  it('reports whether a slug exists', () => {
    expect(service.hasProject(PROJECTS[0].slug)).toBe(true);
    expect(service.hasProject('missing')).toBe(false);
  });

  it('filters by tier', () => {
    const flagship = service.findByTier(ProjectTier.Flagship);
    expect(flagship.every((project) => project.tier === ProjectTier.Flagship)).toBe(true);
    expect(service.findByTier()).toHaveLength(PROJECTS.length);
  });
});
