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
  tagline: 'Short-video sharing app with a web client, mobile app and admin moderation',
  domain: 'Social media',
  icon: 'lucideClapperboard',
  tier: ProjectTier.Flagship,
  status: ProjectStatus.Completed,
  period: '2024, rebuilt 2026',
  summary:
    'A TikTok-style app where users upload videos, scroll an infinite feed, like and comment, and can ask to become admins who moderate ' +
    'videos and comments. First built in 2024 as one React project, it was rebuilt in 2026 as an Express and TypeScript API, ' +
    'a Next.js web client, a Flutter mobile app and a documentation repository.',
  highlights: [
    'Infinite feed with search, video streaming, likes and comments that their authors can edit or delete.',
    'Drag-and-drop uploads on the web and device uploads on mobile, checked for file type and size.',
    'Admin role: users request admin access, admins accept or reject it and moderate any video or comment.',
    'JWT access and refresh tokens; one shared refresh on a 401 retries every waiting request.',
    'One response envelope and paged lists (page size up to 50, allowlisted sorting) shared by web and mobile.',
    'Generic building blocks: config-driven forms, infinite grid, data table, query states and status badges.',
    'Vitest and Supertest HTTP tests on an in-memory MongoDB; development seed with one user per role.',
  ],
  tech: [
    { layer: TechLayer.Frontend, name: 'Next.js 16' },
    { layer: TechLayer.Frontend, name: 'React 19' },
    { layer: TechLayer.Frontend, name: 'Chakra UI 3' },
    { layer: TechLayer.Frontend, name: 'TanStack Query 5' },
    { layer: TechLayer.Frontend, name: 'React Hook Form + Zod' },
    { layer: TechLayer.Backend, name: 'Node.js' },
    { layer: TechLayer.Backend, name: 'Express 5' },
    { layer: TechLayer.Backend, name: 'TypeScript' },
    { layer: TechLayer.Backend, name: 'Zod 4' },
    { layer: TechLayer.Backend, name: 'Multer' },
    { layer: TechLayer.Mobile, name: 'Flutter 3.47' },
    { layer: TechLayer.Mobile, name: 'provider' },
    { layer: TechLayer.Mobile, name: 'go_router' },
    { layer: TechLayer.Mobile, name: 'Dio' },
    { layer: TechLayer.Data, name: 'MongoDB' },
    { layer: TechLayer.Data, name: 'Mongoose 9' },
    { layer: TechLayer.Security, name: 'JWT access + refresh' },
    { layer: TechLayer.Security, name: 'flutter_secure_storage' },
  ],
  repositories: [
    { role: RepositoryRole.Server, name: 'videos_waves_server', stack: 'Express' },
    { role: RepositoryRole.Client, name: 'videos_waves_client', stack: 'Next.js' },
    { role: RepositoryRole.Mobile, name: 'videos_waves_mobile', stack: 'Flutter' },
    { role: RepositoryRole.Documentation, name: 'videos_waves_documentation', stack: 'Markdown' },
  ],
  links: [],
  // Screenshots of the original 2024 version; the rebuilt client has none published yet.
  screenshots: [
    { src: `${IMAGES}/homepage.webp`, caption: 'Home feed (original version)' },
    { src: `${IMAGES}/upload.webp`, caption: 'Drag-and-drop upload (original version)' },
    { src: `${IMAGES}/commentsection.webp`, caption: 'Comment section (original version)' },
    { src: `${IMAGES}/dark-mode.webp`, caption: 'Dark mode (original version)' },
    { src: `${IMAGES}/login.webp`, caption: 'Login (original version)' },
  ],
};
