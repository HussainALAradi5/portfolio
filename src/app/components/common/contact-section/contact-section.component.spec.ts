import { TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import { SITE_PROFILE } from '../../../config/site/site.config';
import { UI_TEXT } from '../../../constants/common/ui-text.constants';
import { COPIED_FEEDBACK_MS } from '../../../constants/ui/feedback.constants';
import { APP_ICONS } from '../../../constants/ui/icons.constants';
import { ClipboardService } from '../../../services/ui/clipboard/clipboard.service';
import { ContactSectionComponent } from './contact-section.component';

describe('ContactSectionComponent', () => {
  const copy = vi.fn<(text: string) => Promise<boolean>>();

  beforeEach(async () => {
    copy.mockReset();
    await TestBed.configureTestingModule({
      imports: [ContactSectionComponent],
      providers: [provideIcons(APP_ICONS), { provide: ClipboardService, useValue: { copy } }],
    }).compileComponents();
  });

  afterEach(() => vi.useRealTimers());

  const render = async () => {
    const fixture = TestBed.createComponent(ContactSectionComponent);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    return { fixture, element, copyButton: element.querySelector<HTMLButtonElement>('button.copy-email')! };
  };

  it('links to email and LinkedIn', async () => {
    const { element } = await render();
    const hrefs = [...element.querySelectorAll('a')].map((link) => link.getAttribute('href'));
    expect(hrefs).toContain(`mailto:${SITE_PROFILE.email}`);
    expect(hrefs).toContain(SITE_PROFILE.linkedinUrl);
  });

  it('offers the CV unless the page already does', async () => {
    const { fixture, element } = await render();
    expect(element.querySelector('app-cv-download-button')).not.toBeNull();
    fixture.componentRef.setInput('showCv', false);
    await fixture.whenStable();
    expect(element.querySelector('app-cv-download-button')).toBeNull();
  });

  it('confirms a copied email address, then resets', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    copy.mockResolvedValue(true);
    const { fixture, copyButton } = await render();

    copyButton.click();
    await vi.waitFor(() => expect(copy).toHaveBeenCalledWith(SITE_PROFILE.email));
    await fixture.whenStable();
    expect(copyButton.textContent).toContain(UI_TEXT.contact.copied);

    vi.advanceTimersByTime(COPIED_FEEDBACK_MS);
    await fixture.whenStable();
    expect(copyButton.textContent).not.toContain(UI_TEXT.contact.copied);
  });

  it('shows no confirmation when copying fails', async () => {
    copy.mockResolvedValue(false);
    const { fixture, copyButton } = await render();
    copyButton.click();
    await fixture.whenStable();
    expect(copyButton.textContent).not.toContain(UI_TEXT.contact.copied);
  });
});
