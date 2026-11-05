import { ProjectStatus } from '../../enums/projects/project-status.enum';
import { ProjectTier } from '../../enums/projects/project-tier.enum';
import { ProjectLink } from './project-link.interface';
import { ProjectRepository } from './project-repository.interface';
import { ProjectScreenshot } from './project-screenshot.interface';
import { ProjectTech } from './project-tech.interface';

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  domain: string;
  /** Lucide icon name registered in the icon constants. */
  icon: string;
  tier: ProjectTier;
  status: ProjectStatus;
  period: string;
  summary: string;
  highlights: readonly string[];
  tech: readonly ProjectTech[];
  repositories: readonly ProjectRepository[];
  links: readonly ProjectLink[];
  screenshots: readonly ProjectScreenshot[];
}
