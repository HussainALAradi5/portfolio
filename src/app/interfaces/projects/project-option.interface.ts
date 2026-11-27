import type { AppIconName } from '../../types/ui/app-icon-name.type';

/** One choice in a toolbar control, such as a sort order or a view. */
export interface ProjectOption<T> {
  value: T;
  label: string;
  icon: AppIconName;
}
