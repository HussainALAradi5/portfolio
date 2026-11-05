import { GITHUB_BASE_URL } from '../../constants/projects/project-paths.constants';
import { ICON } from '../../constants/ui/icons.constants';
import { SiteProfile } from '../../interfaces/site/site-profile.interface';

export const SITE_PROFILE: SiteProfile = {
  name: 'Hussain Al Aradi',
  role: 'Full-stack developer',
  intro:
    'I build complete products: the API, the web client, the mobile app and the documentation that ties them together. ' +
    'Most projects below live in separate repositories with layer-first architecture, typed contracts and role-based access.',
  githubUrl: GITHUB_BASE_URL,
  socialLinks: [
    { label: 'GitHub', url: GITHUB_BASE_URL, icon: ICON.github },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/hussainalaradi/', icon: ICON.linkedin },
    { label: 'Email', url: 'mailto:hussainaradi.ha@gmail.com', icon: ICON.mail },
  ],
};
