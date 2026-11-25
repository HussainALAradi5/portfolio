import { ExperienceKind } from '../../enums/experience/experience-kind.enum';
import { ExperienceEntry } from '../../interfaces/experience/experience-entry.interface';

const BAHRAIN = 'Bahrain';
const ONLINE = 'Online';
const UDEMY = 'Udemy';
const UDEMY_CERTIFICATE_URL = 'https://www.udemy.com/certificate';

/**
 * Career timeline, oldest first, as it reads left to right on the horizontal timeline.
 * Titles, dates and lines are copied from the CV in public/files/cv; keep the two in step.
 */
export const EXPERIENCE: readonly ExperienceEntry[] = [
  {
    id: 'uob-bsc-software-engineering',
    kind: ExperienceKind.Education,
    title: 'BSc. Software Engineering',
    organization: 'University of Bahrain',
    location: BAHRAIN,
    start: { year: 2017, month: 2 },
    end: { year: 2024, month: 2 },
    achievements: [
      'Capstone project: Ehsebha, a cloud-based mobile Point of Sale system for reservation management and streamlined POS operations.',
    ],
    skills: ['React Native', 'Express', 'MongoDB'],
  },
  {
    id: 'uob-trainee',
    kind: ExperienceKind.Work,
    title: 'Trainee',
    organization: 'University of Bahrain',
    location: BAHRAIN,
    start: { year: 2023, month: 10 },
    end: { year: 2024, month: 1 },
    achievements: [
      'Developed a Python automation script to extract WhatsApp group participants and phone numbers into Excel sheets with a single click.',
      'Gained proficiency in Python libraries for digitalization and workflow automation.',
      'Used Photoshop to design promotional posters for marketing efforts.',
    ],
    skills: ['Python', 'Excel', 'Photoshop'],
  },
  {
    id: 'general-assembly-sei',
    kind: ExperienceKind.Certification,
    title: 'Software Engineering Immersive',
    organization: 'General Assembly',
    location: BAHRAIN,
    start: { year: 2024, month: 3 },
    end: { year: 2024, month: 6 },
    achievements: ['Graduation Certificate.'],
    skills: [],
  },
  {
    id: 'open-inside-odoo-developer',
    kind: ExperienceKind.Work,
    title: 'Odoo Developer',
    organization: 'Open-Inside',
    location: BAHRAIN,
    start: { year: 2024, month: 9 },
    end: { year: 2025, month: 9 },
    achievements: [
      'Developed and customized Odoo modules to meet client-specific business requirements.',
      'Integrated third-party APIs into the Odoo ecosystem, extending platform functionality.',
    ],
    skills: ['Odoo', 'Third-party APIs'],
  },
  {
    id: 'safeway-software-engineer',
    kind: ExperienceKind.Work,
    title: 'Software Engineer',
    organization: 'Safeway Express Cargo Logistic',
    location: BAHRAIN,
    start: { year: 2025, month: 11 },
    end: null,
    achievements: [
      'Developing and maintaining full-stack features using Next.js and ASP.NET (C#).',
      'Building responsive, high-performance web interfaces and RESTful backend services.',
    ],
    skills: ['Next.js', 'ASP.NET', 'C#', 'REST APIs'],
  },
  {
    // Courses finished in the same month on the same platform share one timeline stop.
    id: 'udemy-certificates-2026-11',
    kind: ExperienceKind.Certification,
    title: 'Certificates',
    organization: UDEMY,
    location: ONLINE,
    start: { year: 2026, month: 11 },
    achievements: [
      'Mastering Odoo Development: Technical Fundamentals: Certificate of Completion.',
      'Complete Modern PHP 8 Bootcamp: Certificate of Completion.',
      'Ultimate C# Masterclass: Certificate of Completion.',
      'Laravel & PHP Mastery: Build 5 Real-World Projects: Certificate of Completion.',
    ],
    skills: ['Odoo', 'PHP', 'C#', 'Laravel'],
    credentials: [
      {
        label: 'Verify the Odoo certificate',
        url: `${UDEMY_CERTIFICATE_URL}/UC-13482a0a-ce3e-479f-bd0c-c7d15e2b9aa0/`,
      },
      {
        label: 'Verify the PHP 8 certificate',
        url: `${UDEMY_CERTIFICATE_URL}/UC-b8585c6d-6092-4bff-bd8a-798f29b20a9f/`,
      },
      {
        label: 'Verify the C# certificate',
        url: `${UDEMY_CERTIFICATE_URL}/UC-dc602440-8a50-4b0f-91f2-f7addba5b536/`,
      },
      {
        label: 'Verify the Laravel certificate',
        url: `${UDEMY_CERTIFICATE_URL}/UC-970e8f20-4837-408b-a184-aed9954ec2c8/`,
      },
    ],
  },
];
