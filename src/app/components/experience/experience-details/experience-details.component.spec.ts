import { TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import { UI_TEXT } from '../../../constants/common/ui-text.constants';
import { APP_ICONS } from '../../../constants/ui/icons.constants';
import { ExperienceKind } from '../../../enums/experience/experience-kind.enum';
import { ExperienceEntry } from '../../../interfaces/experience/experience-entry.interface';
import { ExperienceDetailsComponent } from './experience-details.component';

const TODAY = { year: 2026, month: 11 };

const ROLE: ExperienceEntry = {
  id: 'role',
  kind: ExperienceKind.Work,
  title: 'Software Engineer',
  organization: 'Acme',
  location: 'Bahrain',
  start: { year: 2025, month: 11 },
  end: null,
  achievements: ['Built features.', 'Fixed bugs.'],
  skills: ['C#'],
};

const CERTIFICATES: ExperienceEntry = {
  id: 'certificates',
  kind: ExperienceKind.Certification,
  title: 'Certificates',
  organization: 'Udemy',
  location: 'Online',
  start: { year: 2026, month: 11 },
  achievements: ['Course A: Certificate of Completion.'],
  skills: [],
  credentials: [
    { label: 'Verify A', url: 'https://example.test/a/' },
    { label: 'Verify B', url: 'https://example.test/b/' },
  ],
};

describe('ExperienceDetailsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceDetailsComponent],
      providers: [provideIcons(APP_ICONS)],
    }).compileComponents();
  });

  const render = async (entry: ExperienceEntry) => {
    const fixture = TestBed.createComponent(ExperienceDetailsComponent);
    fixture.componentRef.setInput('entry', entry);
    fixture.componentRef.setInput('today', TODAY);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  };

  it('shows the role, its period, a Current badge and what I did', async () => {
    const element = await render(ROLE);
    expect(element.querySelector('h3')?.textContent?.trim()).toBe(ROLE.title);
    expect(element.textContent).toContain(ROLE.organization);
    expect(element.textContent).toContain('Nov 2025 – Present');
    expect(element.textContent).toContain(UI_TEXT.experience.current);
    expect([...element.querySelectorAll('li')].map((item) => item.textContent?.trim())).toEqual([...ROLE.achievements]);
  });

  it('has no verify links when the entry has no credentials', async () => {
    const element = await render(ROLE);
    expect(element.querySelectorAll('a')).toHaveLength(0);
  });

  it('opens each certificate check in a new tab', async () => {
    const element = await render(CERTIFICATES);
    const links = [...element.querySelectorAll('a')];

    expect(links.map((link) => link.textContent?.trim())).toEqual(['Verify A', 'Verify B']);
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      'https://example.test/a/',
      'https://example.test/b/',
    ]);
    expect(links.every((link) => link.target === '_blank' && link.rel === 'noopener')).toBe(true);
    expect(element.textContent).not.toContain(UI_TEXT.experience.current);
  });
});
