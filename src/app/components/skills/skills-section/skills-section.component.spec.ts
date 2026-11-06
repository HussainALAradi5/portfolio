import { TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import { SKILL_GROUPS } from '../../../constants/skills/skills.constants';
import { APP_ICONS } from '../../../constants/ui/icons.constants';
import { SkillsSectionComponent } from './skills-section.component';

describe('SkillsSectionComponent', () => {
  it('renders every group and skill, with notes such as language levels', async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsSectionComponent],
      providers: [provideIcons(APP_ICONS)],
    }).compileComponents();
    const fixture = TestBed.createComponent(SkillsSectionComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('article')).toHaveLength(SKILL_GROUPS.length);
    const skillCount = SKILL_GROUPS.reduce((total, group) => total + group.skills.length, 0);
    expect(element.querySelectorAll('li.skill')).toHaveLength(skillCount);
    expect(element.querySelector('article.is-core')?.textContent).toContain(SKILL_GROUPS[0].skills[0].name);
    expect(element.textContent).toContain('Native');
  });
});
