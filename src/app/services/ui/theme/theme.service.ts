import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';
import {
  DARK_SCHEME_QUERY,
  DARK_THEME_CLASS,
  THEME_REVEAL_X_VAR,
  THEME_REVEAL_Y_VAR,
  THEME_STORAGE_KEY,
  THEME_TRANSITION_CLASS,
} from '../../../constants/ui/theme.constants';
import { REDUCED_MOTION_QUERY } from '../../../constants/ui/motion.constants';
import { ThemeMode } from '../../../enums/ui/theme-mode.enum';
import { ScreenPoint } from '../../../interfaces/ui/screen-point.interface';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  readonly mode = signal<ThemeMode>(this.readInitialMode());

  constructor() {
    effect(() => {
      const mode = this.mode();
      this.applyMode(mode);
      this.writeStoredMode(mode);
    });
  }

  /**
   * Switches between light and dark. Where the browser supports view transitions and the visitor has not asked
   * for reduced motion, the new theme spreads in a circle from `origin` (the toggle), or from the centre.
   */
  toggle(origin?: ScreenPoint): void {
    const next = this.mode() === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark;
    const root = this.document.documentElement;

    if (!this.document.startViewTransition || this.prefersReducedMotion()) {
      this.mode.set(next);
      return;
    }

    const view = this.document.defaultView;
    root.style.setProperty(THEME_REVEAL_X_VAR, `${origin?.x ?? (view?.innerWidth ?? 0) / 2}px`);
    root.style.setProperty(THEME_REVEAL_Y_VAR, `${origin?.y ?? (view?.innerHeight ?? 0) / 2}px`);
    root.classList.add(THEME_TRANSITION_CLASS);

    // The DOM must change inside the callback, so the class is applied here rather than waiting for the effect.
    const transition = this.document.startViewTransition(() => {
      this.mode.set(next);
      this.applyMode(next);
    });
    // The browser may skip the animation (hidden tab, layout change); the theme has still switched, so that is fine.
    transition.ready.catch(() => undefined);
    transition.finished.finally(() => root.classList.remove(THEME_TRANSITION_CLASS));
  }

  private applyMode(mode: ThemeMode): void {
    this.document.documentElement.classList.toggle(DARK_THEME_CLASS, mode === ThemeMode.Dark);
  }

  private prefersReducedMotion(): boolean {
    return this.document.defaultView?.matchMedia?.(REDUCED_MOTION_QUERY).matches ?? false;
  }

  private readInitialMode(): ThemeMode {
    const stored = this.readStoredMode();
    if (stored) {
      return stored;
    }
    const prefersDark = this.document.defaultView?.matchMedia?.(DARK_SCHEME_QUERY).matches ?? false;
    return prefersDark ? ThemeMode.Dark : ThemeMode.Light;
  }

  private readStoredMode(): ThemeMode | null {
    try {
      const value = this.document.defaultView?.localStorage.getItem(THEME_STORAGE_KEY);
      return value === ThemeMode.Dark || value === ThemeMode.Light ? value : null;
    } catch {
      return null;
    }
  }

  private writeStoredMode(mode: ThemeMode): void {
    try {
      this.document.defaultView?.localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this visit.
    }
  }
}
