import { ProjectStatus } from '../../../enums/projects/project-status.enum';
import { ProjectTier } from '../../../enums/projects/project-tier.enum';
import { RepositoryRole } from '../../../enums/projects/repository-role.enum';
import { TechLayer } from '../../../enums/projects/tech-layer.enum';
import { Project } from '../../../interfaces/projects/project.interface';
import { PROJECT_IMAGE_BASE } from '../project-paths.constants';

const IMAGES = `${PROJECT_IMAGE_BASE}/videos-waves`;

export const VIDEOS_WAVES_PROJECT: Project = {
  slug: 'videos-waves',
  name: 'Videos Waves',
  tagline: 'Short-video feed inspired by TikTok',
  domain: 'Social media',
  icon: 'lucideClapperboard',
  tier: ProjectTier.Early,
  status: ProjectStatus.Completed,
  period: 'Aug – Sep 2024',
  summary:
    'A short-video app that mimics a TikTok-style feed, built to learn a full JavaScript stack: a React and Chakra UI client ' +
    'over a Node.js API with MongoDB and JWT authentication.',
  highlights: [
    'Upload videos with drag and drop.',
    'Infinite scroll feed with likes and dislikes.',
    'Comments that can be added, edited and removed.',
    'Register, log in and update profile details (user name, email, password).',
    'Light and dark mode with Chakra UI.',
  ],
  tech: [
    { layer: TechLayer.Frontend, name: 'React' },
    { layer: TechLayer.Frontend, name: 'Chakra UI' },
    { layer: TechLayer.Backend, name: 'Node.js' },
    { layer: TechLayer.Data, name: 'MongoDB' },
    { layer: TechLayer.Security, name: 'JWT' },
  ],
  repositories: [
    {
      role: RepositoryRole.Application,
      name: 'videos_waves',
      stack: 'React + Node.js',
    },
  ],
  links: [],
  screenshots: [
    { src: `${IMAGES}/homepage.webp`, caption: 'Home feed' },
    { src: `${IMAGES}/upload.webp`, caption: 'Drag-and-drop upload' },
    { src: `${IMAGES}/commentsection.webp`, caption: 'Comment section' },
    { src: `${IMAGES}/dark-mode.webp`, caption: 'Dark mode' },
    { src: `${IMAGES}/login.webp`, caption: 'Login' },
  ],
};
