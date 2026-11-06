import { MONTH_SHORT_NAMES, PERIOD_TEXT } from '../../../constants/experience/experience-labels.constants';
import { YearMonth } from '../../../interfaces/experience/year-month.interface';

const formatYearMonth = ({ year, month }: YearMonth): string => `${MONTH_SHORT_NAMES[month - 1]} ${year}`;

/** "Sep 2024 – Sep 2025", "Sep 2025 – Present", or a single "Nov 2024" when there is no end. */
export function formatPeriod(start: YearMonth, end: YearMonth | null | undefined): string {
  if (end === undefined) {
    return formatYearMonth(start);
  }
  const endLabel = end === null ? PERIOD_TEXT.present : formatYearMonth(end);
  return `${formatYearMonth(start)}${PERIOD_TEXT.separator}${endLabel}`;
}
