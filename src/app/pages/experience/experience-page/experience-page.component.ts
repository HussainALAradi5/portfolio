import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ExperienceTimelineComponent } from '../../../components/experience/experience-timeline/experience-timeline.component';

/** The experience timeline on its own, opened from the header. */
@Component({
  selector: 'app-experience-page',
  imports: [ExperienceTimelineComponent],
  templateUrl: './experience-page.component.html',
  styleUrl: './experience-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperiencePageComponent {}
