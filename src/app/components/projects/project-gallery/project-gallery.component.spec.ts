import { TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import { APP_ICONS } from '../../../constants/ui/icons.constants';
import { ProjectScreenshot } from '../../../interfaces/projects/project-screenshot.interface';
import { ProjectGalleryComponent } from './project-gallery.component';

const SHOTS: readonly ProjectScreenshot[] = [
  { src: 'images/a.webp', caption: 'First' },
  { src: 'images/b.webp', caption: 'Second' },
  { src: 'images/c.webp', caption: 'Third' },
];

describe('ProjectGalleryComponent', () => {
  beforeEach(async () => {
    // jsdom has no modal dialogs; mimic the browser so the lightbox can open.
    HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
      this.open = true;
    };
    HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
      this.open = false;
      this.dispatchEvent(new Event('close'));
    };
    await TestBed.configureTestingModule({
      imports: [ProjectGalleryComponent],
      providers: [provideIcons(APP_ICONS)],
    }).compileComponents();
  });

  const render = async (screenshots: readonly ProjectScreenshot[]) => {
    const fixture = TestBed.createComponent(ProjectGalleryComponent);
    fixture.componentRef.setInput('screenshots', screenshots);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    return {
      fixture,
      preview: () => element.querySelector<HTMLButtonElement>('button.preview')!,
      previewImage: () => element.querySelector<HTMLImageElement>('button.preview img')!,
      caption: () => element.querySelector('figcaption')?.textContent?.trim(),
      thumbs: () => [...element.querySelectorAll<HTMLButtonElement>('button[aria-pressed]')],
      dialog: () => element.querySelector('dialog')!,
    };
  };

  it('shows the first screenshot with its caption', async () => {
    const { previewImage, caption, thumbs } = await render(SHOTS);
    expect(previewImage().getAttribute('src')).toBe(SHOTS[0].src);
    expect(caption()).toBe(SHOTS[0].caption);
    expect(thumbs()).toHaveLength(SHOTS.length);
    expect(thumbs()[0].getAttribute('aria-pressed')).toBe('true');
  });

  it('shows the thumbnail that is clicked, using the thumbnail file in the strip', async () => {
    const { fixture, previewImage, caption, thumbs } = await render(SHOTS);
    expect(thumbs()[1].querySelector('img')!.getAttribute('src')).toBe('images/b.thumb.webp');

    thumbs()[1].click();
    await fixture.whenStable();

    expect(previewImage().getAttribute('src')).toBe(SHOTS[1].src);
    expect(caption()).toBe(SHOTS[1].caption);
    expect(thumbs()[1].getAttribute('aria-pressed')).toBe('true');
    expect(thumbs()[0].getAttribute('aria-pressed')).toBe('false');
  });

  it('opens the selected screenshot full screen', async () => {
    const { fixture, preview, thumbs, dialog } = await render(SHOTS);
    thumbs()[2].click();
    await fixture.whenStable();

    preview().click();
    await fixture.whenStable();

    expect(dialog().open).toBe(true);
    expect(dialog().getAttribute('aria-label')).toBe(SHOTS[2].caption);
  });

  it('hides the thumbnail strip for a single screenshot', async () => {
    const { thumbs, caption } = await render([SHOTS[0]]);
    expect(thumbs()).toHaveLength(0);
    expect(caption()).toBe(SHOTS[0].caption);
  });

  it('goes back to the first screenshot when the screenshots change', async () => {
    const { fixture, thumbs, previewImage } = await render(SHOTS);
    thumbs()[2].click();
    await fixture.whenStable();

    fixture.componentRef.setInput('screenshots', [...SHOTS].reverse());
    await fixture.whenStable();

    expect(previewImage().getAttribute('src')).toBe(SHOTS[2].src);
    expect(thumbs()[0].getAttribute('aria-pressed')).toBe('true');
  });
});
