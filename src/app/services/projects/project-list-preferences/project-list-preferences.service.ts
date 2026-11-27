import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';
import {
  DEFAULT_PROJECT_SORT,
  DEFAULT_PROJECT_VIEW,
  PROJECT_SORT_STORAGE_KEY,
  PROJECT_VIEW_STORAGE_KEY,
} from '../../../constants/projects/project-sort.constants';
import { ProjectSort } from '../../../enums/projects/project-sort.enum';
import { ProjectView } from '../../../enums/projects/project-view.enum';

/** How the visitor last sorted and viewed the projects, kept in the browser so it survives a reload. */
@Injectable({ providedIn: 'root' })
export class ProjectListPreferencesService {
  private readonly storage = this.readStorage();

  readonly sort = signal<ProjectSort>(
    this.read(PROJECT_SORT_STORAGE_KEY, Object.values(ProjectSort), DEFAULT_PROJECT_SORT),
  );
  readonly view = signal<ProjectView>(
    this.read(PROJECT_VIEW_STORAGE_KEY, Object.values(ProjectView), DEFAULT_PROJECT_VIEW),
  );

  constructor() {
    effect(() => this.write(PROJECT_SORT_STORAGE_KEY, this.sort()));
    effect(() => this.write(PROJECT_VIEW_STORAGE_KEY, this.view()));
  }

  private readStorage(): Storage | null {
    try {
      return inject(DOCUMENT).defaultView?.localStorage ?? null;
    } catch {
      return null;
    }
  }

  /** A stored value is used only when it is still a valid option. */
  private read<T extends string>(key: string, allowed: readonly T[], fallback: T): T {
    try {
      const value = this.storage?.getItem(key);
      return allowed.includes(value as T) ? (value as T) : fallback;
    } catch {
      return fallback;
    }
  }

  private write(key: string, value: string): void {
    try {
      this.storage?.setItem(key, value);
    } catch {
      // Storage can be unavailable (private mode); the choice still applies for this visit.
    }
  }
}
