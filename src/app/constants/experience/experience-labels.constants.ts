import { ExperienceKind } from '../../enums/experience/experience-kind.enum';
import { ExperienceKindStyle } from '../../interfaces/experience/experience-kind-style.interface';

export const EXPERIENCE_KIND_STYLES: Record<ExperienceKind, ExperienceKindStyle> = {
  [ExperienceKind.Work]: { label: 'Work', icon: 'lucideBriefcase' },
  [ExperienceKind.Education]: { label: 'Education', icon: 'lucideGraduationCap' },
  [ExperienceKind.Certification]: { label: 'Certificate', icon: 'lucideAward' },
};

export const MONTH_SHORT_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

export const MONTHS_PER_YEAR = 12;

export const PERIOD_TEXT = {
  present: 'Present',
  now: 'Now',
  separator: ' – ',
  year: 'yr',
  years: 'yrs',
  month: 'mo',
  months: 'mos',
} as const;
