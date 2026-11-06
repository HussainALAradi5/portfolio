import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkillsSectionComponent } from '../../../components/skills/skills-section/skills-section.component';

/** Skills on their own, opened from the header. */
@Component({
  selector: 'app-skills-page',
  imports: [SkillsSectionComponent],
  templateUrl: './skills-page.component.html',
  styleUrl: './skills-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsPageComponent {}
