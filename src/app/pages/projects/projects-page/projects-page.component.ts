import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactSectionComponent } from '../../../components/common/contact-section/contact-section.component';
import { ProjectsSectionComponent } from '../../../components/projects/projects-section/projects-section.component';

/** Projects on their own, opened from the header. */
@Component({
  selector: 'app-projects-page',
  imports: [ProjectsSectionComponent, ContactSectionComponent],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPageComponent {}
