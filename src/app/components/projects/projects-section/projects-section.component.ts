import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
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
import { ProjectSort } from '../../../enums/projects/project-sort.enum';
import { ProjectView } from '../../../enums/projects/project-view.enum';
import { LAYOUT_TRANSITION_CLASS, REDUCED_MOTION_QUERY } from '../../../constants/ui/motion.constants';
import { ProjectFilterTab } from '../../../interfaces/projects/project-filter-tab.interface';
import { HorizontalInsets } from '../../../interfaces/ui/horizontal-insets.interface';
import { ProjectListPreferencesService } from '../../../services/projects/project-list-preferences/project-list-preferences.service';
import { ProjectService } from '../../../services/projects/project/project.service';
import { groupProjects, sortProjects } from '../../../utilities/projects/sort/sort-projects.utility';
import { projectTransitionName } from '../../../utilities/projects/transition/project-transition-name.utility';
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
  private readonly document = inject(DOCUMENT);
  private readonly appRef = inject(ApplicationRef);
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
  protected readonly transitionName = projectTransitionName;

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

  protected changeSort(sort: ProjectSort): void {
    if (sort !== this.preferences.sort()) {
      this.changeLayout(() => this.preferences.sort.set(sort));
    }
  }

  protected changeView(view: ProjectView): void {
    if (view !== this.preferences.view()) {
      this.changeLayout(() => this.preferences.view.set(view));
    }
  }

  /**
   * Applies a sort or view change inside a view transition, so every card glides from its old place to its new one
   * (cards share a transition name in both layouts). Without view transitions, or under reduced motion, the change
   * is applied at once and the staggered entrance plays instead.
   */
  private changeLayout(update: () => void): void {
    const reduceMotion = this.document.defaultView?.matchMedia?.(REDUCED_MOTION_QUERY).matches ?? false;
    if (!this.document.startViewTransition || reduceMotion) {
      update();
      return;
    }
    const root = this.document.documentElement;
    root.classList.add(LAYOUT_TRANSITION_CLASS);
    // The DOM must change inside the callback, so the update is rendered right away with tick().
    const transition = this.document.startViewTransition(() => {
      update();
      this.appRef.tick();
    });
    // The browser may skip the animation (hidden tab, layout change); the update has still run, so that is fine.
    transition.ready.catch(() => undefined);
    transition.finished.finally(() => root.classList.remove(LAYOUT_TRANSITION_CLASS));
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
