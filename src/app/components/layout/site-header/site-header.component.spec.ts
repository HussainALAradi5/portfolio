import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { UI_TEXT } from '../../../constants/common/ui-text.constants';
import { ROUTE_PATHS } from '../../../constants/routes/route-paths.constants';
import { APP_ICONS } from '../../../constants/ui/icons.constants';
import { ThemeMode } from '../../../enums/ui/theme-mode.enum';
import { CommandPaletteService } from '../../../services/ui/command-palette/command-palette.service';
import { ThemeService } from '../../../services/ui/theme/theme.service';
import { SiteHeaderComponent } from './site-header.component';

describe('SiteHeaderComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteHeaderComponent],
      providers: [provideRouter([]), provideIcons(APP_ICONS)],
    }).compileComponents();
  });

  const render = async () => {
    const fixture = TestBed.createComponent(SiteHeaderComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const byLabel = (label: string) => element.querySelector<HTMLButtonElement>(`button[aria-label="${label}"]`)!;
    return {
      fixture,
      navLinks: () => [...element.querySelectorAll<HTMLAnchorElement>('nav a')],
      searchButton: () => byLabel(UI_TEXT.palette.openLabel),
      themeButton: () => byLabel(UI_TEXT.nav.toggleTheme),
    };
  };

  it('links to every page', async () => {
    const { navLinks } = await render();
    expect(navLinks().map((link) => link.getAttribute('href'))).toEqual([
      `/${ROUTE_PATHS.projects}`,
      `/${ROUTE_PATHS.experience}`,
      `/${ROUTE_PATHS.skills}`,
    ]);
    expect(navLinks().map((link) => link.textContent?.trim())).toEqual([
      UI_TEXT.nav.projects,
      UI_TEXT.nav.experience,
      UI_TEXT.nav.skills,
    ]);
  });

  it('opens the search palette', async () => {
    const { searchButton } = await render();
    const palette = TestBed.inject(CommandPaletteService);

    searchButton().click();

    expect(palette.isOpen()).toBe(true);
  });

  it('switches the theme and says whether dark mode is on', async () => {
    const theme = TestBed.inject(ThemeService);
    theme.mode.set(ThemeMode.Light);
    const { fixture, themeButton } = await render();
    expect(themeButton().getAttribute('aria-pressed')).toBe('false');

    themeButton().click();
    await fixture.whenStable();
    expect(theme.mode()).toBe(ThemeMode.Dark);
    expect(themeButton().getAttribute('aria-pressed')).toBe('true');

    themeButton().click();
    await fixture.whenStable();
    expect(theme.mode()).toBe(ThemeMode.Light);
    expect(themeButton().getAttribute('aria-pressed')).toBe('false');
  });

  it('shows the sun in dark mode and the moon in light mode, one at a time', async () => {
    const theme = TestBed.inject(ThemeService);
    theme.mode.set(ThemeMode.Dark);
    const { fixture, themeButton } = await render();
    // The template renders the sun first and the moon second.
    const shownIndex = () =>
      [...themeButton().querySelectorAll('.theme-icon')].findIndex((icon) => icon.classList.contains('is-shown'));
    const shownCount = () => themeButton().querySelectorAll('.theme-icon.is-shown').length;

    expect(shownIndex()).toBe(0);
    expect(shownCount()).toBe(1);

    themeButton().click();
    await fixture.whenStable();

    expect(shownIndex()).toBe(1);
    expect(shownCount()).toBe(1);
  });
});
