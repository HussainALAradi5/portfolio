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
    const linked = EXPERIENCE.filter((entry) => entry.credentials?.length);
    expect(linked.length).toBeGreaterThan(0);
    expect(linked.every((entry) => entry.kind === ExperienceKind.Certification)).toBe(true);
    const urls = linked.flatMap((entry) => entry.credentials ?? []).map(({ url }) => url);
    expect(urls.every((url) => url.startsWith('https://'))).toBe(true);
  });

  it('groups certificates from one organization in the same month into one stop', () => {
    const certificateDates = EXPERIENCE.filter(
      (entry) => entry.kind === ExperienceKind.Certification,
    ).map(({ organization, start }) => `${organization} ${start.year}-${start.month}`);
    expect(new Set(certificateDates).size).toBe(certificateDates.length);
  });

  it('has unique ids and at most one ongoing role', () => {
    expect(new Set(EXPERIENCE.map((entry) => entry.id)).size).toBe(EXPERIENCE.length);
    expect(EXPERIENCE.filter((entry) => entry.end === null).length).toBeLessThanOrEqual(1);
  });
});
