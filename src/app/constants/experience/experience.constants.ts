import { ExperienceKind } from '../../enums/experience/experience-kind.enum';
import { ExperienceEntry } from '../../interfaces/experience/experience-entry.interface';

const BAHRAIN = 'Bahrain';

/** Career timeline, ordered by when each entry ended (ongoing first). Content follows the CV. */
export const EXPERIENCE: readonly ExperienceEntry[] = [
  {
    id: 'safeway-software-engineer',
    kind: ExperienceKind.Work,
    title: 'Software Engineer',
    organization: 'Safeway Express Cargo Logistic',
    location: BAHRAIN,
    start: { year: 2025, month: 9 },
    end: null,
    summary: 'Full-stack web development with Next.js on the front end and ASP.NET on the back end.',
    achievements: [
      'Develop and maintain full-stack features using Next.js and ASP.NET (C#).',
      'Build responsive, high-performance web interfaces and RESTful backend services.',
    ],
    skills: ['Next.js', 'React', 'ASP.NET', 'C#', 'REST APIs'],
  },
  {
    id: 'open-inside-odoo-developer',
    kind: ExperienceKind.Work,
    title: 'Odoo Developer',
    organization: 'Open-Inside',
    location: BAHRAIN,
    start: { year: 2024, month: 9 },
    end: { year: 2025, month: 9 },
    summary: 'Odoo ERP customisation and integrations for client businesses.',
    achievements: [
      'Developed and customised Odoo modules to meet client-specific business requirements.',
      'Integrated third-party APIs into the Odoo ecosystem, extending platform functionality.',
    ],
    skills: ['Odoo', 'Python', 'API integration'],
  },
  {
    id: 'general-assembly-sei',
    kind: ExperienceKind.Certification,
    title: 'Software Engineering Immersive',
    organization: 'General Assembly',
    location: BAHRAIN,
    start: { year: 2024, month: 11 },
    summary: 'Full-time immersive bootcamp, graduated with the Software Engineering Immersive certificate.',
    achievements: [
      'Built full-stack apps across JavaScript, Node.js and Express, MongoDB, React, Python with Flask and Django, Vue and SQL.',
      'Shipped Duck Street, my first project: a browser game in plain JavaScript, HTML and CSS.',
    ],
    skills: ['JavaScript', 'Node.js', 'Express', 'MongoDB', 'React', 'Python', 'Django', 'Vue'],
    projectSlugs: ['duck-street'],
  },
  {
    id: 'uob-bsc-software-engineering',
    kind: ExperienceKind.Education,
    title: 'BSc. Software Engineering',
    organization: 'University of Bahrain',
    location: BAHRAIN,
    start: { year: 2017, month: 2 },
    end: { year: 2024, month: 2 },
    summary: 'Bachelor’s degree in Software Engineering.',
    achievements: [
      'Capstone project: Ehsebha, a cloud-based mobile point-of-sale system for reservation management, built with React Native, Express and MongoDB.',
    ],
    skills: ['Software engineering', 'UML', 'React Native', 'Express', 'MongoDB'],
  },
  {
    id: 'uob-trainee',
    kind: ExperienceKind.Work,
    title: 'Trainee',
    organization: 'University of Bahrain',
    location: BAHRAIN,
    start: { year: 2023, month: 10 },
    end: { year: 2024, month: 1 },
    summary: 'Internship focused on automation and digital workflows.',
    achievements: [
      'Developed a Python automation script that extracts WhatsApp group participants and phone numbers into Excel sheets with a single click.',
      'Gained proficiency in Python libraries for digitalisation and workflow automation.',
      'Designed promotional posters in Photoshop for marketing efforts.',
    ],
    skills: ['Python', 'Automation', 'Excel', 'Photoshop'],
  },
];
