import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, signal } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { SITE_PROFILE } from '../../../config/site/site.config';
import { UI_TEXT } from '../../../constants/common/ui-text.constants';
import { COPIED_FEEDBACK_MS } from '../../../constants/ui/feedback.constants';
import { ICON } from '../../../constants/ui/icons.constants';
import { ClipboardService } from '../../../services/ui/clipboard/clipboard.service';
import { CvDownloadButtonComponent } from '../cv-download-button/cv-download-button.component';

/** Closing call to action at the bottom of the main pages: email, LinkedIn and the CV. */
@Component({
  selector: 'app-contact-section',
  imports: [NgIcon, HlmButton, CvDownloadButtonComponent],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactSectionComponent {
  private readonly clipboard = inject(ClipboardService);
  private resetTimer?: ReturnType<typeof setTimeout>;

  /** Off on the home page, where the hero already offers the CV. */
  readonly showCv = input(true);

  protected readonly text = UI_TEXT;
  protected readonly icon = ICON;
  protected readonly profile = SITE_PROFILE;
  protected readonly mailto = `mailto:${SITE_PROFILE.email}`;
  protected readonly isCopied = signal(false);

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.resetTimer));
  }

  protected async copyEmail(): Promise<void> {
    if (!(await this.clipboard.copy(this.profile.email))) {
      return;
    }
    this.isCopied.set(true);
    clearTimeout(this.resetTimer);
    this.resetTimer = setTimeout(() => this.isCopied.set(false), COPIED_FEEDBACK_MS);
  }
}
