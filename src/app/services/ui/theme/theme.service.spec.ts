import { TestBed } from '@angular/core/testing';
import {
  DARK_THEME_CLASS,
  THEME_REVEAL_X_VAR,
  THEME_REVEAL_Y_VAR,
  THEME_STORAGE_KEY,
  THEME_TRANSITION_CLASS,
} from '../../../constants/ui/theme.constants';
import { REDUCED_MOTION_QUERY } from '../../../constants/ui/motion.constants';
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

  describe('switch animation', () => {
    let finish: () => void;
    let startViewTransition: ReturnType<typeof vi.fn>;

    /** Mimics the browser: runs the update at once and finishes when the test says so. */
    const installViewTransitions = (reducedMotion: boolean) => {
      startViewTransition = vi.fn((update: () => void) => {
        update();
        return { ready: Promise.resolve(), finished: new Promise<void>((resolve) => (finish = resolve)) };
      });
      Object.defineProperty(document, 'startViewTransition', { value: startViewTransition, configurable: true });
      Object.defineProperty(window, 'matchMedia', {
        value: (query: string) => ({ matches: reducedMotion && query === REDUCED_MOTION_QUERY }),
        configurable: true,
      });
    };

    afterEach(() => {
      delete (document as Partial<Document>).startViewTransition;
      document.documentElement.classList.remove(THEME_TRANSITION_CLASS);
    });

    it('spreads the new theme from the toggle and cleans up when it finishes', async () => {
      installMemoryStorage({ [THEME_STORAGE_KEY]: ThemeMode.Light });
      installViewTransitions(false);
      const service = TestBed.inject(ThemeService);
      const root = document.documentElement;

      service.toggle({ x: 40, y: 12 });

      expect(startViewTransition).toHaveBeenCalledOnce();
      expect(service.mode()).toBe(ThemeMode.Dark);
      expect(root.classList.contains(DARK_THEME_CLASS)).toBe(true);
      expect(root.classList.contains(THEME_TRANSITION_CLASS)).toBe(true);
      expect(root.style.getPropertyValue(THEME_REVEAL_X_VAR)).toBe('40px');
      expect(root.style.getPropertyValue(THEME_REVEAL_Y_VAR)).toBe('12px');

      finish();
      await Promise.resolve();
      await Promise.resolve();
      expect(root.classList.contains(THEME_TRANSITION_CLASS)).toBe(false);
    });

    it('switches at once when the visitor asks for reduced motion', () => {
      installMemoryStorage({ [THEME_STORAGE_KEY]: ThemeMode.Light });
      installViewTransitions(true);
      const service = TestBed.inject(ThemeService);

      service.toggle({ x: 0, y: 0 });

      expect(startViewTransition).not.toHaveBeenCalled();
      expect(service.mode()).toBe(ThemeMode.Dark);
    });

    it('switches at once where the browser has no view transitions', () => {
      installMemoryStorage({ [THEME_STORAGE_KEY]: ThemeMode.Dark });
      const service = TestBed.inject(ThemeService);

      service.toggle();

      expect(service.mode()).toBe(ThemeMode.Light);
      expect(document.documentElement.classList.contains(THEME_TRANSITION_CLASS)).toBe(false);
    });
  });
});
