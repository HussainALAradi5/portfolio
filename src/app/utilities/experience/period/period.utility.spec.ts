import { formatDuration } from './format-duration.utility';
import { formatPeriod } from './format-period.utility';
import { formatYearRange } from './format-year-range.utility';

describe('experience period', () => {
  const sep2024 = { year: 2024, month: 9 };
  const sep2025 = { year: 2025, month: 9 };
  const today = { year: 2026, month: 11 };

  it('formats a closed, ongoing and single-date period', () => {
    expect(formatPeriod(sep2024, sep2025)).toBe('Sep 2024 – Sep 2025');
    expect(formatPeriod(sep2025, null)).toBe('Sep 2025 – Present');
    expect(formatPeriod({ year: 2024, month: 11 }, undefined)).toBe('Nov 2024');
  });

  it('counts both the first and the last month', () => {
    expect(formatDuration(sep2024, sep2025, today)).toBe('1 yr 1 mo');
    expect(formatDuration({ year: 2023, month: 10 }, { year: 2024, month: 1 }, today)).toBe('4 mos');
    expect(formatDuration({ year: 2017, month: 2 }, { year: 2024, month: 1 }, today)).toBe('7 yrs');
  });

  it('runs an ongoing period up to today', () => {
    expect(formatDuration(sep2025, null, today)).toBe('1 yr 3 mos');
  });

  it('gives a single date no duration', () => {
    expect(formatDuration(sep2025, undefined, today)).toBeNull();
  });

  it('gives each timeline stop a short year range', () => {
    expect(formatYearRange({ year: 2017, month: 2 }, { year: 2024, month: 2 })).toBe('2017 – 2024');
    expect(formatYearRange(sep2025, null)).toBe('2025 – Now');
    expect(formatYearRange({ year: 2023, month: 10 }, { year: 2023, month: 12 })).toBe('2023');
    expect(formatYearRange({ year: 2024, month: 11 }, undefined)).toBe('2024');
  });
});
