import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { Project } from '../../../interfaces/projects/project.interface';
import { thumbnailSrc } from '../../../utilities/images/thumbnail/thumbnail-src.utility';

/** Thumbnail of a project's first screenshot, or its icon on a gradient when it has none. */
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
  protected readonly coverSrc = computed(() => {
    const cover = this.cover();
    return cover ? thumbnailSrc(cover.src) : undefined;
  });
}
