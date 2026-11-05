import { ProjectFilter } from '../../enums/projects/project-filter.enum';
import { ProjectTier } from '../../enums/projects/project-tier.enum';
import { ProjectFilterOption } from '../../interfaces/projects/project-filter-option.interface';

export const PROJECT_FILTER_OPTIONS: readonly ProjectFilterOption[] = [
  { value: ProjectFilter.All, label: 'All' },
  { value: ProjectFilter.Flagship, label: 'Full-stack platforms', tier: ProjectTier.Flagship },
  { value: ProjectFilter.Early, label: 'Early projects', tier: ProjectTier.Early },
];
