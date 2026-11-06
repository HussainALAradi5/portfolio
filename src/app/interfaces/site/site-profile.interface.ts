import { CvFile } from './cv-file.interface';
import { SocialLink } from './social-link.interface';

export interface SiteProfile {
  name: string;
  role: string;
  intro: string;
  githubUrl: string;
  email: string;
  linkedinUrl: string;
  location: string;
  cv: CvFile;
  socialLinks: readonly SocialLink[];
}
