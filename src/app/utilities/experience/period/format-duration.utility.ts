import { MONTHS_PER_YEAR, PERIOD_TEXT } from '../../../constants/experience/experience-labels.constants';
import { YearMonth } from '../../../interfaces/experience/year-month.interface';

const toMonthIndex = ({ year, month }: YearMonth): number => year * MONTHS_PER_YEAR + month;

const plural = (count: number, one: string, many: string): string => `${count} ${count === 1 ? one : many}`;

/**
 * Length of a period counting both the first and last month, e.g. "1 yr 1 mo" for Sep 2024 – Sep 2025.
 * An ongoing period (`end` is null) runs to `today`; a single date (no `end`) has no duration.
 */
export function formatDuration(start: YearMonth, end: YearMonth | null | undefined, today: YearMonth): string | null {
  if (end === undefined) {
    return null;
  }
  const months = toMonthIndex(end ?? today) - toMonthIndex(start) + 1;
  if (months <= 0) {
    return null;
  }
  const years = Math.floor(months / MONTHS_PER_YEAR);
  const remainder = months % MONTHS_PER_YEAR;
  const parts = [
    years > 0 ? plural(years, PERIOD_TEXT.year, PERIOD_TEXT.years) : '',
    remainder > 0 ? plural(remainder, PERIOD_TEXT.month, PERIOD_TEXT.months) : '',
  ];
  return parts.filter(Boolean).join(' ');
}
