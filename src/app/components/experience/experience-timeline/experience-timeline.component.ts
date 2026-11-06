import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  computed,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { UI_TEXT } from '../../../constants/common/ui-text.constants';
import { EXPERIENCE_KIND_STYLES } from '../../../constants/experience/experience-labels.constants';
import { EXPERIENCE } from '../../../constants/experience/experience.constants';
import { KEY } from '../../../constants/ui/keyboard.constants';
import { YearMonth } from '../../../interfaces/experience/year-month.interface';
import { formatPeriod } from '../../../utilities/experience/period/format-period.utility';
import { SectionHeadingComponent } from '../../common/section-heading/section-heading.component';
import { ExperienceDetailsComponent } from '../experience-details/experience-details.component';

const now = new Date();
const PANEL_ID = 'experience-details';

/**
 * Horizontal timeline: one stop per entry, oldest on the left. Selecting a stop (click, or the
 * arrow, Home and End keys) shows its details below; the current role is selected first.
 */
@Component({
  selector: 'app-experience-timeline',
  imports: [NgIcon, SectionHeadingComponent, ExperienceDetailsComponent],
  templateUrl: './experience-timeline.component.html',
  styleUrl: './experience-timeline.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceTimelineComponent {
  private readonly scroller = viewChild.required<ElementRef<HTMLElement>>('scroller');
  private readonly stopButtons = viewChildren<ElementRef<HTMLButtonElement>>('stop');

  protected readonly text = UI_TEXT;
  protected readonly panelId = PANEL_ID;
  protected readonly kindStyles = EXPERIENCE_KIND_STYLES;
  protected readonly entries = EXPERIENCE;
  protected readonly stopPeriods = EXPERIENCE.map(({ start, end }) => formatPeriod(start, end));
  /** Ongoing roles count their length up to the current month. */
  protected readonly today: YearMonth = { year: now.getFullYear(), month: now.getMonth() + 1 };

  protected readonly selectedIndex = signal(this.initialIndex());
  protected readonly selected = computed(() => this.entries[this.selectedIndex()]);
  /** Share of the rail, from the first stop to the selected one, that is filled. */
  protected readonly progress = computed(() =>
    this.entries.length > 1 ? this.selectedIndex() / (this.entries.length - 1) : 1,
  );

  constructor() {
    afterNextRender(() => this.centreStop(this.selectedIndex(), 'instant'));
  }

  protected select(index: number): void {
    this.selectedIndex.set(index);
    this.centreStop(index, 'smooth');
  }

  protected onKeydown(event: KeyboardEvent): void {
    const last = this.entries.length - 1;
    const targets: Record<string, number> = {
      [KEY.arrowLeft]: Math.max(0, this.selectedIndex() - 1),
      [KEY.arrowRight]: Math.min(last, this.selectedIndex() + 1),
      [KEY.home]: 0,
      [KEY.end]: last,
    };
    const target = targets[event.key];
    if (target === undefined) {
      return;
    }
    event.preventDefault();
    this.select(target);
    this.stopButtons()[target]?.nativeElement.focus();
  }

  /** Scrolls only the timeline (never the page) so the stop sits in the middle on narrow screens. */
  private centreStop(index: number, behavior: ScrollBehavior): void {
    const stop = this.stopButtons()[index]?.nativeElement;
    if (!stop) {
      return;
    }
    const scroller = this.scroller().nativeElement;
    scroller.scrollTo({ left: stop.offsetLeft - (scroller.clientWidth - stop.offsetWidth) / 2, behavior });
  }

  private initialIndex(): number {
    const current = EXPERIENCE.findIndex((entry) => entry.end === null);
    return current >= 0 ? current : EXPERIENCE.length - 1;
  }
}
