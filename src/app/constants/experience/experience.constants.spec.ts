import { ExperienceKind } from '../../enums/experience/experience-kind.enum';
import { MONTHS_PER_YEAR } from './experience-labels.constants';
import { EXPERIENCE } from './experience.constants';

describe('experience data', () => {
  it('lists entries oldest first', () => {
    const starts = EXPERIENCE.map(({ start }) => start.year * MONTHS_PER_YEAR + start.month);
    expect(starts).toEqual([...starts].sort((a, b) => a - b));
  });

  it('says what I did in every entry', () => {
    expect(EXPERIENCE.every((entry) => entry.achievements.length > 0)).toBe(true);
  });

  it('links certificates only, over https', () => {
    const linked = EXPERIENCE.filter((entry) => entry.credentialUrl);
    expect(linked.length).toBeGreaterThan(0);
    expect(linked.every((entry) => entry.kind === ExperienceKind.Certification)).toBe(true);
    expect(linked.every((entry) => entry.credentialUrl?.startsWith('https://'))).toBe(true);
  });

  it('has unique ids and at most one ongoing role', () => {
    expect(new Set(EXPERIENCE.map((entry) => entry.id)).size).toBe(EXPERIENCE.length);
    expect(EXPERIENCE.filter((entry) => entry.end === null).length).toBeLessThanOrEqual(1);
  });
});
