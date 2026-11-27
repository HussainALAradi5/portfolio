import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TimelineItemDirective } from '../../../directives/ui/timeline-item/timeline-item.directive';
import { TimelineOrientation } from '../../../enums/ui/timeline-orientation.enum';
import { TimelineComponent } from './timeline.component';

@Component({
  imports: [TimelineComponent, TimelineItemDirective],
  template: `
    <app-timeline
      [items]="items"
      [itemKey]="key"
      [orientation]="orientation()"
      [progress]="progress()"
      [listRole]="role()"
      label="Steps"
    >
      <ng-template [appTimelineItem]="items" let-item let-index="index">
        <span class="item">{{ index }}:{{ item }}</span>
      </ng-template>
    </app-timeline>
  `,
})
class HostComponent {
  readonly items = ['a', 'b', 'c'];
  readonly key = (item: string) => item;
  readonly orientation = signal(TimelineOrientation.Vertical);
  readonly progress = signal<number | null>(null);
  readonly role = signal<'list' | 'tablist'>('list');
}

describe('TimelineComponent', () => {
  const render = async () => {
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    return { fixture, element: fixture.nativeElement as HTMLElement };
  };

  it('renders each item through the template, in order, as a labelled list', async () => {
    const { element } = await render();
    expect([...element.querySelectorAll('.item')].map((item) => item.textContent)).toEqual(['0:a', '1:b', '2:c']);
    const list = element.querySelector('.timeline-items')!;
    expect(list.getAttribute('role')).toBe('list');
    expect(list.getAttribute('aria-label')).toBe('Steps');
    expect(element.querySelectorAll('[role="listitem"]')).toHaveLength(3);
  });

  it('draws a progress fill only when given progress, and supports a horizontal tablist', async () => {
    const { fixture, element } = await render();
    expect(element.querySelector('.timeline-fill')).toBeNull();

    fixture.componentInstance.progress.set(0.5);
    fixture.componentInstance.orientation.set(TimelineOrientation.Horizontal);
    fixture.componentInstance.role.set('tablist');
    await fixture.whenStable();

    const timeline = element.querySelector<HTMLElement>('.timeline')!;
    expect(element.querySelector('.timeline-fill')).not.toBeNull();
    expect(timeline.dataset['orientation']).toBe(TimelineOrientation.Horizontal);
    expect(timeline.style.getPropertyValue('--progress')).toBe('0.5');
    expect(element.querySelector('.timeline-items')!.getAttribute('role')).toBe('tablist');
    expect(element.querySelectorAll('[role="presentation"]')).toHaveLength(3);
  });
});
