import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { UI_TEXT } from '../../../constants/common/ui-text.constants';
import { EXPERIENCE_KIND_STYLES } from '../../../constants/experience/experience-labels.constants';
import { ICON } from '../../../constants/ui/icons.constants';
import { ExperienceEntry } from '../../../interfaces/experience/experience-entry.interface';
import { YearMonth } from '../../../interfaces/experience/year-month.interface';
import { formatDuration } from '../../../utilities/experience/period/format-duration.utility';
import { formatPeriod } from '../../../utilities/experience/period/format-period.utility';

/** Card with everything about the timeline stop that is selected. */
@Component({
  selector: 'app-experience-details',
  imports: [NgIcon, HlmBadge],
  templateUrl: './experience-details.component.html',
  styleUrl: './experience-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceDetailsComponent {
  readonly entry = input.required<ExperienceEntry>();
  readonly today = input.required<YearMonth>();

  protected readonly text = UI_TEXT;
  protected readonly icon = ICON;

  protected readonly kindStyle = computed(() => EXPERIENCE_KIND_STYLES[this.entry().kind]);
  protected readonly isCurrent = computed(() => this.entry().end === null);
  protected readonly period = computed(() => formatPeriod(this.entry().start, this.entry().end));
  protected readonly duration = computed(() => formatDuration(this.entry().start, this.entry().end, this.today()));
}
