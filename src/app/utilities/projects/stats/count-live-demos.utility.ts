import { ProjectStatus } from '../../../enums/projects/project-status.enum';
import { Project } from '../../../interfaces/projects/project.interface';

export function countLiveDemos(projects: readonly Project[]): number {
  return projects.filter((project) => project.status === ProjectStatus.Live).length;
}
