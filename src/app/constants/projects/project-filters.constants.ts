import { ProjectFilter } from '../../enums/projects/project-filter.enum';
import { ProjectFilterOption } from '../../interfaces/projects/project-filter-option.interface';

export const PROJECT_FILTER_OPTIONS: readonly ProjectFilterOption[] = [
  { value: ProjectFilter.All, label: 'All' },
  { value: ProjectFilter.Flagship, label: 'Full-stack platforms' },
  { value: ProjectFilter.Early, label: 'Early projects' },
];
