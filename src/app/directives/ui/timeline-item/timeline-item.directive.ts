import { Directive, TemplateRef, inject, input } from '@angular/core';
import { TimelineItemContext } from '../../../interfaces/ui/timeline-item-context.interface';

/**
 * Marks the template a timeline renders for each item. Bind the same items to it
 * (`<ng-template [appTimelineItem]="items" let-item>`) so `item` is typed in the template.
 */
@Directive({ selector: 'ng-template[appTimelineItem]' })
export class TimelineItemDirective<T> {
  readonly template: TemplateRef<TimelineItemContext<T>> = inject(TemplateRef);
  readonly appTimelineItem = input.required<readonly T[]>();

  /** Only narrows the template context's type; Angular never calls it, so its parameters go unused. */
  static ngTemplateContextGuard<T>(
    _directive: TimelineItemDirective<T>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: unknown,
  ): context is TimelineItemContext<T> {
    return true;
  }
}
