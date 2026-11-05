import { RepositoryRole } from '../../enums/projects/repository-role.enum';

export interface ProjectRepository {
  role: RepositoryRole;
  /** GitHub repository name; the link is built from it. */
  name: string;
  stack: string;
  isPrivate?: boolean;
}
