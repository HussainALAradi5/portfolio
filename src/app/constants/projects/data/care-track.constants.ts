import { ProjectStatus } from '../../../enums/projects/project-status.enum';
import { ProjectTier } from '../../../enums/projects/project-tier.enum';
import { RepositoryRole } from '../../../enums/projects/repository-role.enum';
import { TechLayer } from '../../../enums/projects/tech-layer.enum';
import { Project } from '../../../interfaces/projects/project.interface';
import { GITHUB_BASE_URL } from '../project-paths.constants';

export const CARE_TRACK_PROJECT: Project = {
  slug: 'care-track',
  name: 'CareTrack',
  tagline: 'Multi-hospital care management platform',
  domain: 'Healthcare',
  icon: 'lucideHeartPulse',
  tier: ProjectTier.Flagship,
  status: ProjectStatus.InProgress,
  period: '2026',
  summary:
    'CareTrack runs many public and private hospitals on one platform. Patients request bookings and manage their appointments; ' +
    'staff work a booking queue, an appointments desk and clinician shifts. What each person sees depends on the hospital they select ' +
    'and the permissions that hospital grants them.',
  highlights: [
    'Booking requests become exactly one appointment on confirmation, with a stored cancellation window and visit journey.',
    'Staff screens appear per permission: booking queue, appointments desk with identity check and no-show, and shift planning.',
    'Patient data is isolated per hospital, with per-hospital role and permission grants.',
    'OIDC sign-in through Keycloak (authorization code with PKCE) on web and mobile; the API is an OAuth2 resource server.',
    'Retry-safe confirmations with an Idempotency-Key, and every error mapped to one ErrorCode.',
    'Flyway migrations on PostgreSQL and a separate documentation repository with models, services and workflows.',
  ],
  tech: [
    { layer: TechLayer.Frontend, name: 'Angular 21' },
    { layer: TechLayer.Frontend, name: 'Angular Material 3' },
    { layer: TechLayer.Frontend, name: 'Tailwind CSS 4' },
    { layer: TechLayer.Frontend, name: 'NgRx Signals' },
    { layer: TechLayer.Backend, name: 'Java 25' },
    { layer: TechLayer.Backend, name: 'Spring Boot 4' },
    { layer: TechLayer.Backend, name: 'Spring Data JPA' },
    { layer: TechLayer.Mobile, name: 'Flutter' },
    { layer: TechLayer.Mobile, name: 'Riverpod 3' },
    { layer: TechLayer.Mobile, name: 'go_router' },
    { layer: TechLayer.Data, name: 'PostgreSQL' },
    { layer: TechLayer.Data, name: 'Flyway' },
    { layer: TechLayer.Security, name: 'Keycloak (OIDC + PKCE)' },
    { layer: TechLayer.Security, name: 'Spring Security' },
  ],
  repositories: [
    { role: RepositoryRole.Server, name: 'care_track_server_side', stack: 'Spring Boot' },
    { role: RepositoryRole.Client, name: 'care_track_client_side', stack: 'Angular' },
    {
      role: RepositoryRole.Mobile,
      name: 'care_track_client_mobile',
      stack: 'Flutter',
      url: `${GITHUB_BASE_URL}/care_track_client_mobile`,
    },
    { role: RepositoryRole.Documentation, name: 'caretrack-docs', stack: 'Markdown' },
  ],
  links: [],
  screenshots: [],
};
