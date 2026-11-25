import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { UI_TEXT } from '../../../../constants/common/ui-text.constants';
import { FEEDBACK_ICONS } from '../../../../constants/ui/feedback.constants';
import { ICON } from '../../../../constants/ui/icons.constants';
import { FeedbackKind } from '../../../../enums/ui/feedback-kind.enum';
import { FeedbackService } from '../../../../services/ui/feedback/feedback.service';

/** Shows the toasts from FeedbackService at the bottom of the screen; they slide in and fade out. */
@Component({
  selector: 'app-toast-host',
  imports: [NgIcon, HlmButton],
  templateUrl: './toast-host.component.html',
  styleUrl: './toast-host.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastHostComponent {
  protected readonly feedback = inject(FeedbackService);
  protected readonly text = UI_TEXT;
  protected readonly icon = ICON;
  protected readonly kindIcons = FEEDBACK_ICONS;
  protected readonly errorKind = FeedbackKind.Error;
}
