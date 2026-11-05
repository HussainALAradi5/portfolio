import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { UI_TEXT } from '../../../constants/common/ui-text.constants';
import { REPOSITORY_ROLE_META } from '../../../constants/projects/project-labels.constants';
import { ICON } from '../../../constants/ui/icons.constants';
import { ProjectRepository } from '../../../interfaces/projects/project-repository.interface';

@Component({
  selector: 'app-project-repository-list',
  imports: [NgTemplateOutlet, NgIcon],
  templateUrl: './project-repository-list.component.html',
  styleUrl: './project-repository-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectRepositoryListComponent {
  readonly repositories = input.required<readonly ProjectRepository[]>();

  protected readonly roleMeta = REPOSITORY_ROLE_META;
  protected readonly text = UI_TEXT;
  protected readonly icon = ICON;
}
