import { PROJECTS } from '../../../constants/projects/projects.constants';
import { ProjectSort } from '../../../enums/projects/project-sort.enum';
import { Project } from '../../../interfaces/projects/project.interface';
import { projectDateKey, projectYear } from './project-date-key.utility';
import { groupProjects, sortProjects } from './sort-projects.utility';

const project = (name: string, period: string, domain = 'Web'): Project => ({ ...PROJECTS[0], name, period, domain });

describe('project dates', () => {
  it('uses the latest year, and its month when written', () => {
    expect(projectYear('2024, rebuilt 2026')).toBe('2026');
    expect(projectDateKey('May 2024')).toBeGreaterThan(projectDateKey('2024'));
    expect(projectDateKey('Aug 2024')).toBeGreaterThan(projectDateKey('May 2024'));
    expect(projectDateKey('2026')).toBeGreaterThan(projectDateKey('Aug 2024'));
    expect(projectDateKey('2024, rebuilt 2026')).toBe(projectDateKey('2026'));
    expect(projectDateKey('no date')).toBe(0);
    expect(projectYear('no date')).toBe('');
  });
});

describe('sortProjects', () => {
  const list = [project('A', 'May 2024', 'Game'), project('B', '2026', 'Health'), project('C', 'Aug 2024', 'Game')];

  it('sorts newest and oldest first without changing the input', () => {
    expect(sortProjects(list, ProjectSort.Newest).map((p) => p.name)).toEqual(['B', 'C', 'A']);
    expect(sortProjects(list, ProjectSort.Oldest).map((p) => p.name)).toEqual(['A', 'C', 'B']);
    expect(list.map((p) => p.name)).toEqual(['A', 'B', 'C']);
  });

  it('sorts by type, newest first within a type', () => {
    expect(sortProjects(list, ProjectSort.Type).map((p) => p.name)).toEqual(['C', 'A', 'B']);
  });
});

describe('groupProjects', () => {
  const list = [project('A', 'May 2024', 'Game'), project('B', '2026', 'Health'), project('C', 'Aug 2024', 'Game')];

  it('groups by year, or by type, in sorted order', () => {
    expect(groupProjects(list, ProjectSort.Newest).map((g) => [g.label, g.projects.length])).toEqual([
      ['2026', 1],
      ['2024', 2],
    ]);
    expect(groupProjects(list, ProjectSort.Type).map((g) => g.label)).toEqual(['Game', 'Health']);
  });

  it('keeps every real project exactly once', () => {
    const grouped = groupProjects(PROJECTS, ProjectSort.Newest).flatMap((g) => g.projects);
    expect(new Set(grouped.map((p) => p.slug)).size).toBe(PROJECTS.length);
  });
});
