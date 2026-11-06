import { ChangeDetectionStrategy, Component, computed, input, linkedSignal } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { UI_TEXT } from '../../../constants/common/ui-text.constants';
import { ICON } from '../../../constants/ui/icons.constants';
import { ProjectScreenshot } from '../../../interfaces/projects/project-screenshot.interface';
import { thumbnailSrc } from '../../../utilities/images/thumbnail/thumbnail-src.utility';
import { ImageLightboxComponent } from '../../common/image-lightbox/image-lightbox.component';

/** Large preview with a thumbnail strip; the preview opens a full-screen lightbox. Selection resets when the screenshots change. */
@Component({
  selector: 'app-project-gallery',
  imports: [NgIcon, ImageLightboxComponent],
  templateUrl: './project-gallery.component.html',
  styleUrl: './project-gallery.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectGalleryComponent {
  readonly screenshots = input.required<readonly ProjectScreenshot[]>();

  protected readonly text = UI_TEXT;
  protected readonly icon = ICON;
  protected readonly thumbnailSrc = thumbnailSrc;
  protected readonly selectedIndex = linkedSignal({ source: this.screenshots, computation: () => 0 });
  protected readonly selected = computed(() => this.screenshots()[this.selectedIndex()]);

  protected select(index: number): void {
    this.selectedIndex.set(index);
  }
}
