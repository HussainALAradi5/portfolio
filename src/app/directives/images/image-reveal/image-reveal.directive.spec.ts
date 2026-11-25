import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ImageRevealDirective } from './image-reveal.directive';

@Component({
  imports: [ImageRevealDirective],
  template: `<div class="skeleton"><img appImageReveal src="cover.webp" alt="Cover" /></div>`,
})
class HostComponent {}

describe('ImageRevealDirective', () => {
  const render = async () => {
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    return { fixture, image: (fixture.nativeElement as HTMLElement).querySelector('img')! };
  };

  it('waits for the image before marking it loaded', async () => {
    const { image } = await render();
    expect(image.classList.contains('reveal-image')).toBe(true);
    expect(image.classList.contains('is-loaded')).toBe(false);
  });

  it('marks the image loaded when it loads', async () => {
    const { fixture, image } = await render();
    image.dispatchEvent(new Event('load'));
    await fixture.whenStable();
    expect(image.classList.contains('is-loaded')).toBe(true);
  });

  it('also stops waiting when the image fails, so the skeleton does not shimmer forever', async () => {
    const { fixture, image } = await render();
    image.dispatchEvent(new Event('error'));
    await fixture.whenStable();
    expect(image.classList.contains('is-loaded')).toBe(true);
  });
});
