import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactSectionComponent } from '../../../components/common/contact-section/contact-section.component';
import { ExperienceTimelineComponent } from '../../../components/experience/experience-timeline/experience-timeline.component';

/** The experience timeline on its own, opened from the header. */
@Component({
  selector: 'app-experience-page',
  imports: [ExperienceTimelineComponent, ContactSectionComponent],
  templateUrl: './experience-page.component.html',
  styleUrl: './experience-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperiencePageComponent {}
