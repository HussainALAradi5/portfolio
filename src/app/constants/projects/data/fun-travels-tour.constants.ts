import { ProjectStatus } from '../../../enums/projects/project-status.enum';
import { ProjectTier } from '../../../enums/projects/project-tier.enum';
import { RepositoryRole } from '../../../enums/projects/repository-role.enum';
import { TechLayer } from '../../../enums/projects/tech-layer.enum';
import { Project } from '../../../interfaces/projects/project.interface';
import { PROJECT_IMAGE_BASE } from '../project-paths.constants';

const IMAGES = `${PROJECT_IMAGE_BASE}/fun-travels-tour`;

export const FUN_TRAVELS_TOUR_PROJECT: Project = {
  slug: 'fun-travels-tour',
  name: 'Fun Travels Tour',
  tagline: 'Multi-agency travel operations platform',
  domain: 'Travel',
  icon: 'lucidePlane',
  tier: ProjectTier.Flagship,
  status: ProjectStatus.Live,
  period: '2026',
  summary:
    'Travel agencies publish tours with their own vehicles, seats and meals. Customers browse the catalog, book seats, pay from a wallet ' +
    'and carry a boarding pass with a QR code. Owners, managers and employees run their agency, and administrators run the platform.',
  highlights: [
    'Per-tour seat inventory, meal options and bookings paid from a wallet, with Stripe top-up on the web.',
    'Book seats for a whole family in one booking, with tour sale prices set by the agency.',
    'Per-agency discount and refund rules; customers see the exact refund before they cancel.',
    'Boarding pass with QR code, cancellations and refunds calculated from the notice period.',
    'Seven roles scoped to their own agency or branch, from customer to owner and platform admin.',
    'Live notifications over WebSocket and support requests with replies.',
    'Branded PDF and Excel reports generated on the server.',
    'Client DTO mirrors generated from the server source; CI runs tests, type-check, lint and build for each repository, plus 316 live API checks on the server.',
    'Live demo: the web app on Vercel, the API on Render and the database on Neon, seeded with bookable demo tours; the Android app ships as an APK.',
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
    },
    {
      role: RepositoryRole.Client,
      name: 'fun-travels-tour-client',
      stack: 'Next.js',
    },
    {
      role: RepositoryRole.Mobile,
      name: 'fun-travels-tour-mobile',
      stack: 'Expo',
    },
    {
      role: RepositoryRole.Documentation,
      name: 'fun-travels-tour-document',
      stack: 'Markdown',
    },
  ],
  links: [
    { label: 'Open web app', url: 'https://fun-travels-tour-client.vercel.app' },
    { label: 'API', url: 'https://fun-travels-tour-api.onrender.com/api/tours/catalog' },
    {
      label: 'Download Android app',
      url: 'https://expo.dev/artifacts/eas/gk8X_woGO39agq-bTTbpYPh7LOqAFIt7Jp4CaBMhcv8.apk',
    },
  ],
  screenshots: [
    { src: `${IMAGES}/home.webp`, caption: 'Public home page' },
    { src: `${IMAGES}/tours.webp`, caption: 'Tour catalog' },
    { src: `${IMAGES}/admin-tours.webp`, caption: 'Tour inventory management' },
    { src: `${IMAGES}/ledger.webp`, caption: 'Transaction ledger' },
  ],
};
