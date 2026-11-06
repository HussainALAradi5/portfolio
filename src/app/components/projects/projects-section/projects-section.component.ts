import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HlmTabsImports } from '@spartan-ng/helm/tabs';
import { UI_TEXT } from '../../../constants/common/ui-text.constants';
import { EAGER_COVER_COUNT } from '../../../constants/projects/project-display.constants';
import { PROJECT_FILTER_OPTIONS } from '../../../constants/projects/project-filters.constants';
import { ProjectFilter } from '../../../enums/projects/project-filter.enum';
import { ProjectFilterTab } from '../../../interfaces/projects/project-filter-tab.interface';
import { ProjectService } from '../../../services/projects/project/project.service';
import { SectionHeadingComponent } from '../../common/section-heading/section-heading.component';
import { ProjectCardComponent } from '../project-card/project-card.component';

/** Filterable project grid, shown on the home page and on its own on the projects page. */
@Component({
  selector: 'app-projects-section',
  imports: [HlmTabsImports, SectionHeadingComponent, ProjectCardComponent],
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsSectionComponent {
  private readonly projectService = inject(ProjectService);

  protected readonly text = UI_TEXT;
  protected readonly defaultFilter = ProjectFilter.All;
  protected readonly eagerCoverCount = EAGER_COVER_COUNT;
  protected readonly filterTabs: readonly ProjectFilterTab[] = PROJECT_FILTER_OPTIONS.map((option) => ({
    ...option,
    projects: this.projectService.findByTier(option.tier),
  }));
}
