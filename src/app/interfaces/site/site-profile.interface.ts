import { SocialLink } from './social-link.interface';

export interface SiteProfile {
  name: string;
  role: string;
  intro: string;
  githubUrl: string;
  socialLinks: readonly SocialLink[];
}
