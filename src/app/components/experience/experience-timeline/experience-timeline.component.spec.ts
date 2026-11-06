import { TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import { EXPERIENCE } from '../../../constants/experience/experience.constants';
import { KEY } from '../../../constants/ui/keyboard.constants';
import { APP_ICONS } from '../../../constants/ui/icons.constants';
import { ExperienceTimelineComponent } from './experience-timeline.component';

describe('ExperienceTimelineComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceTimelineComponent],
      providers: [provideIcons(APP_ICONS)],
    }).compileComponents();
  });

  const render = async () => {
    const fixture = TestBed.createComponent(ExperienceTimelineComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const stops = () => [...element.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
    const detailsTitle = () => element.querySelector('[role="tabpanel"] h3')?.textContent?.trim();
    return { fixture, stops, detailsTitle };
  };

  it('shows one stop per entry and opens on the current role', async () => {
    const { stops, detailsTitle } = await render();
    const current = EXPERIENCE.findIndex((entry) => entry.end === null);
    expect(stops()).toHaveLength(EXPERIENCE.length);
    expect(stops()[current].getAttribute('aria-selected')).toBe('true');
    expect(detailsTitle()).toBe(EXPERIENCE[current].title);
  });

  it('shows the details of the stop that is clicked', async () => {
    const { fixture, stops, detailsTitle } = await render();
    stops()[0].click();
    await fixture.whenStable();
    expect(stops()[0].getAttribute('aria-selected')).toBe('true');
    expect(detailsTitle()).toBe(EXPERIENCE[0].title);
  });

  it('moves the selection with the arrow, Home and End keys', async () => {
    const { fixture, stops, detailsTitle } = await render();
    const tablist = (fixture.nativeElement as HTMLElement).querySelector('[role="tablist"]')!;
    const press = async (key: string) => {
      tablist.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
      await fixture.whenStable();
    };

    await press(KEY.home);
    expect(detailsTitle()).toBe(EXPERIENCE[0].title);
    await press(KEY.arrowRight);
    expect(detailsTitle()).toBe(EXPERIENCE[1].title);
    await press(KEY.end);
    expect(stops()[EXPERIENCE.length - 1].getAttribute('aria-selected')).toBe('true');
  });
});
