import { Project } from './project.interface';

/** Projects under one timeline heading: a year, or a type when sorted by type. */
export interface ProjectGroup {
  label: string;
  projects: readonly Project[];
}
