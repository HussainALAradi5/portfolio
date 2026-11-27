import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterRenderEffect,
  computed,
  inject,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HlmTabsImports } from '@spartan-ng/helm/tabs';
import { UI_TEXT } from '../../../constants/common/ui-text.constants';
import { EAGER_COVER_COUNT } from '../../../constants/projects/project-display.constants';
import { PROJECT_FILTER_OPTIONS } from '../../../constants/projects/project-filters.constants';
import { PROJECT_SORT_OPTIONS, PROJECT_VIEW_OPTIONS } from '../../../constants/projects/project-sort.constants';
import { ProjectFilter } from '../../../enums/projects/project-filter.enum';
import { ProjectView } from '../../../enums/projects/project-view.enum';
import { ProjectFilterTab } from '../../../interfaces/projects/project-filter-tab.interface';
import { HorizontalInsets } from '../../../interfaces/ui/horizontal-insets.interface';
import { ProjectListPreferencesService } from '../../../services/projects/project-list-preferences/project-list-preferences.service';
import { ProjectService } from '../../../services/projects/project/project.service';
import { groupProjects, sortProjects } from '../../../utilities/projects/sort/sort-projects.utility';
import { SectionHeadingComponent } from '../../common/section-heading/section-heading.component';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { ProjectTimelineComponent } from '../project-timeline/project-timeline.component';

/** Filterable, sortable projects as a grid or a timeline, shown on the home page and on its own on the projects page. */
@Component({
  selector: 'app-projects-section',
  imports: [NgIcon, HlmTabsImports, SectionHeadingComponent, ProjectCardComponent, ProjectTimelineComponent],
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

  protected readonly preferences = inject(ProjectListPreferencesService);
  protected readonly sortOptions = PROJECT_SORT_OPTIONS;
  protected readonly viewOptions = PROJECT_VIEW_OPTIONS;
  protected readonly timelineView = ProjectView.Timeline;

  protected readonly activeFilter = signal<ProjectFilter>(this.defaultFilter);
  private readonly activeProjects = computed(
    () => this.filterTabs.find((tab) => tab.value === this.activeFilter())?.projects ?? [],
  );
  protected readonly sortedProjects = computed(() => sortProjects(this.activeProjects(), this.preferences.sort()));
  protected readonly groups = computed(() => groupProjects(this.activeProjects(), this.preferences.sort()));
  /** Changes with the sort or view, so the layout is re-created and its entrance plays again. */
  protected readonly layoutKey = computed(() => `${this.preferences.sort()}-${this.preferences.view()}`);
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
