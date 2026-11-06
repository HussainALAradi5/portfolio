import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { ButtonVariants, HlmButton } from '@spartan-ng/helm/button';
import { UI_TEXT } from '../../../constants/common/ui-text.constants';
import { ICON } from '../../../constants/ui/icons.constants';
import { CvDownloadService } from '../../../services/site/cv-download/cv-download.service';

/** Button that downloads the CV, showing a spinner and staying disabled while the file is fetched. */
@Component({
  selector: 'app-cv-download-button',
  imports: [NgIcon, HlmButton],
  templateUrl: './cv-download-button.component.html',
  styleUrl: './cv-download-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvDownloadButtonComponent {
  private readonly cvDownload = inject(CvDownloadService);

  readonly label = input<string>(UI_TEXT.cv.download);
  readonly variant = input<ButtonVariants['variant']>('outline');
  readonly size = input<ButtonVariants['size']>('default');
  /** Blue outline that marks the button as a call to action. */
  readonly isAccent = input(false);

  protected readonly text = UI_TEXT;
  protected readonly icon = ICON;
  protected readonly isDownloading = this.cvDownload.isDownloading;

  protected download(): void {
    void this.cvDownload.download();
  }
}
