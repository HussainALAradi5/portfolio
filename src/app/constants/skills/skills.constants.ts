import { SkillGroup } from '../../interfaces/skills/skill-group.interface';

/** The CV's Skills section, in the CV's order and wording; keep the two in step. */
export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    id: 'core',
    title: 'Core strengths',
    icon: 'lucideStar',
    isCore: true,
    skills: [{ name: 'C# / ASP.NET' }, { name: 'Java / Spring Boot' }],
  },
  {
    id: 'languages',
    title: 'Also familiar with',
    icon: 'lucideCode',
    skills: [
      { name: 'JavaScript / TypeScript' },
      { name: 'Python' },
      { name: 'Java' },
      { name: 'C++' },
      { name: 'Go' },
      { name: 'PHP' },
    ],
  },
  {
    id: 'frameworks',
    title: 'Frameworks',
    icon: 'lucideLayers',
    skills: [
      { name: 'Next.js' },
      { name: 'React / React Native' },
      { name: 'Flutter' },
      { name: 'Angular' },
      { name: 'Laravel' },
      { name: 'Express' },
      { name: 'Flask' },
      { name: 'Odoo' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    icon: 'lucideDatabase',
    skills: [{ name: 'PostgreSQL' }, { name: 'MySQL' }, { name: 'Oracle' }, { name: 'MongoDB' }],
  },
  {
    id: 'tools',
    title: 'Tools & other',
    icon: 'lucideWrench',
    skills: [{ name: 'Node.js' }, { name: 'HTML / CSS' }, { name: 'UML' }, { name: 'Git' }],
  },
  {
    id: 'spoken',
    title: 'Spoken languages',
    icon: 'lucideLanguages',
    skills: [
      { name: 'Arabic', note: 'Native' },
      { name: 'English', note: 'Fluent' },
    ],
  },
];
