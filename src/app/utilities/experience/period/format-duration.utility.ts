import { MONTHS_PER_YEAR, PERIOD_TEXT } from '../../../constants/experience/experience-labels.constants';
import { YearMonth } from '../../../interfaces/experience/year-month.interface';

const toMonthIndex = ({ year, month }: YearMonth): number => year * MONTHS_PER_YEAR + month;

const plural = (count: number, one: string, many: string): string => `${count} ${count === 1 ? one : many}`;

/**
 * Months elapsed between the start and end month, e.g. "1 yr" for Sep 2024 – Sep 2025 and "3 mos" for
 * Oct 2023 – Jan 2024. An ongoing period (`end` is null) runs to `today`; a period shorter than a month
 * counts as one month; a single date (no `end`) has no duration.
 */
export function formatDuration(start: YearMonth, end: YearMonth | null | undefined, today: YearMonth): string | null {
  if (end === undefined) {
    return null;
  }
  const elapsed = toMonthIndex(end ?? today) - toMonthIndex(start);
  if (elapsed < 0) {
    return null;
  }
  const months = Math.max(1, elapsed);
  const years = Math.floor(months / MONTHS_PER_YEAR);
  const remainder = months % MONTHS_PER_YEAR;
  const parts = [
    years > 0 ? plural(years, PERIOD_TEXT.year, PERIOD_TEXT.years) : '',
    remainder > 0 ? plural(remainder, PERIOD_TEXT.month, PERIOD_TEXT.months) : '',
  ];
  return parts.filter(Boolean).join(' ');
}
