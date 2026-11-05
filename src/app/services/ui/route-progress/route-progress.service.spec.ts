import { TestBed } from '@angular/core/testing';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ROUTE_PROGRESS } from '../../../constants/ui/route-progress.constants';
import { RouteProgressService } from './route-progress.service';

describe('RouteProgressService', () => {
  let events: Subject<unknown>;
  let service: RouteProgressService;

  beforeEach(() => {
    vi.useFakeTimers();
    events = new Subject();
    TestBed.configureTestingModule({ providers: [{ provide: Router, useValue: { events } }] });
    service = TestBed.inject(RouteProgressService);
  });

  afterEach(() => vi.useRealTimers());

  it('stays hidden for a fast navigation', () => {
    events.next(new NavigationStart(1, '/a'));
    vi.advanceTimersByTime(ROUTE_PROGRESS.showDelayMs - 1);
    events.next(new NavigationEnd(1, '/a', '/a'));
    vi.advanceTimersByTime(ROUTE_PROGRESS.showDelayMs);
    expect(service.isVisible()).toBe(false);
  });

  it('shows, creeps without passing the limit, then fills and hides', () => {
    events.next(new NavigationStart(1, '/a'));
    vi.advanceTimersByTime(ROUTE_PROGRESS.showDelayMs);
    expect(service.isVisible()).toBe(true);

    vi.advanceTimersByTime(ROUTE_PROGRESS.trickleIntervalMs * 50);
    expect(service.value()).toBeGreaterThan(ROUTE_PROGRESS.startValue);
    expect(service.value()).toBeLessThanOrEqual(ROUTE_PROGRESS.maxWhileLoading);

    events.next(new NavigationEnd(1, '/a', '/a'));
    expect(service.value()).toBe(ROUTE_PROGRESS.doneValue);
    vi.advanceTimersByTime(ROUTE_PROGRESS.hideDelayMs);
    expect(service.isVisible()).toBe(false);
  });
});
