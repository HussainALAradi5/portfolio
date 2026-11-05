import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { UI_TEXT } from '../../../constants/common/ui-text.constants';
import { CARD_TECH_LIMIT, PROJECT_STATUS_LABELS } from '../../../constants/projects/project-labels.constants';
import { ROUTE_PATHS } from '../../../constants/routes/route-paths.constants';
import { ICON } from '../../../constants/ui/icons.constants';
import { ProjectStatus } from '../../../enums/projects/project-status.enum';
import { Project } from '../../../interfaces/projects/project.interface';
import { ProjectCoverComponent } from '../project-cover/project-cover.component';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink, NgIcon, HlmBadge, HlmButton, HlmCardImports, ProjectCoverComponent],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();
  readonly eager = input(false);

  protected readonly text = UI_TEXT;
  protected readonly icon = ICON;
  protected readonly statusLabels = PROJECT_STATUS_LABELS;
  protected readonly liveStatus = ProjectStatus.Live;

  protected readonly detailLink = computed(() => ['/', ROUTE_PATHS.projects, this.project().slug]);
  protected readonly visibleTech = computed(() => this.project().tech.slice(0, CARD_TECH_LIMIT));
  protected readonly hiddenTechCount = computed(() => Math.max(0, this.project().tech.length - CARD_TECH_LIMIT));
  protected readonly repositoryCount = computed(() => this.project().repositories.length);
}
