import { ProjectNeighbours } from '../../../interfaces/projects/project-neighbours.interface';
import { Project } from '../../../interfaces/projects/project.interface';

export function findProjectNeighbours(projects: readonly Project[], slug: string): ProjectNeighbours {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) {
    return {};
  }
  return { previous: projects[index - 1], next: projects[index + 1] };
}
