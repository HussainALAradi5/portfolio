import { ProjectStatus } from '../../../enums/projects/project-status.enum';
import { ProjectTier } from '../../../enums/projects/project-tier.enum';
import { RepositoryRole } from '../../../enums/projects/repository-role.enum';
import { TechLayer } from '../../../enums/projects/tech-layer.enum';
import { Project } from '../../../interfaces/projects/project.interface';
import { PROJECT_IMAGE_BASE } from '../project-paths.constants';

const IMAGES = `${PROJECT_IMAGE_BASE}/studium`;

export const STUDIUM_PROJECT: Project = {
  slug: 'studium',
  name: 'Studium',
  tagline: 'Stadium rentals by the hour or full day, with no double bookings',
  domain: 'Sports',
  icon: 'lucideTrophy',
  tier: ProjectTier.Flagship,
  status: ProjectStatus.Live,
  period: '2026',
  summary:
    'Customers rent football fields, courts and halls by the hour or for full days, see live availability and book without double ' +
    'bookings. Managers run their stadiums, payments and expenses; admins manage users, cities, settings and role permissions. ' +
    'Plain PHP 8.2 and MySQL with vanilla CSS and JavaScript, plus a documentation repository.',
  highlights: [
    'Hourly or full-day rentals with a locked, transactional overlap check that offers free alternatives on conflict.',
    'Booking lifecycle: request, confirm, reject, cancel with a cutoff, reschedule, complete and expiry.',
    'Payments and refunds ledger, expenses and accounting reports.',
    'Admin, manager and customer roles with an editable permission matrix and admin-tunable booking settings.',
    'In-app notifications with a bell, unread badge and inbox for every booking, payment and review event.',
    'Reviews: members-only comments, one rating per customer per stadium after playing there.',
    'Map location with Leaflet and OpenStreetMap, plus Google Maps links for directions.',
    'Dark and light mode, a wheel date picker in the style of iOS and Android, and a responsive layout.',
    'Unit test runner with no packages and an HTTP API test suite; live on InfinityFree’s free PHP and MySQL hosting.',
  ],
  tech: [
    { layer: TechLayer.Frontend, name: 'Vanilla JavaScript' },
    { layer: TechLayer.Frontend, name: 'CSS' },
    { layer: TechLayer.Frontend, name: 'Leaflet + OpenStreetMap' },
    { layer: TechLayer.Backend, name: 'PHP 8.2' },
    { layer: TechLayer.Backend, name: 'Apache' },
    { layer: TechLayer.Backend, name: 'PDO' },
    { layer: TechLayer.Data, name: 'MySQL' },
  ],
  repositories: [
    { role: RepositoryRole.Application, name: 'studium_reservation_management', stack: 'PHP' },
    { role: RepositoryRole.Documentation, name: 'studium_reservation_management_docs', stack: 'Markdown' },
  ],
  links: [{ label: 'Open web app', url: 'https://studium-bh.infinityfreeapp.com' }],
  // From the application repository's screenshots folder.
  screenshots: [
    { src: `${IMAGES}/01-landing-light.webp`, caption: 'Landing (light)' },
    { src: `${IMAGES}/02-stadium-guest-locked-dark.webp`, caption: 'Stadium page, booking locked for guests (dark)' },
    { src: `${IMAGES}/04-booking-signed-in-light.webp`, caption: 'Booking a slot (signed in)' },
    { src: `${IMAGES}/05-dashboard-notifications-dark.webp`, caption: 'Notifications (dark)' },
    { src: `${IMAGES}/03-stadiums-mobile-light.webp`, caption: 'Stadiums on a phone' },
  ],
};
