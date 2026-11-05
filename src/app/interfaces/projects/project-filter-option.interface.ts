import { ProjectFilter } from '../../enums/projects/project-filter.enum';
import { ProjectTier } from '../../enums/projects/project-tier.enum';

export interface ProjectFilterOption {
  value: ProjectFilter;
  label: string;
  /** Tier the tab shows; omitted for the tab that shows every project. */
  tier?: ProjectTier;
}
