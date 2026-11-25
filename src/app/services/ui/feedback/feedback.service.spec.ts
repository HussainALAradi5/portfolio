import { TestBed } from '@angular/core/testing';
import { MAX_TOASTS, TOAST_DURATION_MS } from '../../../constants/ui/feedback.constants';
import { FeedbackKind } from '../../../enums/ui/feedback-kind.enum';
import { FeedbackService } from './feedback.service';

describe('FeedbackService', () => {
  let service: FeedbackService;

  beforeEach(() => {
    vi.useFakeTimers();
    service = TestBed.inject(FeedbackService);
  });

  afterEach(() => vi.useRealTimers());

  const messages = () => service.toasts().map((toast) => toast.message);

  it('shows a toast and removes it once the duration for its kind has passed', () => {
    service.notify(FeedbackKind.Success, 'Saved');
    expect(service.toasts()).toEqual([{ id: expect.any(Number), kind: FeedbackKind.Success, message: 'Saved' }]);

    vi.advanceTimersByTime(TOAST_DURATION_MS[FeedbackKind.Success] - 1);
    expect(messages()).toEqual(['Saved']);

    vi.advanceTimersByTime(1);
    expect(messages()).toEqual([]);
  });

  it('keeps errors longer than successes', () => {
    service.notify(FeedbackKind.Success, 'Saved');
    service.notify(FeedbackKind.Error, 'Failed');

    vi.advanceTimersByTime(TOAST_DURATION_MS[FeedbackKind.Success]);

    expect(messages()).toEqual(['Failed']);
  });

  it('shows the newest few, dropping the oldest', () => {
    for (let index = 1; index <= MAX_TOASTS + 1; index++) {
      service.notify(FeedbackKind.Info, `Message ${index}`);
    }

    expect(messages()).toHaveLength(MAX_TOASTS);
    expect(messages()[0]).toBe('Message 2');
    expect(messages().at(-1)).toBe(`Message ${MAX_TOASTS + 1}`);
  });

  it('dismisses one toast and leaves the others', () => {
    service.notify(FeedbackKind.Info, 'First');
    service.notify(FeedbackKind.Info, 'Second');

    service.dismiss(service.toasts()[0].id);

    expect(messages()).toEqual(['Second']);
  });
});
