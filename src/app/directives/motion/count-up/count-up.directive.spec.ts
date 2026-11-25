import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { COUNT_UP_DURATION_MS, COUNT_UP_SAFETY_MS, REDUCED_MOTION_QUERY } from '../../../constants/ui/motion.constants';
import { CountUpDirective } from './count-up.directive';

@Component({
  imports: [CountUpDirective],
  template: `<span [appCountUp]="27"></span>`,
})
class HostComponent {}

describe('CountUpDirective', () => {
  let frames: FrameRequestCallback[];

  const installMotion = (reduced: boolean) => {
    frames = [];
    Object.defineProperty(window, 'matchMedia', {
      value: (query: string) => ({ matches: reduced && query === REDUCED_MOTION_QUERY }),
      configurable: true,
    });
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => frames.push(callback));
    vi.spyOn(window.performance, 'now').mockReturnValue(0);
  };

  /** Runs every queued frame at `time`; Angular's own scheduler may have queued some too, which is harmless. */
  const runFrames = (time: number) => frames.splice(0).forEach((callback) => callback(time));

  afterEach(() => vi.restoreAllMocks());

  const render = async () => {
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    return (fixture.nativeElement as HTMLElement).querySelector('span')!;
  };

  it('counts up from zero and ends on the value', async () => {
    installMotion(false);
    const span = await render();
    expect(span.textContent).toBe('0');

    runFrames(COUNT_UP_DURATION_MS / 2);
    const halfway = Number(span.textContent);
    expect(halfway).toBeGreaterThan(0);
    expect(halfway).toBeLessThan(27);

    runFrames(COUNT_UP_DURATION_MS);
    expect(span.textContent).toBe('27');

    // Finished: later frames leave the value alone.
    runFrames(COUNT_UP_DURATION_MS * 2);
    expect(span.textContent).toBe('27');
  });

  it('shows the value anyway when animation frames never run, as on a hidden page', async () => {
    installMotion(false);
    const span = await render();
    expect(span.textContent).toBe('0');

    // No frame is run here, so only the safety timer can show the value (real time: fake timers stall Angular).
    await vi.waitFor(() => expect(span.textContent).toBe('27'), {
      timeout: (COUNT_UP_DURATION_MS + COUNT_UP_SAFETY_MS) * 2,
    });
  });

  it('shows the value at once under reduced motion, before any frame runs', async () => {
    installMotion(true);
    const span = await render();
    expect(span.textContent).toBe('27');
  });
});
