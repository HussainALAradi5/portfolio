import { ProjectStatus } from '../../enums/projects/project-status.enum';
import { RepositoryRole } from '../../enums/projects/repository-role.enum';
import { TechLayer } from '../../enums/projects/tech-layer.enum';
import { LabelIcon } from '../../interfaces/projects/label-icon.interface';

export const REPOSITORY_ROLE_META: Record<RepositoryRole, LabelIcon> = {
  [RepositoryRole.Client]: { label: 'Web client', icon: 'lucideMonitor' },
  [RepositoryRole.Server]: { label: 'Server API', icon: 'lucideServer' },
  [RepositoryRole.Mobile]: { label: 'Mobile app', icon: 'lucideSmartphone' },
  [RepositoryRole.Documentation]: { label: 'Documentation', icon: 'lucideFileText' },
  [RepositoryRole.Application]: { label: 'Application', icon: 'lucideCode' },
};

/** Display order and labels of the stack groups on the detail page. */
export const TECH_LAYER_ORDER: readonly TechLayer[] = [
  TechLayer.Frontend,
  TechLayer.Backend,
  TechLayer.Mobile,
  TechLayer.Data,
  TechLayer.Security,
];

export const TECH_LAYER_LABELS: Record<TechLayer, string> = {
  [TechLayer.Frontend]: 'Frontend',
  [TechLayer.Backend]: 'Backend',
  [TechLayer.Mobile]: 'Mobile',
  [TechLayer.Data]: 'Data',
  [TechLayer.Security]: 'Auth and security',
};

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  [ProjectStatus.Live]: 'Live demo',
  [ProjectStatus.InProgress]: 'In progress',
  [ProjectStatus.Completed]: 'Completed',
};

/** Number of stack badges shown on a project card before the "+n" badge. */
export const CARD_TECH_LIMIT = 5;
