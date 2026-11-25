import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { SITE_PROFILE } from '../../../config/site/site.config';
import { UI_TEXT } from '../../../constants/common/ui-text.constants';
import { FeedbackKind } from '../../../enums/ui/feedback-kind.enum';
import { FeedbackService } from '../../ui/feedback/feedback.service';

/**
 * Downloads the CV PDF. While the file is being fetched `isDownloading` is true,
 * so every CV button shows its busy state and ignores further clicks. A toast confirms the result.
 */
@Injectable({ providedIn: 'root' })
export class CvDownloadService {
  private readonly document = inject(DOCUMENT);
  private readonly feedback = inject(FeedbackService);
  private readonly cv = SITE_PROFILE.cv;

  readonly isDownloading = signal(false);

  async download(): Promise<void> {
    if (this.isDownloading()) {
      return;
    }
    this.isDownloading.set(true);
    try {
      const response = await fetch(this.cv.url);
      if (!response.ok) {
        throw new Error(`CV request failed with status ${response.status}`);
      }
      this.saveFile(await response.blob());
      this.feedback.notify(FeedbackKind.Success, UI_TEXT.cv.downloaded);
    } catch {
      // Let the browser open the file itself if the fetch fails.
      this.document.defaultView?.open(this.cv.url, '_blank', 'noopener');
      this.feedback.notify(FeedbackKind.Info, UI_TEXT.cv.openedInTab);
    } finally {
      this.isDownloading.set(false);
    }
  }

  private saveFile(file: Blob): void {
    const objectUrl = URL.createObjectURL(file);
    const link = this.document.createElement('a');
    link.href = objectUrl;
    link.download = this.cv.fileName;
    link.click();
    URL.revokeObjectURL(objectUrl);
  }
}
