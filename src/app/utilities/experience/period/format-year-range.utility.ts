import { PERIOD_TEXT } from '../../../constants/experience/experience-labels.constants';
import { YearMonth } from '../../../interfaces/experience/year-month.interface';

/** Short label for a timeline stop: "2017 – 2024", "2025 – Now", or "2024" for a single year. */
export function formatYearRange(start: YearMonth, end: YearMonth | null | undefined): string {
  const endYear = end === null ? PERIOD_TEXT.now : end?.year;
  if (endYear === undefined || endYear === start.year) {
    return `${start.year}`;
  }
  return `${start.year}${PERIOD_TEXT.separator}${endYear}`;
}
