import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { Project } from '../../../interfaces/projects/project.interface';

/** First screenshot of a project, or its icon on a gradient when it has none. */
@Component({
  selector: 'app-project-cover',
  imports: [NgIcon],
  templateUrl: './project-cover.component.html',
  styleUrl: './project-cover.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCoverComponent {
  readonly project = input.required<Project>();
  readonly eager = input(false);

  protected readonly cover = computed(() => this.project().screenshots[0]);
}
