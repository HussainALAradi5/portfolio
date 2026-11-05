import { RepositoryRole } from '../../enums/projects/repository-role.enum';

export interface ProjectRepository {
  role: RepositoryRole;
  name: string;
  stack: string;
  /** Omitted when the repository is private. */
  url?: string;
}
