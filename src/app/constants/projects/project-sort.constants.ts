import { ProjectSort } from '../../enums/projects/project-sort.enum';
import { ProjectView } from '../../enums/projects/project-view.enum';
import { ProjectOption } from '../../interfaces/projects/project-option.interface';

export const PROJECT_SORT_OPTIONS: readonly ProjectOption<ProjectSort>[] = [
  { value: ProjectSort.Newest, label: 'Newest', icon: 'lucideArrowDownWideNarrow' },
  { value: ProjectSort.Oldest, label: 'Oldest', icon: 'lucideArrowUpNarrowWide' },
  { value: ProjectSort.Type, label: 'Type', icon: 'lucideShapes' },
];

export const PROJECT_VIEW_OPTIONS: readonly ProjectOption<ProjectView>[] = [
  { value: ProjectView.Grid, label: 'Grid', icon: 'lucideLayoutGrid' },
  { value: ProjectView.Timeline, label: 'Timeline', icon: 'lucideGitCommitVertical' },
];

export const DEFAULT_PROJECT_SORT = ProjectSort.Newest;
export const DEFAULT_PROJECT_VIEW = ProjectView.Grid;

/** Browser storage keys for the visitor's last sort and view. */
export const PROJECT_SORT_STORAGE_KEY = 'portfolio-project-sort';
export const PROJECT_VIEW_STORAGE_KEY = 'portfolio-project-view';
