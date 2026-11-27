import { MONTH_SHORT_NAMES, MONTHS_PER_YEAR } from '../../../constants/experience/experience-labels.constants';

const YEAR_PATTERN = /\b(\d{4})\b/g;

const latestYear = (period: string): number | null => {
  const years = [...period.matchAll(YEAR_PATTERN)].map((match) => Number(match[1]));
  return years.length ? Math.max(...years) : null;
};

/**
 * A sortable number for a project's period text ("2026", "May 2024", "2024, rebuilt 2026"):
 * the latest year it names, and the month written before that year when there is one.
 */
export function projectDateKey(period: string): number {
  const year = latestYear(period);
  if (year === null) {
    return 0;
  }
  const monthIndex = MONTH_SHORT_NAMES.findIndex((name) => new RegExp(`\\b${name}\\w*\\s+${year}\\b`).test(period));
  return year * (MONTHS_PER_YEAR + 1) + (monthIndex + 1);
}

/** The latest year a period names, used as the timeline heading; empty when it names none. */
export function projectYear(period: string): string {
  const year = latestYear(period);
  return year === null ? '' : String(year);
}
