import { ChangeDetectionStrategy, Component, computed, input, linkedSignal } from '@angular/core';
import { ProjectScreenshot } from '../../../interfaces/projects/project-screenshot.interface';

/** Large preview with a thumbnail strip; selection resets when the screenshots change. */
@Component({
  selector: 'app-project-gallery',
  templateUrl: './project-gallery.component.html',
  styleUrl: './project-gallery.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectGalleryComponent {
  readonly screenshots = input.required<readonly ProjectScreenshot[]>();

  protected readonly selectedIndex = linkedSignal({ source: this.screenshots, computation: () => 0 });
  protected readonly selected = computed(() => this.screenshots()[this.selectedIndex()]);

  protected select(index: number): void {
    this.selectedIndex.set(index);
  }
}
