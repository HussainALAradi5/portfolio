import { Directive, ElementRef, afterNextRender, inject, signal } from '@angular/core';

/**
 * Marks an image `is-loaded` once it has loaded (or failed), so a `.skeleton` parent stops shimmering and the
 * image fades in. Styles are in styles.css; an image that is already in the cache is marked at once.
 */
@Directive({
  selector: 'img[appImageReveal]',
  host: {
    class: 'reveal-image',
    '[class.is-loaded]': 'isLoaded()',
    '(load)': 'markLoaded()',
    '(error)': 'markLoaded()',
  },
})
export class ImageRevealDirective {
  private readonly image: HTMLImageElement = inject(ElementRef).nativeElement;

  readonly isLoaded = signal(false);

  constructor() {
    afterNextRender(() => {
      if (this.image.complete && this.image.currentSrc) {
        this.isLoaded.set(true);
      }
    });
  }

  protected markLoaded(): void {
    this.isLoaded.set(true);
  }
}
