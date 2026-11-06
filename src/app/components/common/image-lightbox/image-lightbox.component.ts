import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  computed,
  inject,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { UI_TEXT } from '../../../constants/common/ui-text.constants';
import { SWIPE_THRESHOLD_PX } from '../../../constants/ui/gesture.constants';
import { ICON } from '../../../constants/ui/icons.constants';
import { KEY } from '../../../constants/ui/keyboard.constants';
import { ProjectScreenshot } from '../../../interfaces/projects/project-screenshot.interface';

const SCROLL_LOCK_CLASS = 'overflow-hidden';

/**
 * Full-screen viewer on a native modal <dialog>, which brings focus handling, Escape to close and the
 * top layer. Arrow keys, the side buttons or a swipe move between images; clicking outside closes it.
 */
@Component({
  selector: 'app-image-lightbox',
  imports: [NgIcon, HlmButton],
  templateUrl: './image-lightbox.component.html',
  styleUrl: './image-lightbox.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageLightboxComponent {
  private readonly document = inject(DOCUMENT);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  private swipeStartX: number | null = null;
  /** Set when a pointer gesture was a swipe, so the click that follows it does not close the dialog. */
  private wasSwipe = false;

  readonly images = input.required<readonly ProjectScreenshot[]>();
  /** The image on show; kept in sync with the caller, e.g. the gallery's selected thumbnail. */
  readonly index = model(0);

  protected readonly text = UI_TEXT;
  protected readonly icon = ICON;
  protected readonly isOpen = signal(false);
  protected readonly current = computed<ProjectScreenshot | undefined>(() => this.images()[this.index()]);
  protected readonly hasMany = computed(() => this.images().length > 1);

  constructor() {
    inject(DestroyRef).onDestroy(() => this.unlockScroll());
  }

  open(index: number): void {
    this.index.set(index);
    this.dialog().nativeElement.showModal();
    this.isOpen.set(true);
    this.document.documentElement.classList.add(SCROLL_LOCK_CLASS);
  }

  protected close(): void {
    this.dialog().nativeElement.close();
  }

  /** Runs for every way the dialog closes: the button, Escape or a click outside. */
  protected onClosed(): void {
    this.isOpen.set(false);
    this.unlockScroll();
  }

  protected step(offset: number): void {
    const count = this.images().length;
    this.index.update((index) => (index + offset + count) % count);
  }

  protected onKeydown(event: KeyboardEvent): void {
    const offsets: Record<string, number> = { [KEY.arrowLeft]: -1, [KEY.arrowRight]: 1 };
    const offset = offsets[event.key];
    if (offset !== undefined && this.hasMany()) {
      event.preventDefault();
      this.step(offset);
    }
  }

  /** A click on the dialog itself (not its content) is a click on the backdrop. */
  protected onDialogClick(event: MouseEvent): void {
    if (this.wasSwipe) {
      this.wasSwipe = false;
      return;
    }
    if (event.target === this.dialog().nativeElement) {
      this.close();
    }
  }

  protected onPointerDown(event: PointerEvent): void {
    this.swipeStartX = event.clientX;
  }

  protected onPointerUp(event: PointerEvent): void {
    if (this.swipeStartX === null || !this.hasMany()) {
      return;
    }
    const distance = event.clientX - this.swipeStartX;
    this.swipeStartX = null;
    this.wasSwipe = Math.abs(distance) >= SWIPE_THRESHOLD_PX;
    if (this.wasSwipe) {
      this.step(distance < 0 ? 1 : -1);
    }
  }

  private unlockScroll(): void {
    this.document.documentElement.classList.remove(SCROLL_LOCK_CLASS);
  }
}
