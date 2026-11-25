import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { PROJECT_FILTER_OPTIONS } from '../../../constants/projects/project-filters.constants';
import { APP_ICONS } from '../../../constants/ui/icons.constants';
import { ProjectService } from '../../../services/projects/project/project.service';
import { ProjectsSectionComponent } from './projects-section.component';

describe('ProjectsSectionComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsSectionComponent],
      providers: [provideRouter([]), provideIcons(APP_ICONS)],
    }).compileComponents();
  });

  const render = async () => {
    const fixture = TestBed.createComponent(ProjectsSectionComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    return {
      fixture,
      tabs: () => [...element.querySelectorAll<HTMLButtonElement>('[role="tab"]')],
      cards: () => element.querySelectorAll('app-project-card').length,
      highlight: () => element.querySelector<HTMLElement>('.tab-highlight')!,
    };
  };

  const countFor = (index: number) =>
    TestBed.inject(ProjectService).findByTier(PROJECT_FILTER_OPTIONS[index].tier).length;

  it('starts on the first filter with only its cards in the page', async () => {
    const { tabs, cards } = await render();
    expect(tabs()[0].getAttribute('aria-selected')).toBe('true');
    expect(cards()).toBe(countFor(0));
  });

  it('shows only the chosen filter cards, and re-creates them on every switch', async () => {
    const { fixture, tabs, cards } = await render();

    tabs()[1].click();
    await fixture.whenStable();
    expect(tabs()[1].getAttribute('aria-selected')).toBe('true');
    expect(cards()).toBe(countFor(1));

    tabs()[0].click();
    await fixture.whenStable();
    expect(cards()).toBe(countFor(0));
  });

  it('places the highlight behind the active tab', async () => {
    const { highlight } = await render();
    expect(highlight().classList.contains('is-ready')).toBe(true);
    expect(highlight().style.getPropertyValue('--highlight-left')).toMatch(/px$/);
    expect(highlight().style.getPropertyValue('--highlight-right')).toMatch(/px$/);
  });
});
