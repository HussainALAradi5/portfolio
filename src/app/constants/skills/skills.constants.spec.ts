import { SKILL_GROUPS } from './skills.constants';

describe('skills data', () => {
  it('starts with the core strengths and has exactly one core group', () => {
    expect(SKILL_GROUPS[0].isCore).toBe(true);
    expect(SKILL_GROUPS.filter((group) => group.isCore)).toHaveLength(1);
  });

  it('has unique group ids and no empty or repeated skills in a group', () => {
    expect(new Set(SKILL_GROUPS.map((group) => group.id)).size).toBe(SKILL_GROUPS.length);
    for (const group of SKILL_GROUPS) {
      const names = group.skills.map((skill) => skill.name);
      expect(names.length).toBeGreaterThan(0);
      expect(new Set(names).size).toBe(names.length);
    }
  });
});
