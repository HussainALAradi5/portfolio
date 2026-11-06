import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { UI_TEXT } from '../../../constants/common/ui-text.constants';
import { SKILL_GROUPS } from '../../../constants/skills/skills.constants';
import { SectionHeadingComponent } from '../../common/section-heading/section-heading.component';

/** The CV's skills in groups, core strengths first and highlighted. */
@Component({
  selector: 'app-skills-section',
  imports: [NgIcon, SectionHeadingComponent],
  templateUrl: './skills-section.component.html',
  styleUrl: './skills-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsSectionComponent {
  protected readonly text = UI_TEXT;
  protected readonly groups = SKILL_GROUPS;
}
