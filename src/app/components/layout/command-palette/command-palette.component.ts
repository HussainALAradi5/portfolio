import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  linkedSignal,
  signal,
  viewChild,
} from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { UI_TEXT } from '../../../constants/common/ui-text.constants';
import { COMMAND_GROUP_LABELS } from '../../../constants/command-palette/command-palette.constants';
import { ICON } from '../../../constants/ui/icons.constants';
import { KEY } from '../../../constants/ui/keyboard.constants';
import { CommandGroup } from '../../../enums/command-palette/command-group.enum';
import { CommandGroupSection } from '../../../interfaces/command-palette/command-group-section.interface';
import { PaletteCommand } from '../../../interfaces/command-palette/palette-command.interface';
import { CommandPaletteService } from '../../../services/ui/command-palette/command-palette.service';
import { filterCommands } from '../../../utilities/command-palette/filter/filter-commands.utility';
import { isPaletteShortcut } from '../../../utilities/command-palette/shortcut/palette-shortcut.utility';

const LISTBOX_ID = 'command-palette-results';

/**
 * Ctrl + K / Cmd + K search over pages, projects and actions, on a native modal <dialog>.
 * ↑ and ↓ move the highlight, Enter runs it, Escape or a click outside closes the palette.
 */
@Component({
  selector: 'app-command-palette',
  imports: [NgIcon],
  templateUrl: './command-palette.component.html',
  styleUrl: './command-palette.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown)': 'onDocumentKeydown($event)' },
})
export class CommandPaletteComponent {
  private readonly palette = inject(CommandPaletteService);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  private readonly input = viewChild.required<ElementRef<HTMLInputElement>>('input');

  protected readonly text = UI_TEXT;
  protected readonly icon = ICON;
  protected readonly listboxId = LISTBOX_ID;
  protected readonly query = signal('');

  protected readonly results = computed(() => filterCommands(this.palette.commands(), this.query()));
  protected readonly sections = computed<readonly CommandGroupSection[]>(() =>
    (Object.keys(COMMAND_GROUP_LABELS) as CommandGroup[])
      .map((group) => ({
        group,
        label: COMMAND_GROUP_LABELS[group],
        commands: this.results().filter((command) => command.group === group),
      }))
      .filter((section) => section.commands.length > 0),
  );
  /** Results in on-screen order, so ↑ and ↓ follow the grouped list. */
  protected readonly ordered = computed(() => this.sections().flatMap((section) => section.commands));
  /** Highlighted result; back to the first whenever the results change. */
  protected readonly activeIndex = linkedSignal({ source: this.ordered, computation: () => 0 });
  protected readonly activeId = computed(() => this.ordered()[this.activeIndex()]?.id);

  constructor() {
    effect(() => {
      const dialog = this.dialog().nativeElement;
      if (this.palette.isOpen() && !dialog.open) {
        this.query.set('');
        dialog.showModal();
        this.input().nativeElement.focus();
      } else if (!this.palette.isOpen() && dialog.open) {
        dialog.close();
      }
    });
  }

  protected onDocumentKeydown(event: KeyboardEvent): void {
    if (isPaletteShortcut(event)) {
      event.preventDefault();
      this.palette.toggle();
    }
  }

  protected onInputKeydown(event: KeyboardEvent): void {
    const count = this.ordered().length;
    if (!count) {
      return;
    }
    if (event.key === KEY.arrowDown || event.key === KEY.arrowUp) {
      event.preventDefault();
      const step = event.key === KEY.arrowDown ? 1 : -1;
      this.activeIndex.update((index) => (index + step + count) % count);
      this.scrollActiveIntoView();
    } else if (event.key === KEY.enter) {
      event.preventDefault();
      this.run(this.ordered()[this.activeIndex()]);
    }
  }

  protected onQueryInput(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  protected highlight(command: PaletteCommand): void {
    this.activeIndex.set(this.ordered().indexOf(command));
  }

  protected run(command: PaletteCommand): void {
    this.palette.close();
    command.run();
  }

  /** Keeps the service in step when the dialog closes itself (Escape). */
  protected onClosed(): void {
    this.palette.close();
  }

  /** A click on the dialog itself, outside the panel, is a click on the backdrop. */
  protected onDialogClick(event: MouseEvent): void {
    if (event.target === this.dialog().nativeElement) {
      this.palette.close();
    }
  }

  private scrollActiveIntoView(): void {
    const id = this.activeId();
    if (id) {
      this.dialog().nativeElement.ownerDocument.getElementById(id)?.scrollIntoView?.({ block: 'nearest' });
    }
  }
}
