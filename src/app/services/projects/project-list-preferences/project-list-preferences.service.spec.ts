import { TestBed } from '@angular/core/testing';
import {
  DEFAULT_PROJECT_SORT,
  DEFAULT_PROJECT_VIEW,
  PROJECT_SORT_STORAGE_KEY,
  PROJECT_VIEW_STORAGE_KEY,
} from '../../../constants/projects/project-sort.constants';
import { ProjectSort } from '../../../enums/projects/project-sort.enum';
import { ProjectView } from '../../../enums/projects/project-view.enum';
import { ProjectListPreferencesService } from './project-list-preferences.service';

/** In-memory storage, so the test does not depend on the runtime's localStorage. */
function installMemoryStorage(initial: Record<string, string> = {}): Map<string, string> {
  const values = new Map(Object.entries(initial));
  const storage = {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => void values.set(key, value),
  };
  Object.defineProperty(window, 'localStorage', { value: storage, configurable: true });
  return values;
}

describe('ProjectListPreferencesService', () => {
  it('starts on the grid, newest first, for a new visitor', () => {
    installMemoryStorage();
    const service = TestBed.inject(ProjectListPreferencesService);
    expect(service.view()).toBe(DEFAULT_PROJECT_VIEW);
    expect(DEFAULT_PROJECT_VIEW).toBe(ProjectView.Grid);
    expect(service.sort()).toBe(DEFAULT_PROJECT_SORT);
  });

  it('remembers the last choice and ignores values that are no longer options', () => {
    installMemoryStorage({ [PROJECT_VIEW_STORAGE_KEY]: ProjectView.Timeline, [PROJECT_SORT_STORAGE_KEY]: 'random' });
    const service = TestBed.inject(ProjectListPreferencesService);
    expect(service.view()).toBe(ProjectView.Timeline);
    expect(service.sort()).toBe(DEFAULT_PROJECT_SORT);
  });

  it('saves a new choice', () => {
    const stored = installMemoryStorage();
    const service = TestBed.inject(ProjectListPreferencesService);
    service.sort.set(ProjectSort.Type);
    TestBed.tick();
    expect(stored.get(PROJECT_SORT_STORAGE_KEY)).toBe(ProjectSort.Type);
  });
});
