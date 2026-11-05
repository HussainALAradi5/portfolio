import { ProjectStatus } from '../../../enums/projects/project-status.enum';
import { ProjectTier } from '../../../enums/projects/project-tier.enum';
import { RepositoryRole } from '../../../enums/projects/repository-role.enum';
import { TechLayer } from '../../../enums/projects/tech-layer.enum';
import { Project } from '../../../interfaces/projects/project.interface';
import { GITHUB_BASE_URL, PROJECT_IMAGE_BASE } from '../project-paths.constants';

const IMAGES = `${PROJECT_IMAGE_BASE}/e-clinic`;

export const E_CLINIC_PROJECT: Project = {
  slug: 'e-clinic',
  name: 'e-Clinic',
  tagline: 'Clinic management with a staff workspace and patient portal',
  domain: 'Healthcare',
  icon: 'lucideStethoscope',
  tier: ProjectTier.Flagship,
  status: ProjectStatus.Live,
  period: '2026',
  summary:
    'e-Clinic covers a whole clinic: patients and appointments, treatments, lab and imaging orders, prescriptions and the pharmacy, ' +
    'billing with insurance claims, cash sessions, HR and payroll, and double-entry accounting. One Angular app holds the staff workspace ' +
    'and the patient portal, and one Flutter app serves both patients and staff.',
  highlights: [
    'Free-slot engine per provider and room that prevents double bookings, with check-in by signed QR code and reminders.',
    'Nine roles (patient, receptionist, doctor, nurse, pharmacist, cashier, accountant, HR, admin), each with its own pages.',
    'Billing with insurance claims, cash desk sessions and a double-entry journal with financial reports.',
    'Staff chat, support tickets and notifications, plus printable sick leave and X-ray reports.',
    'Role test report and GitHub Actions tests on every push for the server, web client and mobile app.',
    'Deployed on Render with a live demo of the web app and API.',
  ],
  tech: [
    { layer: TechLayer.Frontend, name: 'Angular 21' },
    { layer: TechLayer.Frontend, name: 'Angular Material' },
    { layer: TechLayer.Frontend, name: 'Tailwind CSS' },
    { layer: TechLayer.Frontend, name: 'Signals' },
    { layer: TechLayer.Backend, name: 'Laravel 12' },
    { layer: TechLayer.Backend, name: 'PHP 8.2' },
    { layer: TechLayer.Mobile, name: 'Flutter 3' },
    { layer: TechLayer.Mobile, name: 'Riverpod' },
    { layer: TechLayer.Mobile, name: 'Dio' },
    { layer: TechLayer.Data, name: 'PostgreSQL 16' },
    { layer: TechLayer.Data, name: 'Redis' },
    { layer: TechLayer.Security, name: 'Laravel Sanctum' },
    { layer: TechLayer.Security, name: 'spatie/laravel-permission' },
  ],
  repositories: [
    { role: RepositoryRole.Server, name: 'e_clinic_server', stack: 'Laravel', url: `${GITHUB_BASE_URL}/e_clinic_server` },
    { role: RepositoryRole.Client, name: 'e_clinic_client', stack: 'Angular', url: `${GITHUB_BASE_URL}/e_clinic_client` },
    { role: RepositoryRole.Mobile, name: 'e_clinic_mobile', stack: 'Flutter', url: `${GITHUB_BASE_URL}/e_clinic_mobile` },
    { role: RepositoryRole.Documentation, name: 'e_clinic_documentation', stack: 'Markdown' },
  ],
  links: [
    { label: 'Open web app', url: 'https://e-clinic-web.onrender.com' },
    { label: 'API', url: 'https://e-clinic-api.onrender.com' },
  ],
  screenshots: [
    { src: `${IMAGES}/admin-dashboard.png`, caption: 'Admin dashboard' },
    { src: `${IMAGES}/doctor-visit.png`, caption: 'Doctor visit' },
    { src: `${IMAGES}/patient-portal.png`, caption: 'Patient portal' },
    { src: `${IMAGES}/journal.png`, caption: 'Accounting journal (dark)' },
  ],
};
