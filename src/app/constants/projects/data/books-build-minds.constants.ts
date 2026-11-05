import { ProjectStatus } from '../../../enums/projects/project-status.enum';
import { ProjectTier } from '../../../enums/projects/project-tier.enum';
import { RepositoryRole } from '../../../enums/projects/repository-role.enum';
import { TechLayer } from '../../../enums/projects/tech-layer.enum';
import { Project } from '../../../interfaces/projects/project.interface';
import { PROJECT_IMAGE_BASE } from '../project-paths.constants';

const IMAGES = `${PROJECT_IMAGE_BASE}/books-build-minds`;

export const BOOKS_BUILD_MINDS_PROJECT: Project = {
  slug: 'books-build-minds',
  name: 'Books Build Minds',
  tagline: 'Book catalog, store and library workflow',
  domain: 'Education',
  icon: 'lucideBookOpen',
  tier: ProjectTier.Flagship,
  status: ProjectStatus.Completed,
  period: '2026',
  summary:
    'A book catalog where readers browse, rate and buy books, and administrators manage authors, publishers, categories, inventory and prices. ' +
    'A Flask API serves a Next.js web client and a Flutter mobile app, with a separate documentation repository for every service and endpoint.',
  highlights: [
    'Responsive catalog with grid and list views, searchable publisher and category filters and condition badges.',
    'Ranking by rating or completed sales, with a paginated top five per category.',
    'Copy-availability bar from available and total copies, plus a labeled wear scale by condition.',
    'Author and publisher profiles, reviews and a book information card on each book page.',
    'Administrator tables for inventory and access management, and a compact price dialog.',
    'Role-based permissions for clients, employees and administrators, with seeded demo accounts.',
  ],
  tech: [
    { layer: TechLayer.Frontend, name: 'Next.js 16' },
    { layer: TechLayer.Frontend, name: 'React 19' },
    { layer: TechLayer.Frontend, name: 'Chakra UI 3' },
    { layer: TechLayer.Backend, name: 'Python' },
    { layer: TechLayer.Backend, name: 'Flask 3' },
    { layer: TechLayer.Backend, name: 'Flask-SocketIO' },
    { layer: TechLayer.Mobile, name: 'Flutter' },
    { layer: TechLayer.Data, name: 'PostgreSQL' },
    { layer: TechLayer.Data, name: 'SQLAlchemy' },
    { layer: TechLayer.Data, name: 'Flask-Migrate' },
    { layer: TechLayer.Security, name: 'JWT' },
    { layer: TechLayer.Security, name: 'Flask-Limiter' },
  ],
  repositories: [
    {
      role: RepositoryRole.Server,
      name: 'books_build_minds_server',
      stack: 'Flask',
    },
    {
      role: RepositoryRole.Client,
      name: 'books_build_minds_client_side',
      stack: 'Next.js',
    },
    {
      role: RepositoryRole.Mobile,
      name: 'books_build_minds_mobile',
      stack: 'Flutter',
    },
    {
      role: RepositoryRole.Documentation,
      name: 'books_build_minds_documentation',
      stack: 'Markdown',
    },
  ],
  links: [],
  screenshots: [
    { src: `${IMAGES}/catalog.webp`, caption: 'Book catalog' },
    { src: `${IMAGES}/book.webp`, caption: 'Book details' },
    { src: `${IMAGES}/inventory.webp`, caption: 'Administrator inventory' },
    { src: `${IMAGES}/catalog-dark.webp`, caption: 'Catalog in dark mode' },
  ],
};
