import { ProjectTier } from '../../../enums/projects/project-tier.enum';
import { Project } from '../../../interfaces/projects/project.interface';

/** Projects of one tier, or every project when no tier is given. */
export function filterProjectsByTier(projects: readonly Project[], tier?: ProjectTier): readonly Project[] {
  return tier ? projects.filter((project) => project.tier === tier) : projects;
}
