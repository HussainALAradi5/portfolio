import { TestBed } from '@angular/core/testing';
import { DARK_THEME_CLASS, THEME_STORAGE_KEY } from '../../../constants/ui/theme.constants';
import { ThemeMode } from '../../../enums/ui/theme-mode.enum';
import { ThemeService } from './theme.service';

/** In-memory storage, so the test does not depend on the runtime's localStorage (Node 25 replaces jsdom's). */
function installMemoryStorage(initial: Record<string, string> = {}): Map<string, string> {
  const values = new Map(Object.entries(initial));
  const storage = {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => void values.set(key, value),
    removeItem: (key: string) => void values.delete(key),
  };
  Object.defineProperty(window, 'localStorage', { value: storage, configurable: true });
  return values;
}

describe('ThemeService', () => {
  beforeEach(() => {
    document.documentElement.classList.remove(DARK_THEME_CLASS);
  });

  it('starts from the stored mode', () => {
    installMemoryStorage({ [THEME_STORAGE_KEY]: ThemeMode.Dark });
    expect(TestBed.inject(ThemeService).mode()).toBe(ThemeMode.Dark);
  });

  it('toggles, applies the dark class and stores the choice', () => {
    const stored = installMemoryStorage({ [THEME_STORAGE_KEY]: ThemeMode.Light });
    const service = TestBed.inject(ThemeService);

    service.toggle();
    TestBed.tick();

    expect(service.mode()).toBe(ThemeMode.Dark);
    expect(document.documentElement.classList.contains(DARK_THEME_CLASS)).toBe(true);
    expect(stored.get(THEME_STORAGE_KEY)).toBe(ThemeMode.Dark);
  });

  it('ignores an unknown stored value', () => {
    installMemoryStorage({ [THEME_STORAGE_KEY]: 'purple' });
    expect([ThemeMode.Light, ThemeMode.Dark]).toContain(TestBed.inject(ThemeService).mode());
  });
});
