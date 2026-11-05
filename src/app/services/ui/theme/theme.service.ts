import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';
import { DARK_SCHEME_QUERY, DARK_THEME_CLASS, THEME_STORAGE_KEY } from '../../../constants/ui/theme.constants';
import { ThemeMode } from '../../../enums/ui/theme-mode.enum';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  readonly mode = signal<ThemeMode>(this.readInitialMode());

  constructor() {
    effect(() => {
      const mode = this.mode();
      this.document.documentElement.classList.toggle(DARK_THEME_CLASS, mode === ThemeMode.Dark);
      this.writeStoredMode(mode);
    });
  }

  toggle(): void {
    this.mode.update((mode) => (mode === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark));
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
