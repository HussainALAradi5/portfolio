import { TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import { UI_TEXT } from '../../../../constants/common/ui-text.constants';
import { APP_ICONS } from '../../../../constants/ui/icons.constants';
import { FeedbackKind } from '../../../../enums/ui/feedback-kind.enum';
import { FeedbackService } from '../../../../services/ui/feedback/feedback.service';
import { ToastHostComponent } from './toast-host.component';

describe('ToastHostComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastHostComponent],
      providers: [provideIcons(APP_ICONS)],
    }).compileComponents();
  });

  const render = async () => {
    const fixture = TestBed.createComponent(ToastHostComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    return {
      fixture,
      region: () => element.querySelector('section')!,
      toasts: () => [...element.querySelectorAll<HTMLLIElement>('li')],
    };
  };

  it('announces messages in a labelled, polite live region', async () => {
    const { region } = await render();
    expect(region().getAttribute('aria-label')).toBe(UI_TEXT.feedback.region);
    expect(region().querySelector('ol')!.getAttribute('aria-live')).toBe('polite');
  });

  it('shows each toast with its kind, and marks errors as alerts', async () => {
    const feedback = TestBed.inject(FeedbackService);
    const { fixture, toasts } = await render();

    feedback.notify(FeedbackKind.Success, 'Saved');
    feedback.notify(FeedbackKind.Error, 'Failed');
    await fixture.whenStable();

    expect(toasts().map((toast) => toast.textContent?.trim())).toEqual(['Saved', 'Failed']);
    expect(toasts().map((toast) => toast.dataset['kind'])).toEqual([FeedbackKind.Success, FeedbackKind.Error]);
    expect(toasts().map((toast) => toast.getAttribute('role'))).toEqual([null, 'alert']);
  });

  it('removes a toast when its dismiss button is pressed', async () => {
    const feedback = TestBed.inject(FeedbackService);
    const { fixture, toasts } = await render();
    feedback.notify(FeedbackKind.Info, 'Hello');
    await fixture.whenStable();

    toasts()[0].querySelector<HTMLButtonElement>(`button[aria-label="${UI_TEXT.feedback.dismiss}"]`)!.click();
    await fixture.whenStable();

    expect(feedback.toasts()).toEqual([]);
  });
});
