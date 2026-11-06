import { ExperienceKind } from '../../enums/experience/experience-kind.enum';
import { YearMonth } from './year-month.interface';

export interface ExperienceEntry {
  id: string;
  kind: ExperienceKind;
  title: string;
  organization: string;
  location: string;
  start: YearMonth;
  /** Omitted for a single date (a certificate); `null` while the role is ongoing. */
  end?: YearMonth | null;
  summary: string;
  /** What I did there, one item per line. */
  achievements: readonly string[];
  skills: readonly string[];
  /** Slugs of portfolio projects built during this period. */
  projectSlugs?: readonly string[];
}
