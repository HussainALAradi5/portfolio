import { ProjectFilterOption } from './project-filter-option.interface';
import { Project } from './project.interface';

export interface ProjectFilterTab extends ProjectFilterOption {
  projects: readonly Project[];
}
