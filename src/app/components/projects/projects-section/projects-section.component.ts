import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterRenderEffect,
  inject,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { HlmTabsImports } from '@spartan-ng/helm/tabs';
import { UI_TEXT } from '../../../constants/common/ui-text.constants';
import { EAGER_COVER_COUNT } from '../../../constants/projects/project-display.constants';
import { PROJECT_FILTER_OPTIONS } from '../../../constants/projects/project-filters.constants';
import { ProjectFilter } from '../../../enums/projects/project-filter.enum';
import { ProjectFilterTab } from '../../../interfaces/projects/project-filter-tab.interface';
import { HorizontalInsets } from '../../../interfaces/ui/horizontal-insets.interface';
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
  host: { '(window:resize)': 'measureHighlight()' },
})
export class ProjectsSectionComponent {
  private readonly projectService = inject(ProjectService);
  private readonly tabList = viewChild.required('tabList', { read: ElementRef<HTMLElement> });
  private readonly triggers = viewChildren('trigger', { read: ElementRef<HTMLButtonElement> });

  protected readonly text = UI_TEXT;
  protected readonly defaultFilter = ProjectFilter.All;
  protected readonly eagerCoverCount = EAGER_COVER_COUNT;
  protected readonly filterTabs: readonly ProjectFilterTab[] = PROJECT_FILTER_OPTIONS.map((option) => ({
    ...option,
    projects: this.projectService.findByTier(option.tier),
  }));

  protected readonly activeFilter = signal<ProjectFilter>(this.defaultFilter);
  /** How far the highlight is clipped in from each side of the tab list; null until first measured. */
  protected readonly highlight = signal<HorizontalInsets | null>(null);

  constructor() {
    afterRenderEffect(() => {
      this.activeFilter();
      this.measureHighlight();
    });
  }

  /** Tab keys are the ProjectFilter values the triggers were given. */
  protected selectFilter(filter: string): void {
    this.activeFilter.set(filter as ProjectFilter);
  }

  protected measureHighlight(): void {
    const active = this.triggers().find(({ nativeElement }) => nativeElement.dataset['filter'] === this.activeFilter());
    if (!active) {
      return;
    }
    const button = active.nativeElement;
    const listWidth = this.tabList().nativeElement.clientWidth;
    this.highlight.set({ left: button.offsetLeft, right: listWidth - button.offsetLeft - button.offsetWidth });
  }
}
