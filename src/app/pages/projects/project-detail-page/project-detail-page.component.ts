import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmSeparator } from '@spartan-ng/helm/separator';
import { ProjectGalleryComponent } from '../../../components/projects/project-gallery/project-gallery.component';
import { ProjectRepositoryListComponent } from '../../../components/projects/project-repository-list/project-repository-list.component';
import { ProjectTechGroupsComponent } from '../../../components/projects/project-tech-groups/project-tech-groups.component';
import { ProjectCoverComponent } from '../../../components/projects/project-cover/project-cover.component';
import { UI_TEXT } from '../../../constants/common/ui-text.constants';
import {
  PROJECT_STATUS_BADGE_VARIANTS,
  PROJECT_STATUS_LABELS,
} from '../../../constants/projects/project-labels.constants';
import { ROUTE_PATHS } from '../../../constants/routes/route-paths.constants';
import { ICON } from '../../../constants/ui/icons.constants';
import { ProjectService } from '../../../services/projects/project/project.service';

@Component({
  selector: 'app-project-detail-page',
  imports: [
    RouterLink,
    NgIcon,
    HlmBadge,
    HlmButton,
    HlmCardImports,
    HlmSeparator,
    ProjectGalleryComponent,
    ProjectRepositoryListComponent,
    ProjectTechGroupsComponent,
    ProjectCoverComponent,
  ],
  templateUrl: './project-detail-page.component.html',
  styleUrl: './project-detail-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailPageComponent {
  private readonly projectService = inject(ProjectService);

  /** Bound from the `:slug` route parameter; the route guard ensures it exists. */
  readonly slug = input.required<string>();

  protected readonly text = UI_TEXT;
  protected readonly icon = ICON;
  protected readonly statusLabels = PROJECT_STATUS_LABELS;
  protected readonly statusVariants = PROJECT_STATUS_BADGE_VARIANTS;
  protected readonly projectsPath = `/${ROUTE_PATHS.projects}`;

  protected readonly project = computed(() => this.projectService.findBySlug(this.slug()));
  protected readonly neighbours = computed(() => this.projectService.findNeighbours(this.slug()));
}
