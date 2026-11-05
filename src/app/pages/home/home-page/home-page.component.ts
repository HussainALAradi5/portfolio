import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HlmTabsImports } from '@spartan-ng/helm/tabs';
import { SectionHeadingComponent } from '../../../components/common/section-heading/section-heading.component';
import { HeroSectionComponent } from '../../../components/home/hero-section/hero-section.component';
import { ProjectCardComponent } from '../../../components/projects/project-card/project-card.component';
import { UI_TEXT } from '../../../constants/common/ui-text.constants';
import { EAGER_COVER_COUNT } from '../../../constants/projects/project-display.constants';
import { PROJECT_FILTER_OPTIONS } from '../../../constants/projects/project-filters.constants';
import { ROUTE_PATHS } from '../../../constants/routes/route-paths.constants';
import { ProjectFilter } from '../../../enums/projects/project-filter.enum';
import { ProjectFilterTab } from '../../../interfaces/projects/project-filter-tab.interface';
import { ProjectService } from '../../../services/projects/project/project.service';

@Component({
  selector: 'app-home-page',
  imports: [HlmTabsImports, SectionHeadingComponent, HeroSectionComponent, ProjectCardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  private readonly projectService = inject(ProjectService);

  protected readonly text = UI_TEXT;
  protected readonly sectionId = ROUTE_PATHS.projectsAnchor;
  protected readonly defaultFilter = ProjectFilter.All;
  protected readonly eagerCoverCount = EAGER_COVER_COUNT;
  protected readonly allProjects = this.projectService.findAll();
  protected readonly filterTabs: readonly ProjectFilterTab[] = PROJECT_FILTER_OPTIONS.map((option) => ({
    ...option,
    projects: this.projectService.findByTier(option.tier),
  }));
}
