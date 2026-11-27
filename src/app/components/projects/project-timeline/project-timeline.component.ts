import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { UI_TEXT } from '../../../constants/common/ui-text.constants';
import { TIMELINE_TECH_LIMIT } from '../../../constants/projects/project-display.constants';
import {
  PROJECT_STATUS_BADGE_VARIANTS,
  PROJECT_STATUS_LABELS,
} from '../../../constants/projects/project-labels.constants';
import { ROUTE_PATHS } from '../../../constants/routes/route-paths.constants';
import { ICON } from '../../../constants/ui/icons.constants';
import { ProjectGroup } from '../../../interfaces/projects/project-group.interface';
import { ProjectCoverComponent } from '../project-cover/project-cover.component';

/** Projects down a vertical line, one heading per year (or type), each entry a compact linked card. */
@Component({
  selector: 'app-project-timeline',
  imports: [RouterLink, NgIcon, HlmBadge, ProjectCoverComponent],
  templateUrl: './project-timeline.component.html',
  styleUrl: './project-timeline.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectTimelineComponent {
  readonly groups = input.required<readonly ProjectGroup[]>();

  protected readonly text = UI_TEXT;
  protected readonly icon = ICON;
  protected readonly techLimit = TIMELINE_TECH_LIMIT;
  protected readonly statusLabels = PROJECT_STATUS_LABELS;
  protected readonly statusVariants = PROJECT_STATUS_BADGE_VARIANTS;
  protected readonly projectsPath = `/${ROUTE_PATHS.projects}`;
}
