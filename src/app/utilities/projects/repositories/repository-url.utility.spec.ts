import { GITHUB_BASE_URL } from '../../../constants/projects/project-paths.constants';
import { RepositoryRole } from '../../../enums/projects/repository-role.enum';
import { repositoryUrl } from './repository-url.utility';

describe('repositoryUrl', () => {
  const repository = { role: RepositoryRole.Client, name: 'demo_client', stack: 'Angular' };

  it('builds the GitHub link from the name', () => {
    expect(repositoryUrl(repository)).toBe(`${GITHUB_BASE_URL}/demo_client`);
  });

  it('has no link for a private repository', () => {
    expect(repositoryUrl({ ...repository, isPrivate: true })).toBeUndefined();
  });
});
