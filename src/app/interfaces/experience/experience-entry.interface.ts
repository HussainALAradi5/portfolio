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
  /** What I did there, one CV line per item. */
  achievements: readonly string[];
  /** Technologies named in those lines; may be empty. */
  skills: readonly string[];
}
