import { DOCUMENT } from '@angular/common';
import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { COUNT_UP_DURATION_MS, COUNT_UP_SAFETY_MS, REDUCED_MOTION_QUERY } from '../../../constants/ui/motion.constants';

/** Eases out, so the count slows as it reaches the value. */
const easeOutCubic = (progress: number): number => 1 - (1 - progress) ** 3;

/**
 * Counts the element's text up from 0 to `appCountUp` once it has rendered. Under reduced motion, or where the
 * browser has no animation frames, the value is shown at once.
 */
@Directive({ selector: '[appCountUp]' })
export class CountUpDirective {
  private readonly element: HTMLElement = inject(ElementRef).nativeElement;
  private readonly view = inject(DOCUMENT).defaultView;
  private frame = 0;
  private safetyTimer?: ReturnType<typeof setTimeout>;

  readonly appCountUp = input.required<number>();

  constructor() {
    afterNextRender(() => this.start());
    inject(DestroyRef).onDestroy(() => this.stop());
  }

  private start(): void {
    const target = this.appCountUp();
    const reduceMotion = this.view?.matchMedia?.(REDUCED_MOTION_QUERY).matches ?? false;
    if (reduceMotion || !this.view?.requestAnimationFrame) {
      this.show(target);
      return;
    }
    const startedAt = this.view.performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startedAt) / COUNT_UP_DURATION_MS, 1);
      this.show(Math.round(target * easeOutCubic(progress)));
      if (progress < 1) {
        this.frame = this.view!.requestAnimationFrame(step);
      } else {
        this.stop();
      }
    };
    this.show(0);
    this.frame = this.view.requestAnimationFrame(step);
    // Hidden or background pages may never run animation frames; never leave the number stuck at 0.
    this.safetyTimer = setTimeout(() => {
      this.stop();
      this.show(target);
    }, COUNT_UP_DURATION_MS + COUNT_UP_SAFETY_MS);
  }

  private stop(): void {
    this.view?.cancelAnimationFrame?.(this.frame);
    clearTimeout(this.safetyTimer);
  }

  private show(value: number): void {
    this.element.textContent = String(value);
  }
}
