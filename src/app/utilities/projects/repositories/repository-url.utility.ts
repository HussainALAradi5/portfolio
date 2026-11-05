import { GITHUB_BASE_URL } from '../../../constants/projects/project-paths.constants';
import { ProjectRepository } from '../../../interfaces/projects/project-repository.interface';

/** GitHub link of a public repository; private repositories have none. */
export function repositoryUrl(repository: ProjectRepository): string | undefined {
  return repository.isPrivate ? undefined : `${GITHUB_BASE_URL}/${repository.name}`;
}
