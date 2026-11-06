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
  status: ProjectStatus.Live,
  period: '2024, rebuilt 2026',
  summary:
    'An Instagram-style short-video app: people upload videos, browse a For you or Following feed, like, comment and reply, follow ' +
    'each other and chat live in direct and group conversations. Admins moderate content and review requests for admin access. ' +
    'First built in 2024 as one React project, it was rebuilt in 2026 as an Express and TypeScript API, a Next.js web client, ' +
    'a Flutter mobile app and a documentation repository.',
  highlights: [
    'For you and Following feeds with search, video streaming, likes, and comments with replies.',
    'Live direct and group chat over Socket.IO with photos, files, voice notes, reactions and Seen.',
    'Follow, block and restrict, with private accounts.',
    'Drag-and-drop uploads on the web and device uploads on mobile, checked for file type and size.',
    'Admin role: users request admin access, admins accept or reject it and moderate any video or comment.',
    'JWT access and refresh tokens; one shared refresh on a 401 retries every waiting request.',
    'One response envelope and paged lists (page size up to 50, allowlisted sorting) shared by web and mobile.',
    'Generic building blocks: config-driven forms, infinite grid, data table, query states and status badges.',
    'Vitest and Supertest HTTP tests on an in-memory MongoDB; development seed with one user per role.',
    'Live demo: the web app on Vercel and the API on Render, seeded with demo accounts and public sample clips.',
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
    { layer: TechLayer.Backend, name: 'Socket.IO 4' },
    { layer: TechLayer.Backend, name: 'ImageKit' },
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
  links: [
    { label: 'Open web app', url: 'https://videos-waves-client.vercel.app' },
    { label: 'API', url: 'https://videos-waves-api.onrender.com/health' },
  ],
  // From the web client repository's docs/screenshots.
  screenshots: [
    { src: `${IMAGES}/desktop-dark-feed.webp`, caption: 'Feed (dark)' },
    { src: `${IMAGES}/desktop-dark-video.webp`, caption: 'Video with comments and the Owner badge' },
    { src: `${IMAGES}/desktop-dark-chat.webp`, caption: 'Live chat' },
    { src: `${IMAGES}/desktop-dark-chat-options.webp`, caption: 'Reactions and chat options' },
    { src: `${IMAGES}/desktop-light-profile.webp`, caption: 'Profile (light)' },
    { src: `${IMAGES}/tablet-light-feed.webp`, caption: 'Feed (light, tablet width)' },
  ],
};
