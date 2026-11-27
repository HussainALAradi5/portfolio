/** What a timeline item template receives: the item, and its position in the timeline. */
export interface TimelineItemContext<T> {
  $implicit: T;
  index: number;
}
