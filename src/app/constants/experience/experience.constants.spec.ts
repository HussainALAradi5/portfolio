import { MONTHS_PER_YEAR } from './experience-labels.constants';
import { EXPERIENCE } from './experience.constants';

describe('experience data', () => {
  it('lists entries by when they ended, ongoing first', () => {
    const lastMonths = EXPERIENCE.map(({ start, end }) => {
      const last = end === null ? { year: Infinity, month: 0 } : (end ?? start);
      return last.year * MONTHS_PER_YEAR + last.month;
    });
    expect(lastMonths).toEqual([...lastMonths].sort((a, b) => b - a));
  });

  it('says what I did in every entry', () => {
    expect(EXPERIENCE.every((entry) => entry.achievements.length > 0)).toBe(true);
  });

  it('has unique ids and at most one ongoing role', () => {
    expect(new Set(EXPERIENCE.map((entry) => entry.id)).size).toBe(EXPERIENCE.length);
    expect(EXPERIENCE.filter((entry) => entry.end === null).length).toBeLessThanOrEqual(1);
  });
});
