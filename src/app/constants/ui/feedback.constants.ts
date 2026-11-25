import { FeedbackKind } from '../../enums/ui/feedback-kind.enum';
import type { AppIconName } from '../../types/ui/app-icon-name.type';

/** How long each kind of toast stays; errors stay longer so there is time to read them. */
export const TOAST_DURATION_MS: Record<FeedbackKind, number> = {
  [FeedbackKind.Success]: 4000,
  [FeedbackKind.Info]: 5000,
  [FeedbackKind.Error]: 7000,
};

/** Older toasts give way once this many are showing. */
export const MAX_TOASTS = 3;

export const FEEDBACK_ICONS: Record<FeedbackKind, AppIconName> = {
  [FeedbackKind.Success]: 'lucideCircleCheck',
  [FeedbackKind.Info]: 'lucideInfo',
  [FeedbackKind.Error]: 'lucideCircleAlert',
};
