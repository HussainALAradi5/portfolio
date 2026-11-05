import { Injectable } from '@angular/core';
import { PROJECTS } from '../../../constants/projects/projects.constants';
import { ProjectTier } from '../../../enums/projects/project-tier.enum';
import { ProjectNeighbours } from '../../../interfaces/projects/project-neighbours.interface';
import { Project } from '../../../interfaces/projects/project.interface';
import { filterProjectsByTier } from '../../../utilities/projects/filter/filter-projects-by-tier.utility';
import { findProjectNeighbours } from '../../../utilities/projects/neighbours/find-project-neighbours.utility';

/**
 * Read access to the portfolio projects. The data is static, so this is the
 * single place to swap in an API later without touching components.
 */
@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly projects = PROJECTS;
  private readonly bySlug = new Map(PROJECTS.map((project) => [project.slug, project]));

  findAll(): readonly Project[] {
    return this.projects;
  }

  findByTier(tier?: ProjectTier): readonly Project[] {
    return filterProjectsByTier(this.projects, tier);
  }

  findBySlug(slug: string): Project | undefined {
    return this.bySlug.get(slug);
  }

  hasProject(slug: string): boolean {
    return this.bySlug.has(slug);
  }

  findNeighbours(slug: string): ProjectNeighbours {
    return findProjectNeighbours(this.projects, slug);
  }
}
