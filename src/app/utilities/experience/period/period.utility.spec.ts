import { formatDuration } from './format-duration.utility';
import { formatPeriod } from './format-period.utility';

describe('experience period', () => {
  const sep2024 = { year: 2024, month: 9 };
  const sep2025 = { year: 2025, month: 9 };
  const today = { year: 2026, month: 11 };

  it('formats a closed, ongoing and single-date period', () => {
    expect(formatPeriod(sep2024, sep2025)).toBe('Sep 2024 – Sep 2025');
    expect(formatPeriod(sep2025, null)).toBe('Sep 2025 – Present');
    expect(formatPeriod({ year: 2024, month: 11 }, undefined)).toBe('Nov 2024');
  });

  it('counts the months elapsed between start and end', () => {
    expect(formatDuration(sep2024, sep2025, today)).toBe('1 yr');
    expect(formatDuration({ year: 2023, month: 10 }, { year: 2024, month: 1 }, today)).toBe('3 mos');
    expect(formatDuration({ year: 2017, month: 2 }, { year: 2024, month: 2 }, today)).toBe('7 yrs');
    expect(formatDuration({ year: 2024, month: 1 }, { year: 2025, month: 3 }, today)).toBe('1 yr 2 mos');
  });

  it('runs an ongoing period up to today', () => {
    expect(formatDuration({ year: 2025, month: 11 }, null, today)).toBe('1 yr');
    expect(formatDuration(sep2025, null, today)).toBe('1 yr 2 mos');
  });

  it('counts a period that started this month as one month', () => {
    expect(formatDuration(today, null, today)).toBe('1 mo');
  });

  it('gives a single date no duration', () => {
    expect(formatDuration(sep2025, undefined, today)).toBeNull();
  });
});
