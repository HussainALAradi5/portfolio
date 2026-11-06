import { GITHUB_BASE_URL } from '../../constants/projects/project-paths.constants';
import { ICON } from '../../constants/ui/icons.constants';
import { SiteProfile } from '../../interfaces/site/site-profile.interface';

const EMAIL = 'hussainaradi.ha@gmail.com';
const LINKEDIN_URL = 'https://www.linkedin.com/in/hussainalaradi/';

export const SITE_PROFILE: SiteProfile = {
  name: 'Hussain Al Aradi',
  role: 'Software Engineer',
  intro:
    'I build complete products: the API, the web client, the mobile app and the documentation that ties them together. ' +
    'Most projects below live in separate repositories with layer-first architecture, typed contracts and role-based access.',
  cv: {
    url: 'files/cv/hussain-al-aradi-cv.pdf',
    fileName: 'Hussain Al Aradi - Software Engineer CV.pdf',
  },
  socialLinks: [
    { label: 'GitHub', url: GITHUB_BASE_URL, icon: ICON.github },
    { label: 'LinkedIn', url: LINKEDIN_URL, icon: ICON.linkedin },
    { label: 'Email', url: `mailto:${EMAIL}`, icon: ICON.mail },
  ],
};
