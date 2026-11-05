import { ProjectFilter } from '../../enums/projects/project-filter.enum';
import { TechLayer } from '../../enums/projects/tech-layer.enum';
import { ProjectNeighbours } from '../../interfaces/projects/project-neighbours.interface';
import { ProjectTech } from '../../interfaces/projects/project-tech.interface';
import { Project } from '../../interfaces/projects/project.interface';
import { TechGroup } from '../../interfaces/projects/tech-group.interface';

export function filterProjects(projects: readonly Project[], filter: ProjectFilter): readonly Project[] {
  if (filter === ProjectFilter.All) {
    return projects;
  }
  return projects.filter((project) => project.tier === (filter as string));
}

/** Groups stack items by layer in the given order, skipping empty layers. */
export function groupTechByLayer(tech: readonly ProjectTech[], order: readonly TechLayer[]): readonly TechGroup[] {
  const byLayer = new Map<TechLayer, string[]>();
  for (const item of tech) {
    const items = byLayer.get(item.layer) ?? [];
    items.push(item.name);
    byLayer.set(item.layer, items);
  }
  return order.filter((layer) => byLayer.has(layer)).map((layer) => ({ layer, items: byLayer.get(layer)! }));
}

export function findProjectNeighbours(projects: readonly Project[], slug: string): ProjectNeighbours {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) {
    return {};
  }
  return { previous: projects[index - 1], next: projects[index + 1] };
}

export function countRepositories(projects: readonly Project[]): number {
  return projects.reduce((total, project) => total + project.repositories.length, 0);
}

export function countLiveDemos(projects: readonly Project[]): number {
  return projects.filter((project) => project.links.length > 0).length;
}
