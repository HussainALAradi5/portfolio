import { TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import { UI_TEXT } from '../../../constants/common/ui-text.constants';
import { SWIPE_THRESHOLD_PX } from '../../../constants/ui/gesture.constants';
import { APP_ICONS } from '../../../constants/ui/icons.constants';
import { KEY } from '../../../constants/ui/keyboard.constants';
import { ImageLightboxComponent } from './image-lightbox.component';

const IMAGES = [
  { src: 'a.webp', caption: 'First' },
  { src: 'b.webp', caption: 'Second' },
  { src: 'c.webp', caption: 'Third' },
];

describe('ImageLightboxComponent', () => {
  beforeEach(async () => {
    // jsdom has no modal dialogs; mimic the browser: open, then close and fire "close".
    HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
      this.open = true;
    };
    HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
      this.open = false;
      this.dispatchEvent(new Event('close'));
    };
    await TestBed.configureTestingModule({
      imports: [ImageLightboxComponent],
      providers: [provideIcons(APP_ICONS)],
    }).compileComponents();
  });

  const render = async (startAt = 0) => {
    const fixture = TestBed.createComponent(ImageLightboxComponent);
    fixture.componentRef.setInput('images', IMAGES);
    await fixture.whenStable();
    fixture.componentInstance.open(startAt);
    await fixture.whenStable();
    const dialog = (fixture.nativeElement as HTMLElement).querySelector('dialog')!;
    const caption = () => dialog.querySelector('figcaption')?.textContent?.trim();
    const button = (label: string) => dialog.querySelector<HTMLButtonElement>(`button[aria-label="${label}"]`)!;
    const settle = () => fixture.whenStable();
    return { fixture, dialog, caption, button, settle };
  };

  it('opens on the chosen image, shows a counter and locks page scrolling', async () => {
    const { dialog, caption } = await render(1);
    expect(dialog.open).toBe(true);
    expect(caption()).toBe('Second');
    expect(dialog.textContent).toContain('2 / 3');
    expect(document.documentElement.classList).toContain('overflow-hidden');
  });

  it('moves with the buttons and wraps around at both ends', async () => {
    const { caption, button, settle } = await render(2);
    button(UI_TEXT.lightbox.next).click();
    await settle();
    expect(caption()).toBe('First');
    button(UI_TEXT.lightbox.previous).click();
    await settle();
    expect(caption()).toBe('Third');
  });

  it('moves with the arrow keys and with a swipe', async () => {
    const { dialog, caption, settle } = await render(0);
    dialog.dispatchEvent(new KeyboardEvent('keydown', { key: KEY.arrowRight, bubbles: true }));
    await settle();
    expect(caption()).toBe('Second');

    dialog.dispatchEvent(new PointerEvent('pointerdown', { clientX: 300, bubbles: true }));
    dialog.dispatchEvent(new PointerEvent('pointerup', { clientX: 300 - SWIPE_THRESHOLD_PX, bubbles: true }));
    await settle();
    expect(caption()).toBe('Third');
  });

  it('closes from the close button and from a click on the backdrop, unlocking scrolling', async () => {
    const first = await render();
    first.button(UI_TEXT.lightbox.close).click();
    await first.settle();
    expect(first.dialog.open).toBe(false);
    expect(document.documentElement.classList).not.toContain('overflow-hidden');

    const second = await render();
    second.dialog.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await second.settle();
    expect(second.dialog.open).toBe(false);
  });

  it('keeps the caller in sync with the image on show', async () => {
    const { fixture, button, settle } = await render(0);
    button(UI_TEXT.lightbox.next).click();
    await settle();
    expect(fixture.componentInstance.index()).toBe(1);
  });
});
