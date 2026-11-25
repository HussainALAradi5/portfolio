import { Injectable, signal } from '@angular/core';
import { MAX_TOASTS, TOAST_DURATION_MS } from '../../../constants/ui/feedback.constants';
import { FeedbackKind } from '../../../enums/ui/feedback-kind.enum';
import { Toast } from '../../../interfaces/ui/toast.interface';

/** The one place features report the result of an action; the toast host shows what is here. */
@Injectable({ providedIn: 'root' })
export class FeedbackService {
  private nextId = 0;

  readonly toasts = signal<readonly Toast[]>([]);

  notify(kind: FeedbackKind, message: string): void {
    const toast: Toast = { id: ++this.nextId, kind, message };
    this.toasts.update((toasts) => [...toasts, toast].slice(-MAX_TOASTS));
    setTimeout(() => this.dismiss(toast.id), TOAST_DURATION_MS[kind]);
  }

  dismiss(id: number): void {
    this.toasts.update((toasts) => toasts.filter((toast) => toast.id !== id));
  }
}
