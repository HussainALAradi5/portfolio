import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { ROUTE_PROGRESS } from '../../../constants/ui/route-progress.constants';

/**
 * Progress of the current route navigation. The bar appears only when a navigation
 * takes longer than the show delay, creeps towards the limit, then fills and hides.
 */
@Injectable({ providedIn: 'root' })
export class RouteProgressService {
  private readonly router = inject(Router);

  readonly isVisible = signal(false);
  readonly value = signal<number>(ROUTE_PROGRESS.startValue);

  private showTimer?: ReturnType<typeof setTimeout>;
  private hideTimer?: ReturnType<typeof setTimeout>;
  private trickleTimer?: ReturnType<typeof setInterval>;

  constructor() {
    this.router.events
      .pipe(takeUntilDestroyed(inject(DestroyRef)))
      .subscribe((event) => this.handleRouterEvent(event));
  }

  private handleRouterEvent(event: Event): void {
    if (event instanceof NavigationStart) {
      this.start();
    } else if (
      event instanceof NavigationEnd ||
      event instanceof NavigationCancel ||
      event instanceof NavigationError
    ) {
      this.finish();
    }
  }

  private start(): void {
    this.clearTimers();
    this.value.set(ROUTE_PROGRESS.startValue);
    this.showTimer = setTimeout(() => {
      this.isVisible.set(true);
      this.trickleTimer = setInterval(() => this.trickle(), ROUTE_PROGRESS.trickleIntervalMs);
    }, ROUTE_PROGRESS.showDelayMs);
  }

  private trickle(): void {
    this.value.update((value) =>
      Math.min(ROUTE_PROGRESS.maxWhileLoading, value + (ROUTE_PROGRESS.maxWhileLoading - value) * ROUTE_PROGRESS.trickleRatio),
    );
  }

  private finish(): void {
    const wasVisible = this.isVisible();
    this.clearTimers();
    if (!wasVisible) {
      return;
    }
    this.value.set(ROUTE_PROGRESS.doneValue);
    this.hideTimer = setTimeout(() => this.isVisible.set(false), ROUTE_PROGRESS.hideDelayMs);
  }

  private clearTimers(): void {
    clearTimeout(this.showTimer);
    clearTimeout(this.hideTimer);
    clearInterval(this.trickleTimer);
  }
}
