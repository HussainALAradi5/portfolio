import { FeedbackKind } from '../../enums/ui/feedback-kind.enum';

/** One message in the toast stack. */
export interface Toast {
  id: number;
  kind: FeedbackKind;
  message: string;
}
