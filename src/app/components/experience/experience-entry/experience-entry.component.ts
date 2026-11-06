import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { UI_TEXT } from '../../../constants/common/ui-text.constants';
import { EXPERIENCE_KIND_STYLES } from '../../../constants/experience/experience-labels.constants';
import { ROUTE_PATHS } from '../../../constants/routes/route-paths.constants';
import { ICON } from '../../../constants/ui/icons.constants';
import { ExperienceEntry } from '../../../interfaces/experience/experience-entry.interface';
import { YearMonth } from '../../../interfaces/experience/year-month.interface';
import { Project } from '../../../interfaces/projects/project.interface';
import { ProjectService } from '../../../services/projects/project/project.service';
import { formatDuration } from '../../../utilities/experience/period/format-duration.utility';
import { formatPeriod } from '../../../utilities/experience/period/format-period.utility';

@Component({
  selector: 'li[app-experience-entry]',
  imports: [RouterLink, NgIcon, HlmBadge],
  templateUrl: './experience-entry.component.html',
  styleUrl: './experience-entry.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative block ps-14 sm:ps-20' },
})
export class ExperienceEntryComponent {
  private readonly projectService = inject(ProjectService);

  readonly entry = input.required<ExperienceEntry>();
  readonly today = input.required<YearMonth>();

  protected readonly text = UI_TEXT;
  protected readonly icon = ICON;

  protected readonly kindStyle = computed(() => EXPERIENCE_KIND_STYLES[this.entry().kind]);
  protected readonly isCurrent = computed(() => this.entry().end === null);
  protected readonly period = computed(() => formatPeriod(this.entry().start, this.entry().end));
  protected readonly duration = computed(() => formatDuration(this.entry().start, this.entry().end, this.today()));
  protected readonly relatedProjects = computed<readonly Project[]>(() =>
    (this.entry().projectSlugs ?? [])
      .map((slug) => this.projectService.findBySlug(slug))
      .filter((project): project is Project => project !== undefined),
  );

  protected projectLink(project: Project): string[] {
    return ['/', ROUTE_PATHS.projects, project.slug];
  }
}
