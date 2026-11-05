import { Project } from '../../../interfaces/projects/project.interface';

export function countRepositories(projects: readonly Project[]): number {
  return projects.reduce((total, project) => total + project.repositories.length, 0);
}
