import { ProjectStatus } from '../../../enums/projects/project-status.enum';
import { ProjectTier } from '../../../enums/projects/project-tier.enum';
import { RepositoryRole } from '../../../enums/projects/repository-role.enum';
import { TechLayer } from '../../../enums/projects/tech-layer.enum';
import { Project } from '../../../interfaces/projects/project.interface';
import { PROJECT_IMAGE_BASE } from '../project-paths.constants';

const IMAGES = `${PROJECT_IMAGE_BASE}/task-flow-proto`;

export const TASK_FLOW_PROTO_PROJECT: Project = {
  slug: 'task-flow-proto',
  name: 'TaskFlow',
  tagline: 'Kanban project boards for teams',
  domain: 'Productivity',
  icon: 'lucideKanban',
  tier: ProjectTier.Flagship,
  status: ProjectStatus.Live,
  period: '2026',
  summary:
    'A Trello-inspired board built on the MEAN stack. Boards have four task columns, milestones, card discussions and an ordered activity ' +
    'history. Teams get linked boards, a private chat and a read/unread notification inbox.',
  highlights: [
    'Drag cards between To Do, In Progress, In Review and Done on desktop; change status from the card on touch devices.',
    'Card discussions with small images and GIFs, progress bars and an ordered activity history.',
    'Team invitations that must be accepted before access is granted, with leader and member badges.',
    'Team chat with attachments, emoji and validated member mentions.',
    'Header bell with a private read/unread notification inbox.',
    'Live on Render with a dedicated MongoDB Atlas database and seeded admin, leader and member roles.',
  ],
  tech: [
    { layer: TechLayer.Frontend, name: 'Angular 21' },
    { layer: TechLayer.Frontend, name: 'Tailwind CSS 4' },
    { layer: TechLayer.Backend, name: 'Node.js' },
    { layer: TechLayer.Backend, name: 'Express 5' },
    { layer: TechLayer.Backend, name: 'TypeScript' },
    { layer: TechLayer.Backend, name: 'Zod' },
    { layer: TechLayer.Data, name: 'MongoDB' },
    { layer: TechLayer.Data, name: 'Mongoose' },
    { layer: TechLayer.Security, name: 'JWT' },
  ],
  repositories: [
    {
      role: RepositoryRole.Server,
      name: 'task-flow-proto-server-side',
      stack: 'Express',
    },
    {
      role: RepositoryRole.Client,
      name: 'task-flow-proto-client-side',
      stack: 'Angular',
    },
    {
      role: RepositoryRole.Documentation,
      name: 'task-flow-proto-documenation',
      stack: 'Markdown',
    },
  ],
  links: [{ label: 'Open live demo', url: 'https://taskflow-proto-client.onrender.com' }],
  screenshots: [
    { src: `${IMAGES}/board.webp`, caption: 'Project board' },
    { src: `${IMAGES}/task-details.webp`, caption: 'Task details' },
    { src: `${IMAGES}/dashboard.webp`, caption: 'Admin dashboard' },
    { src: `${IMAGES}/discussion.webp`, caption: 'Card discussion' },
  ],
};
