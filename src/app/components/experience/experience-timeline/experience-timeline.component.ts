import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UI_TEXT } from '../../../constants/common/ui-text.constants';
import { EXPERIENCE } from '../../../constants/experience/experience.constants';
import { ROUTE_PATHS } from '../../../constants/routes/route-paths.constants';
import { YearMonth } from '../../../interfaces/experience/year-month.interface';
import { SectionHeadingComponent } from '../../common/section-heading/section-heading.component';
import { ExperienceEntryComponent } from '../experience-entry/experience-entry.component';

const now = new Date();

@Component({
  selector: 'app-experience-timeline',
  imports: [SectionHeadingComponent, ExperienceEntryComponent],
  templateUrl: './experience-timeline.component.html',
  styleUrl: './experience-timeline.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceTimelineComponent {
  protected readonly text = UI_TEXT;
  protected readonly sectionId = ROUTE_PATHS.experienceAnchor;
  protected readonly entries = EXPERIENCE;
  /** Ongoing roles count their length up to the current month. */
  protected readonly today: YearMonth = { year: now.getFullYear(), month: now.getMonth() + 1 };
}
