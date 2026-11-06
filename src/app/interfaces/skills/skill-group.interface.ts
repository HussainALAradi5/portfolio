import { AppIconName } from '../../types/ui/app-icon-name.type';
import { Skill } from './skill.interface';

export interface SkillGroup {
  id: string;
  title: string;
  icon: AppIconName;
  skills: readonly Skill[];
  /** Shown first and highlighted. */
  isCore?: boolean;
}
