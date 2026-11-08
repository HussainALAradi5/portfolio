import { ProjectStatus } from '../../../enums/projects/project-status.enum';
import { ProjectTier } from '../../../enums/projects/project-tier.enum';
import { RepositoryRole } from '../../../enums/projects/repository-role.enum';
import { TechLayer } from '../../../enums/projects/tech-layer.enum';
import { Project } from '../../../interfaces/projects/project.interface';
import { PROJECT_IMAGE_BASE } from '../project-paths.constants';

const IMAGES = `${PROJECT_IMAGE_BASE}/e-clinic`;

export const E_CLINIC_PROJECT: Project = {
  slug: 'e-clinic',
  name: 'e-Clinic',
  tagline: 'Clinic management with a staff workspace, patient portal and Android app',
  domain: 'Healthcare',
  icon: 'lucideStethoscope',
  tier: ProjectTier.Flagship,
  status: ProjectStatus.Live,
  period: '2026',
  summary:
    'e-Clinic covers a whole clinic: patients and appointments, treatments, lab and imaging orders, prescriptions and the pharmacy, ' +
    'billing with insurance claims, cash sessions, HR and payroll, and double-entry accounting. One Angular app holds the staff workspace ' +
    'and the patient portal, and one Flutter app, available as an Android APK, serves both patients and staff.',
  highlights: [
    'Free-slot engine per provider and room that prevents double bookings, with check-in by signed QR code and reminders.',
    'Nine roles (patient, receptionist, doctor, nurse, pharmacist, cashier, accountant, HR, admin), each with its own pages, and server-driven lists with saved views and Excel import and export.',
    "Android app for patients (visits, booking, results, prescriptions, invoices) and staff (today's schedule, QR check-in, sessions, approvals, patient files, pharmacy queue).",
    "On the phone: biometric app lock, no screenshots in release builds on Android, and an encrypted offline copy of today's schedule that is wiped on sign-out.",
    'Visits and medical records with ICD-10 diagnoses, treatment plans, X-ray, lab and ECG orders with abnormal flags, and consents.',
    'Pharmacy dispensing first-expiry-first-out with barcode checks and a witness for controlled drugs, plus stock and expiry alerts.',
    'Billing with split payments, refunds and insurance claims, cash desk sessions and a double-entry journal with financial reports.',
    'HR with shifts, geofenced clock in and out, leave balances, and payroll with payslips.',
    'Live staff chat over websockets, support tickets and notifications in-app, by email, SMS and browser push, plus printable sick leave and X-ray reports.',
    'Two-factor sign-in, encrypted medical fields, an audit log, event logs on appointments and patient files, and idempotent payments.',
    'More than 300 Pest tests, PHPStan level 8, a role test report and GitHub Actions tests on every push for the server, web client and mobile app.',
    'Deployed on Render with a live demo of the web app and API; the Android app uses the same demo.',
  ],
  tech: [
    { layer: TechLayer.Frontend, name: 'Angular 21' },
    { layer: TechLayer.Frontend, name: 'Angular Material' },
    { layer: TechLayer.Frontend, name: 'Tailwind CSS' },
    { layer: TechLayer.Frontend, name: 'Signals' },
    { layer: TechLayer.Frontend, name: 'NgRx Signals' },
    { layer: TechLayer.Backend, name: 'Laravel 12' },
    { layer: TechLayer.Backend, name: 'PHP 8.2' },
    { layer: TechLayer.Backend, name: 'Laravel Reverb' },
    { layer: TechLayer.Backend, name: 'Pest' },
    { layer: TechLayer.Mobile, name: 'Flutter 3' },
    { layer: TechLayer.Mobile, name: 'Riverpod 3' },
    { layer: TechLayer.Mobile, name: 'go_router' },
    { layer: TechLayer.Mobile, name: 'Dio' },
    { layer: TechLayer.Mobile, name: 'freezed' },
    { layer: TechLayer.Data, name: 'PostgreSQL 16' },
    { layer: TechLayer.Security, name: 'Laravel Sanctum' },
    { layer: TechLayer.Security, name: 'spatie/laravel-permission' },
  ],
  repositories: [
    { role: RepositoryRole.Server, name: 'e_clinic_server', stack: 'Laravel' },
    { role: RepositoryRole.Client, name: 'e_clinic_client', stack: 'Angular' },
    { role: RepositoryRole.Mobile, name: 'e_clinic_mobile', stack: 'Flutter' },
    {
      role: RepositoryRole.Documentation,
      name: 'e_clinic_documentation',
      stack: 'Markdown',
      isPrivate: true,
    },
  ],
  links: [
    { label: 'Open web app', url: 'https://e-clinic-web.onrender.com' },
    {
      label: 'Download Android app',
      url: 'https://github.com/HussainALAradi5/e_clinic_mobile/raw/main/releases/android/e-clinic-1.0.0-arm64.apk',
    },
    { label: 'API', url: 'https://e-clinic-api.onrender.com' },
  ],
  screenshots: [
    { src: `${IMAGES}/admin-dashboard.webp`, caption: 'Admin dashboard' },
    { src: `${IMAGES}/doctor-visit.webp`, caption: 'Doctor visit' },
    { src: `${IMAGES}/patient-portal.webp`, caption: 'Patient portal' },
    { src: `${IMAGES}/journal.webp`, caption: 'Accounting journal (dark)' },
    { src: `${IMAGES}/landing.webp`, caption: 'Public website' },
    { src: `${IMAGES}/appointments.webp`, caption: 'Appointments with filters (dark)' },
    { src: `${IMAGES}/invoice.webp`, caption: 'Invoice with insurance cover' },
    { src: `${IMAGES}/mobile-today.webp`, caption: "Android app: today's clinic schedule" },
    {
      src: `${IMAGES}/mobile-appointment.webp`,
      caption: 'Android app: appointment and event log (dark)',
    },
    { src: `${IMAGES}/mobile-patient-file.webp`, caption: 'Android app: patient file' },
  ],
};
