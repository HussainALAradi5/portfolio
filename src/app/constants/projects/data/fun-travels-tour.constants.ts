import { ProjectStatus } from '../../../enums/projects/project-status.enum';
import { ProjectTier } from '../../../enums/projects/project-tier.enum';
import { RepositoryRole } from '../../../enums/projects/repository-role.enum';
import { TechLayer } from '../../../enums/projects/tech-layer.enum';
import { Project } from '../../../interfaces/projects/project.interface';
import { GITHUB_BASE_URL, PROJECT_IMAGE_BASE } from '../project-paths.constants';

const IMAGES = `${PROJECT_IMAGE_BASE}/fun-travels-tour`;

export const FUN_TRAVELS_TOUR_PROJECT: Project = {
  slug: 'fun-travels-tour',
  name: 'Fun Travels Tour',
  tagline: 'Multi-agency travel operations platform',
  domain: 'Travel',
  icon: 'lucidePlane',
  tier: ProjectTier.Flagship,
  status: ProjectStatus.Completed,
  period: '2026',
  summary:
    'Travel agencies publish tours with their own vehicles, seats and meals. Customers browse the catalog, book seats, pay from a wallet ' +
    'and carry a boarding pass with a QR code. Owners, managers and employees run their agency, and administrators run the platform.',
  highlights: [
    'Per-tour seat inventory, meal options and bookings paid from a wallet, with Stripe top-up on the web.',
    'Boarding pass with QR code, cancellations and refunds calculated from the notice period.',
    'Seven roles scoped to their own agency or branch, from customer to owner and platform admin.',
    'Live notifications over WebSocket and support requests with replies.',
    'Branded PDF and Excel reports generated on the server.',
    'Client DTO mirrors generated from the server source; CI runs tests, type-check, lint and build for each repository.',
  ],
  tech: [
    { layer: TechLayer.Frontend, name: 'Next.js 16' },
    { layer: TechLayer.Frontend, name: 'React 19' },
    { layer: TechLayer.Frontend, name: 'Chakra UI 3' },
    { layer: TechLayer.Frontend, name: 'TypeScript' },
    { layer: TechLayer.Backend, name: 'Java 21' },
    { layer: TechLayer.Backend, name: 'Spring Boot 3.5' },
    { layer: TechLayer.Backend, name: 'WebSocket' },
    { layer: TechLayer.Backend, name: 'OpenPDF / Apache POI' },
    { layer: TechLayer.Mobile, name: 'Expo SDK 58' },
    { layer: TechLayer.Mobile, name: 'React Native' },
    { layer: TechLayer.Data, name: 'PostgreSQL' },
    { layer: TechLayer.Data, name: 'Spring Data JPA' },
    { layer: TechLayer.Security, name: 'JWT' },
    { layer: TechLayer.Security, name: 'Stripe' },
  ],
  repositories: [
    {
      role: RepositoryRole.Server,
      name: 'fun-travels-tour-server',
      stack: 'Spring Boot',
      url: `${GITHUB_BASE_URL}/fun-travels-tour-server`,
    },
    {
      role: RepositoryRole.Client,
      name: 'fun-travels-tour-client',
      stack: 'Next.js',
      url: `${GITHUB_BASE_URL}/fun-travels-tour-client`,
    },
    { role: RepositoryRole.Mobile, name: 'fun-travels-tour-mobile', stack: 'Expo' },
    {
      role: RepositoryRole.Documentation,
      name: 'fun-travels-tour-document',
      stack: 'Markdown',
      url: `${GITHUB_BASE_URL}/fun-travels-tour-document`,
    },
  ],
  links: [],
  screenshots: [
    { src: `${IMAGES}/home.png`, caption: 'Public home page' },
    { src: `${IMAGES}/tours.png`, caption: 'Tour catalog' },
    { src: `${IMAGES}/admin-tours.png`, caption: 'Tour inventory management' },
    { src: `${IMAGES}/ledger.png`, caption: 'Transaction ledger' },
  ],
};
