import { Injectable } from '@angular/core';
import { PROJECTS } from '../../constants/projects/projects.constants';
import { ProjectFilter } from '../../enums/projects/project-filter.enum';
import { ProjectNeighbours } from '../../interfaces/projects/project-neighbours.interface';
import { Project } from '../../interfaces/projects/project.interface';
import { filterProjects, findProjectNeighbours } from '../../utilities/projects/project.utility';

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

  findByFilter(filter: ProjectFilter): readonly Project[] {
    return filterProjects(this.projects, filter);
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
