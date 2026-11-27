import { ProjectSort } from '../../../enums/projects/project-sort.enum';
import { ProjectGroup } from '../../../interfaces/projects/project-group.interface';
import { Project } from '../../../interfaces/projects/project.interface';
import { projectDateKey, projectYear } from './project-date-key.utility';

const newestFirst = (a: Project, b: Project): number => projectDateKey(b.period) - projectDateKey(a.period);

/** Orders projects without changing the input; projects that tie keep their curated order. */
export function sortProjects(projects: readonly Project[], sort: ProjectSort): readonly Project[] {
  switch (sort) {
    case ProjectSort.Oldest:
      return [...projects].sort((a, b) => newestFirst(b, a));
    case ProjectSort.Type:
      return [...projects].sort((a, b) => a.domain.localeCompare(b.domain) || newestFirst(a, b));
    default:
      return [...projects].sort(newestFirst);
  }
}

/** Sorts, then groups under one heading per year, or per type when sorted by type. */
export function groupProjects(projects: readonly Project[], sort: ProjectSort): readonly ProjectGroup[] {
  const groups = new Map<string, Project[]>();
  for (const project of sortProjects(projects, sort)) {
    const label = sort === ProjectSort.Type ? project.domain : projectYear(project.period);
    groups.set(label, [...(groups.get(label) ?? []), project]);
  }
  return [...groups].map(([label, grouped]) => ({ label, projects: grouped }));
}
