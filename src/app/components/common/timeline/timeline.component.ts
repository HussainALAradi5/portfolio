import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, contentChild, input } from '@angular/core';
import { TimelineItemDirective } from '../../../directives/ui/timeline-item/timeline-item.directive';
import { TimelineOrientation } from '../../../enums/ui/timeline-orientation.enum';

/**
 * Generic timeline: draws the line (and an optional progress fill) and lays out the items, which enter one after
 * another. What each item looks like comes from an `appTimelineItem` template, so experience stops and project
 * entries share one timeline. Item templates can use `--timeline-line-x` and `--timeline-node-centre` to sit on the line.
 */
@Component({
  selector: 'app-timeline',
  imports: [NgTemplateOutlet],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineComponent<T> {
  readonly items = input.required<readonly T[]>();
  /** A stable key per item, so items keep their element when the list changes. */
  readonly itemKey = input.required<(item: T) => string>();
  readonly orientation = input<TimelineOrientation>(TimelineOrientation.Vertical);
  /** Share of the line drawn in the accent colour, from 0 to 1; no fill when null. */
  readonly progress = input<number | null>(null);
  /** `tablist` when each item is a tab (the item template supplies the tab buttons). */
  readonly listRole = input<'list' | 'tablist'>('list');
  readonly label = input<string>('');

  protected readonly itemTemplate = contentChild.required(TimelineItemDirective<T>);
}
